import { Action } from '../types/redux'

const ActionTypes = {
  toggleFeature: 'FEATURE/TOGGLE_FEATURE',
  login: 'APP/LOGIN',
  googleSocialLogin: 'APP/GOOGLE_SOCIAL_LOGIN',
  facebookSocialLogin: 'APP/FACEBOOK_SOCIAL_LOGIN',
}

export const toggleFeature = (feature: string): Action => ({
  type: ActionTypes.toggleFeature,
  payload: feature,
})

export const login = (): Action => ({
  type: ActionTypes.login,
})

export const googleSocialLogin = (): Action => ({
  type: ActionTypes.googleSocialLogin,
})

export const facebookSocialLogin = (): Action => ({
  type: ActionTypes.facebookSocialLogin,
})
