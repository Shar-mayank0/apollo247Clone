import React from 'react'
import Image from 'next/image'

function NavBar() {
    return (
    <div className="navbar-container">
        <div className="navbar-upper">
            <div className="navbar-logo-location">
                <div className="logo-container">
                    <a title="Home" className="logo-link" href="/">
                    <img src="/images/apollo247.svg" title="Online Doctor Consultation &amp; Medicines" alt="Online Doctor Consultation &amp; Medicines" width="69" height="69" className="logo-image" />
                    </a>
                </div>
                <div className="location-container">
                    <div className="location-wrapper">
                        <div className="location-icon-wrapper">
                            <span className="location-icon-span">
                                <img src="/images/location-icon.svg" alt="chooseLocation" width="24" height="24" loading="lazy" fetchPriority="low" className="location-icon" />
                            </span>
                            <div className="location-text">
                                <label className="location-label">Select Location</label>
                                <div className="location-value">
                                    <p className="location-address">Select Address</p>
                                    <span className="dropdown-icon"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="parent-search-login">

            <div className="search-section flex-row mt-10">
                <div className="search-container">
                    <div className="search-box "><span className="search-icon-span"></span>
                        <img src="/images/search-icon.svg" alt="Search" width="28" height="28" loading="lazy" fetchPriority="low" className="search-icon" />
                        <input placeholder="Search Doctors, Specialities, Conditions etc." title="Search" className="search-input" />
                    </div>
                </div>
            </div>
            <div className="login-section">
                <ul className="login-menu">
                    <li>
                        <div id="loginPopup" title="Login/SignUp" className="login-button">
                            <span className="login-icon">
                            </span>
                            <div className="login-text">
                                <span className="login-text-label">Login</span>
                                <span className="login-dropdown-icon"></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
            </div>
        <div className="nav-menu-container">
            <div className="nav-menu">
                <ul className="menu-list">
                    <li className="menu-item"><a href="https://www.apollopharmacy.in">Buy Medicines</a></li>
                    <li className="menu-item"><a href="/specialties">Find Doctors</a></li>
                    <li className="menu-item"><a href="/lab-tests">Lab Tests</a></li>
                    <li className="menu-item"><a href="/circle-landing">Circle Membership</a></li>
                    <li className="menu-item"><a href="/guest-health-records">Health Records</a></li>
                    <li className="menu-item"><a href="/apollo-super6-program">Diabetes Reversal</a></li>
                    <li className="menu-item">
                        <a href="https://apollo247insurance.com/health-insurance">
                            Buy Insurance
                            <div className="new-badge">New</div>
                        </a>
                    </li>
                </ul>
            </div>
            <div id="webengageNotificationContainer"></div>
        </div>
    </div>
  )
}

export default NavBar