import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllFeatures } from '../../core/selectors'
import { toggleFeature } from '../../core/actions'

export const FeatureTogglesDashboard: FC = () => {
  const dispatch = useDispatch()
  const features = useSelector(getAllFeatures)
  const featureArray = Object.entries(features)

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
      }}
    >
      {featureArray.map(([featureName, isEnabled]) => (
        <div key={featureName}>
          <span>
            {featureName} - {isEnabled.toString()}
          </span>
          <button
            style={{ marginLeft: '2rem' }}
            onClick={() => dispatch(toggleFeature(featureName))}
          >
            Toggle
          </button>
        </div>
      ))}
    </div>
  )
}
