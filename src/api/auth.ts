import { type AxiosResponse } from 'axios';

import { type SignInSchema, type SignUpSchema } from '@/schemas';

import api, { type ApiResponse } from '../services/api';
import { Endpoints } from '../utils/enpoints';

type UserData = {
  email: string;
  name: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type LoginData = UserData & {
  accessToken: string;
};

const getUserInfo = async (token: string) => {
  const data = await api.get<AxiosResponse<ApiResponse<LoginData>>>(Endpoints.profile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

const signIn = async (credentials: SignInSchema) => {
  const response = await api.post<AxiosResponse<ApiResponse<LoginData>>>(Endpoints.login, credentials);
  console.log(response.data.data);
  return response.data;
};

const signUp = async (credentials: SignUpSchema) => {
  const response = await api.post<AxiosResponse<ApiResponse<UserData>>>(Endpoints.register, credentials);
  return response.data;
};

export const AuthApi = {
  getUserInfo,
  signIn,
  signUp,
};
