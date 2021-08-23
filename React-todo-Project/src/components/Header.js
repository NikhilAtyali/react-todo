import React from 'react'
import logo from '../assets/images/logo.svg';

export const Header = () => {
    return (
        
        <header className="header">
            <nav>
            <div className="logo">
                <img src={logo} alt="todolist"></img>
            </div>
            </nav>
        </header>
    )
}

export default Header;