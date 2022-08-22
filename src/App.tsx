import React from 'react'

import { Login } from './components/Login/Login'
import { FeatureTogglesDashboard } from './components/FeatureTogglesDashboard/FeatureTogglesDashboard'

import './App.css'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Login />
        <FeatureTogglesDashboard />
      </header>
    </div>
  )
}

export default App
