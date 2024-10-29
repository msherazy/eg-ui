import { useMutation } from '@tanstack/react-query';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import logo from '@/assets/logo.png';
import { Input } from '@/components/ui/input.tsx';
import { Index } from '@/constants';
import { authMessages } from '@/constants/authMessages.ts';
import { type SignupData } from '@/types/index.ts';
import { Endpoints } from '@/utils/enpoints.ts';

import api from '../services/api';
import { Button } from './ui/button.tsx';
import { AxiosError } from 'axios';

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupData>();

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => api.post(Endpoints.register, data, { withCredentials: true }),
  });

  const onSubmit: SubmitHandler<SignupData> = (data) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        toast.success(`${authMessages.SIGNUPSUCCESSFUL}`);
        reset();
      },
      onError: (error: unknown) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error instanceof Error
              ? error.message
              : authMessages.SIGNUPFAILED;
        toast.error(`${authMessages.SIGNUPFAILED} ${message}`);
      },
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <img src={logo} alt="EG Logo" className="w-100 h-24" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 w-full max-w-md">
        <Input
          type="text"
          placeholder={Index.FORM_LABELS.NAME}
          {...register('name', { required: Index.VALIDATION.REQUIRED_FIELDS.NAME })}
          className="p-2 border rounded w-64"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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

        <Button type="submit" className="bg-[#fc794b] text-white p-3 rounded">
          {Index.BUTTONS.SIGN_UP}
        </Button>
      </form>
    </div>
  );
};

export default Signup;
