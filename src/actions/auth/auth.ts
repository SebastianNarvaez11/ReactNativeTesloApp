import {tesloApi} from '../../config/api/tesloApi';
import {IUser} from '../../domain/models/user';
import {IAuthResponse} from '../../infrastructure/interfaces/auth.interface';

const mapUserToken = (data: IAuthResponse) => {
  const user: IUser = {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    isActive: data.isActive,
    roles: data.roles,
  };

  return {
    user: user,
    token: data.token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLocaleLowerCase();

  try {
    const {data} = await tesloApi.post<IAuthResponse>('/auth/login', {
      email,
      password,
    });

    return mapUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const checkAuthStatus = async () => {
  try {
    const {data} = await tesloApi.get<IAuthResponse>('/auth/check-status');
    return mapUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
