import React from 'react';
import Image from '../Image/index.jsx';
import './style.css'

const Menu = ({ handleResetMenu, handleGoBack, menuHeader = null }) => {
    return (
        <div className='homeMenu'>
            <Image image="ChatbotBlack" />
            <div className='menu'>
                <h1>
                    {menuHeader}
                </h1>
                <ul>
                    {
                        handleResetMenu ?
                            <li
                                onClick={handleResetMenu}
                                className='actionButton'
                            >
                                Main Menu
                            </li>
                            :
                            null
                    }
                    {
                        handleGoBack ?
                            <li
                                onClick={handleGoBack}
                                className='actionButton'
                            >
                                Go Back
                            </li>
                            :
                            null
                    }
                </ul>
            </div>
        </div>
    );
}

export default Menu;
