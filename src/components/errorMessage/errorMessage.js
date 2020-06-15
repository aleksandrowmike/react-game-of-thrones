import React from 'react';
import error from './error.jpg';
import './errorMessage.css'
const ErrorMessage = () => {
    return (
        <>
            <img src={error} alt="error"/>
            <span>Ошибка загрузки</span>
        </>
    );
}

export default ErrorMessage;
