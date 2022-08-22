import { RootState } from '../types/redux'

export const getAllFeatures = (state: RootState) => state

export const getIsSocialLoginEnabled = (state: RootState): boolean =>
  state?.socialLogin
