import React from 'react';
import './Logo.css';
import burgerLogo from '../../assets/Images/burger-logo.png';

function Logo() {
    return (
        <div className="Logo">
            <img src={burgerLogo} alt="Burger Logo"/>
        </div>
    )
}

export default Logo;
