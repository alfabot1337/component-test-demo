import { FeatureNames } from '../core/featureToggles'

export type Action = {
  type: string
  payload?: any
}

export type RootState = {
  [key in FeatureNames]: boolean
}
