import React from 'react';
import { shape, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import VeniaHeader from '@magento/venia-ui/lib/components/Header/header';
import CustomButton from '../CustomButton';
import defaultClasses from './Header.module.css';

const Header = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const handleCustomButtonClick = () => {
        alert('Botão customizado no header clicado!');
    };

    return (
        <div className={classes.headerWrapper}>
            <VeniaHeader {...props} />
            <div className={classes.customButtonContainer}>
                <CustomButton 
                    variant="primary" 
                    onClick={handleCustomButtonClick}
                    classes={{ primary: classes.headerButton }}
                >
                    Meu Botão
                </CustomButton>
            </div>
        </div>
    );
};

Header.propTypes = {
    classes: shape({
        headerWrapper: string,
        customButtonContainer: string,
        headerButton: string
    })
};

export default Header;
