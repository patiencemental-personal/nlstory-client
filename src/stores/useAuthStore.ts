import create from 'zustand';
import * as authClient from 'apis/auth';

type User = {
  logined: boolean;
  authority: 'admin' | 'user';
};

type AuthState = {
  user: User | null;
  login: (password: string) => Promise<any>;
  loginSuccess: () => Promise<any>;
  logout: () => Promise<any>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  /**
   * @see https://github.com/pmndrs/zustand#async-actions
   */
  login: async (password: string) => {
    try {
      const response = await authClient.login(password);
      if (response.status === 201) {
        set((state) => ({ 
          ...state, 
          user: response.data.user,
        }));
        return response;
      }
    } catch (error) {
      throw error;
    }
  },
  loginSuccess: async () => {
    try {
      const response = await authClient.loginSuccess();
      if (response.status === 200) {
        set((state) => ({ 
          ...state, 
          user: response.data.user,
        }));
        return response;
      }
    } catch (error) {
      set((state) => ({ ...state, user: null }));
    }
  },
  logout: async () => {
    try {
      const response = await authClient.logout();
      if (response.status === 200) {
        set((state) => ({ ...state, user: null }));
        return response;
      }
    } catch (error) {
      throw error;
    }
  },
}));