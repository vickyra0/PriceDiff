import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { storageKeys } from '@/constants/app';
import { storageService } from '@/services/storage/storage.service';

export type ThemeMode = 'light' | 'dark' | 'system';

interface UiState {
  theme: ThemeMode;
  mobileNavOpen: boolean;
}

const initialState: UiState = {
  theme: storageService.get<ThemeMode>(storageKeys.theme) ?? 'system',
  mobileNavOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
      storageService.set(storageKeys.theme, action.payload);
    },
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
  },
});

export const { setTheme, setMobileNavOpen } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
