import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import logo from '@/assets/logo.png';
import { Input } from '@/components/ui/input';
import { Index } from '@/constants';
import { authMessages } from '@/constants/authMessages.ts';
import { useUserContext } from '@/hooks';
import { type SignInSchema, ValidationRules } from '@/schemas';
import { type SigninData } from '@/types/index.ts';
import { Endpoints } from '@/utils/enpoints.ts';

import api from '../services/api';
import { Button } from './ui/button';
import { AxiosError } from 'axios';

const Signin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: yupResolver(ValidationRules.SignIn.schema),
    defaultValues: ValidationRules.SignIn.initialValues,
  });

  const { updateUserData } = useUserContext();

  const signinMutation = useMutation({
    mutationFn: (data: SigninData) => api.post(Endpoints.login, data, { withCredentials: true }),
  });

  const onSubmit: SubmitHandler<SigninData> = (data) => {
    signinMutation.mutate(data, {
      onSuccess: (data) => {
        localStorage.setItem('token', data.data.data.accessToken);
        const { name, email } = data.data.data.user;
        updateUserData({ name, email });
        reset();
      },
      onError: (error: unknown) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error instanceof Error
              ? error.message
              : authMessages.SIGINPFAILED;
        toast.error(`${authMessages.SIGINPFAILED} ${message}`);
      },
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <img src={logo} alt="EG Logo" className="w-50 h-24" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <Input
          type="email"
          placeholder={Index.FORM_LABELS.EMAIL}
          {...register('email', {
            required: Index.VALIDATION.REQUIRED_FIELDS.EMAIL,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: Index.VALIDATION.INVALID_EMAIL,
            },
          })}
          className="p-2 border rounded w-64"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Input
          type="password"
          placeholder={Index.FORM_LABELS.PASSWORD}
          {...register('password', {
            required: Index.VALIDATION.REQUIRED_FIELDS.PASSWORD,
            minLength: {
              value: 6,
              message: Index.VALIDATION.PASSWORD_TOO_SHORT,
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
              message: Index.VALIDATION.PASSWORD_COMPLEXITY,
            },
          })}
          className="p-2 border rounded w-64"
        />
        {errors.password && <p className="text-red-500 w-64">{errors.password.message}</p>}

        <Button type="submit" className="bg-[#fc794b] text-white p-2 rounded">
          {Index.BUTTONS.SIGN_IN}
        </Button>
      </form>
    </div>
  );
};

export default Signin;
