import { useState } from 'react';
import './Navigation.css';
import { Link } from "react-router-dom";

export default function Navigation() {
	const getLiveTime = () => {
		return new Date().toISOString().slice(11, 19);
	}

	const [currentTime, setCurrentTime] = useState(getLiveTime());
	const [isDropdownVisible, setDropdownVisible] = useState(false);
	
	const updateTime = () => {
		setCurrentTime(getLiveTime());
	}

	const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);  // toggle dropdown visibility
  }

	setInterval(updateTime, 1000);

  return (
		<header className='navbar-header'>
			<nav className='navbar'>
				<div className='nav_info_container'>
					<p>{currentTime}</p>
					<h1>vE-IDS - ZMA ARTCC</h1>
				</div>

				<div className='navbar_links'>
					<div className='nav-text-bar'>
						<p className='nav-textbox nav-error-textbox'>IDS errors show here</p>
						<div className='error-button-container'>
							<button>ACK</button>
							<button>View</button>
						</div>
					</div>
					<Link to="/atis" className='nav-button-link storage-svg'></Link>
					<Link to="/settings" className='nav-button-link settings-svg'></Link>
					<div className='nav-text-bar'>
						<input className='search-input nav-textbox' type='text' placeholder='Search Thingy Things Here'/>
						<button className='search-svg'></button>
					</div>
				</div>

				<div className="welcome-container">
					<button className='welcome-username' onClick={toggleDropdown}>Welcome, Connor Allen</button>
					{isDropdownVisible && (
						<div className="dropdown-menu">
							<ul>
								<p className='dropdown'>1681814</p>
								<p>ZMA Instructor</p>
							</ul>
							<button>Change Position</button>
							<button>Logout</button>
						</div>
					)}
				</div>
			</nav>
		</header>
  )
}