import {Route, Routes} from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigiation'
import { ATISPage } from './pages/ATIS'
import { RoutesPage } from './pages/Routes'
import { ChartsPage } from './pages/Charts'
import { ICAOCodesPage } from './pages/ICAOCodes'
import { PIREPPage } from './pages/PIREP'

export default function App() {
  return (
    <div>
      <Navigation />
      
      <Routes>
        <Route path='/atis' element={<ATISPage />} />
        <Route path='/routes' element={<RoutesPage />} />
        <Route path='/charts' element={<ChartsPage />} />
        <Route path='/icao-codes' element={<ICAOCodesPage />} />
        <Route path='/pirep' element={<PIREPPage />} />
      </Routes>
    </div>
  )
}