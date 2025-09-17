import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
    const history = useHistory();

    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                onClick={() => history.push('/roulette')}
            >
                Roleta
            </button>
            <button
                className={styles.button}
                onClick={() => history.push('/lottery')}
            >
                Loteria
            </button>
            <button
                className={styles.button}
                onClick={() => history.push('/slot')}
            >
                Slot
            </button>
        </div>
    );
};

export default HomePage;
