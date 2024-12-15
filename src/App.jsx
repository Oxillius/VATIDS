import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import Navigation from './components/Navigiation'
import { ATISPage } from './pages/ATIS'
import { RoutesPage } from './pages/Routes'
import { ChartsPage } from './pages/Charts'
import { ICAOCodesPage } from './pages/ICAOCodes'
import { PIREPPage } from './pages/PIREP'
import { SplashPage } from './pages/Splash';

export default function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname != '/' && <Navigation />} 

      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path='/atis' element={<ATISPage />} />
        <Route path='/routes' element={<RoutesPage />} />
        <Route path='/charts' element={<ChartsPage />} />
        <Route path='/icao-codes' element={<ICAOCodesPage />} />
        <Route path='/pirep' element={<PIREPPage />} />
      </Routes>
    </div>
  )
}