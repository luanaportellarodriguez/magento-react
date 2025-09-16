import React from 'react';
import CustomButton from '../CustomButton';
import defaultClasses from './FloatingButton.module.css';

const FloatingButton = () => {
    const handleClick = () => {
        alert('Botão customizado amarelo clicado!');
    };

    return (
        <div className={defaultClasses.floatingContainer}>
            <CustomButton 
                variant="primary" 
                onClick={handleClick}
                classes={{ primary: defaultClasses.floatingButton }}
            >
                Meu Botão
            </CustomButton>
        </div>
    );
};

export default FloatingButton;
