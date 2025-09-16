import React from 'react';
import CustomButton from '../CustomButton';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './ExamplePage.module.css';

const ExamplePage = props => {
    const { classes: propClasses } = props;
    const classes = mergeClasses(defaultClasses, propClasses);

    const handlePrimaryClick = () => {
        alert('Botão primário amarelo clicado!');
    };

    const handleSecondaryClick = () => {
        alert('Botão secundário clicado!');
    };

    const handleDisabledClick = () => {
        // Este não será executado pois o botão está desabilitado
        alert('Este botão está desabilitado');
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Exemplo de CustomButton</h1>
            <p className={classes.description}>
                Demonstração do botão customizado com estilo primário amarelo
            </p>
            
            <div className={classes.buttonGroup}>
                <CustomButton 
                    variant="primary" 
                    onClick={handlePrimaryClick}
                >
                    Botão Primário Amarelo
                </CustomButton>
                
                <CustomButton 
                    variant="secondary" 
                    onClick={handleSecondaryClick}
                >
                    Botão Secundário
                </CustomButton>
                
                <CustomButton 
                    disabled={true}
                    onClick={handleDisabledClick}
                >
                    Botão Desabilitado
                </CustomButton>
            </div>

            <div className={classes.codeExample}>
                <h3>Como usar:</h3>
                <pre className={classes.code}>
{`import CustomButton from '../CustomButton';

// Botão primário (padrão)
<CustomButton onClick={handleClick}>
    Meu Botão
</CustomButton>

// Botão secundário
<CustomButton variant="secondary" onClick={handleClick}>
    Botão Secundário
</CustomButton>

// Botão desabilitado
<CustomButton disabled={true}>
    Desabilitado
</CustomButton>`}
                </pre>
            </div>
        </div>
    );
};

export default ExamplePage;
