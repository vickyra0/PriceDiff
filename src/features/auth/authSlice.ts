import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { storageKeys } from '@/constants/app';
import { storageService } from '@/services/storage/storage.service';
import type { AuthSession, User } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  initialized: boolean;
}

const persisted = storageService.get<AuthSession>(storageKeys.session);

const initialState: AuthState = {
  user: persisted?.user ?? null,
  token: persisted?.token ?? null,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<AuthSession | null>) {
      state.user = action.payload?.user ?? null;
      state.token = action.payload?.token ?? null;
      state.initialized = true;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },
  },
});

export const { setSession, setUser, setInitialized } = authSlice.actions;
export const authReducer = authSlice.reducer;
