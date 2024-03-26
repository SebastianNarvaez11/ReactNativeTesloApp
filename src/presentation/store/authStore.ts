import {create} from 'zustand';
import {IUser} from '../../domain/models/user';
import {IAuthStatus} from '../../infrastructure/interfaces/auth.interface';
import {authLogin, checkAuthStatus} from '../../actions/auth/auth';
import {StorageAdapter} from '../../config/adapters/storage-adapter';

interface IAuthStore {
  status: IAuthStatus;
  token?: string;
  user?: IUser;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    if (!resp) {
      set({user: undefined, token: undefined, status: 'unauthenticated'});
      return false;
    }

    await StorageAdapter.setItem('token', resp.token);

    set({user: resp.user, token: resp.token, status: 'authenticated'});
    return true;
  },

  checkStatus: async () => {
    const resp = await checkAuthStatus();
    if (!resp) {
      set({user: undefined, token: undefined, status: 'unauthenticated'});
      return;
    }

    await StorageAdapter.setItem('token', resp.token);
    set({user: resp.user, token: resp.token, status: 'authenticated'});
  },

  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({user: undefined, token: undefined, status: 'unauthenticated'});
  },
}));
