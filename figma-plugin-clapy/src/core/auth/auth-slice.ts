import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Nil } from '../../common/app-models';
import { env } from '../../environment/env.js';
import type { RootState } from '../redux/store';
import type { AccessTokenDecoded } from './auth-service';

export interface AuthState {
  loading: boolean;
  error?: any;
  isSignedIn?: boolean;
  isSessionChecking?: boolean;
  tokenDecoded?: AccessTokenDecoded | Nil;
}

// Switch loading to true to block the app until the session is checked.
const initialState: AuthState = { loading: true };

// To add to src/core/redux/store.ts
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoadingAuth: state => {
      state.loading = true;
      state.error = undefined;
    },
    authSuccess: state => {
      state.loading = false;
      state.error = undefined;
      state.isSignedIn = true;
    },
    setAuthError: (state, { payload }: PayloadAction<any>) => {
      state.loading = false;
      state.error = payload;
      state.isSignedIn = false;
    },
    cancelAuth: state => {
      state.loading = false;
    },
    setSignedInState: (state, { payload }: PayloadAction<boolean>) => {
      state.isSignedIn = payload;
      state.loading = false;
    },
    setCheckingSessionState: (state, { payload }: PayloadAction<boolean>) => {
      state.isSessionChecking = payload;
    },
    setTokenDecoded: (state, { payload }: PayloadAction<AccessTokenDecoded | Nil>) => {
      state.tokenDecoded = payload;
    },
  },
});

export const {
  startLoadingAuth,
  authSuccess,
  setAuthError,
  cancelAuth,
  setSignedInState,
  setTokenDecoded,
  setCheckingSessionState,
} = authSlice.actions;

export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectSessionChecking = (state: RootState) => state.auth.isSessionChecking;

export const selectAuthError = (state: RootState) => state.auth.error;
export const selectSignedIn = (state: RootState) => !!state.auth.isSignedIn;
export const selectTokenDecoded = (state: RootState) => state.auth.tokenDecoded;
export const selectIsAlphaDTCUser = (state: RootState) =>
  state.auth.tokenDecoded?.['https://clapy.gitbook.io/roles']?.includes('alpha_design_to_code');
export const selectNoCodesandboxUser = (state: RootState) =>
  state.auth.tokenDecoded?.['https://clapy.gitbook.io/roles']?.includes('noCodesandbox');
export const selectIncreasedQuotaUser = (state: RootState) =>
  state.auth.tokenDecoded?.['https://clapy.gitbook.io/roles']?.includes('increasedQuota');
export const selectUserLicenceExpirationDate = (state: RootState) =>
  state.auth.tokenDecoded?.['https://clapy.gitbook.io/licence-expiration-date'];
export const selectGithubEnabled = (state: RootState) =>
  env.isDev || state.auth.tokenDecoded?.['https://clapy.gitbook.io/roles']?.includes('github_integration');

export const selectCssOptionEnabled = (state: RootState) => true;
export const selectFreeStripeAccess = (state: RootState) => hasRoleFreeStripeAccess(state.auth.tokenDecoded);
export const selectDevTools = (state: RootState) =>
  state.auth.tokenDecoded?.['https://clapy.gitbook.io/roles']?.includes('dev_tools');
// TODO edit here and in src/features/user/user.utils.ts

export function hasRoleDevTools(user: AccessTokenDecoded | Nil) {
  return !!user?.['https://clapy.gitbook.io/roles']?.includes('dev_tools');
}

export const hasRoleFreeStripeAccess = (user: AccessTokenDecoded | Nil) =>
  user?.['https://clapy.gitbook.io/roles']?.includes('FreeStripeAccess');
