import { useState } from 'react';
import './Navigation.css';
import { Link } from "react-router-dom";

export default function Navigation() {
	const getLiveTime = () => {
		return new Date().toISOString().slice(11, 19);
	}
	let time = getLiveTime();
	const [currentTime, setCurrentTime] = useState(time);
	const updateTime = () => {
		setCurrentTime(getLiveTime())
	}
	setInterval(updateTime, 1000)

  return (
		<header className='navbar_header'>
			<nav className='navbar_nav'>
				<div className='navbar_links'>
					<div className='zulutime_container'>
						<p>ZMA <span>IDS</span></p>
					</div>
					<Link to="/atis" className='navbar_link'>ATIS</Link>
					<Link to="/routes" className='navbar_link'>Routes</Link>
					<Link to="/charts" className='navbar_link'>Charts</Link>
					<Link to="/icao-codes" className='navbar_link'>ICAO Codes</Link>
					<Link to="/pirep" className='navbar_link'>PIREP</Link>
				</div>
			</nav>
		</header>
  )
}