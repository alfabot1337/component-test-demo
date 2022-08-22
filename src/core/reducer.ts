import { Reducer } from 'redux'

import { RootState, Action } from '../types/redux'
import { FeatureNames } from './featureToggles'

export const initialState: RootState = {
  socialLogin: true,
}

export const rootReducer: Reducer<RootState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'FEATURE/TOGGLE_FEATURE': {
      const toggleName = action.payload as FeatureNames
      const toggleState = state[toggleName]

      return { ...state, [action.payload]: !toggleState }
    }
    default:
      return state
  }
}
