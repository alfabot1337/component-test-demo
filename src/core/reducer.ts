import { Reducer } from 'redux'

import { RootState, Action } from '../types/redux'

export const initialState: RootState = {}

export const rootReducer: Reducer<RootState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    default:
      return state
  }
}
