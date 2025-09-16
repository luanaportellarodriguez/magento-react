import React from 'react';
import { shape, string, func, node, bool } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './CustomButton.module.css';

/**
 * Botão customizado com estilo primário amarelo
 * Baseado nos padrões do Venia PWA Studio
 */
const CustomButton = props => {
    const {
        children,
        classes: propClasses,
        disabled = false,
        onClick,
        type = 'button',
        variant = 'primary',
        ...restProps
    } = props;

    const classes = mergeClasses(defaultClasses, propClasses);
    
    const buttonClass = disabled 
        ? classes.disabled 
        : classes[variant] || classes.primary;

    return (
        <button
            className={buttonClass}
            disabled={disabled}
            onClick={onClick}
            type={type}
            {...restProps}
        >
            {children}
        </button>
    );
};

CustomButton.propTypes = {
    classes: shape({
        primary: string,
        secondary: string,
        disabled: string
    }),
    children: node.isRequired,
    disabled: bool,
    onClick: func,
    type: string,
    variant: string
};

export default CustomButton;
