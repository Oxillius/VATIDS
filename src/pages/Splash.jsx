import { Link } from "react-router-dom";
import './Splash.css';

export const SplashPage = () => {
  return (
    <div>
      <div className="splash-grid">
        <div className="splash-image"></div>
        <div className="splash-container">
          <div className="login-container">
            <h1>vE-IDS</h1>
            <p>Virtual Enterprise Information Display System</p>
            <Link to="/atis" className="sign-in-button">Sign in with VATSIM</Link>
          </div>
          <footer className="version-footer">
            <b>Version</b>
            <p>0.1.0</p>
          </footer>
        </div>
      </div>
    </div>
  )
}