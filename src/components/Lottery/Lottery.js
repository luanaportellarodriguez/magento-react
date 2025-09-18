import React, { useState } from 'react';
import styles from './Lottery.module.css';

const PowerballGame = () => {
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [powerball, setPowerball] = useState(null);
    const [result, setResult] = useState('');

    const toggleNumber = num => {
        if (selectedNumbers.includes(num)) {
            setSelectedNumbers(selectedNumbers.filter(n => n !== num));
        } else {
            if (selectedNumbers.length < 5)
                setSelectedNumbers([...selectedNumbers, num]);
        }
    };

    const playGame = () => {
        if (selectedNumbers.length !== 5 || powerball === null) {
            alert('Escolha 5 números e 1 Powerball antes de jogar!');
            return;
        }

        const drawnNumbers = [];
        while (drawnNumbers.length < 5) {
            const rand = Math.floor(Math.random() * 69) + 1;
            if (!drawnNumbers.includes(rand)) drawnNumbers.push(rand);
        }
        const drawnPowerball = Math.floor(Math.random() * 26) + 1;

        const matches = selectedNumbers.filter(n => drawnNumbers.includes(n))
            .length;
        const powerballMatch = powerball === drawnPowerball;

        setResult(
            `Sorteados: ${drawnNumbers.join(
                ', '
            )} | Powerball: ${drawnPowerball}\n` +
                `Você acertou ${matches} número(s) e o Powerball ${
                    powerballMatch ? 'SIM' : 'NÃO'
                }`
        );
    };

    const chooseRandomNumbers = () => {
        const randomNums = [];
        while (randomNums.length < 5) {
            const rand = Math.floor(Math.random() * 69) + 1;
            if (!randomNums.includes(rand)) randomNums.push(rand);
        }
        const randomPowerball = Math.floor(Math.random() * 26) + 1;
        setSelectedNumbers(randomNums);
        setPowerball(randomPowerball);
    };

    return (
        <div className={styles.container}>
            <h3>Escolha 5 números (1-69):</h3>
            <div className={styles.grid}>
                {[...Array(69)].map((_, i) => {
                    const num = i + 1;
                    const selected = selectedNumbers.includes(num);
                    return (
                        <button
                            key={num}
                            className={`${styles.numberButton} ${
                                selected ? styles.selected : ''
                            }`}
                            onClick={() => toggleNumber(num)}
                        >
                            {num}
                        </button>
                    );
                })}
            </div>

            <h3>Escolha 1 Powerball (1-26):</h3>
            <div className={styles.grid}>
                {[...Array(26)].map((_, i) => {
                    const num = i + 1;
                    return (
                        <button
                            key={num}
                            className={`${styles.numberButton} ${
                                powerball === num ? styles.selected : ''
                            }`}
                            onClick={() => setPowerball(num)}
                        >
                            {num}
                        </button>
                    );
                })}
            </div>

            <div className={styles.actions}>
                <button onClick={playGame} className={styles.playButton}>
                    ▶
                </button>
                <button
                    onClick={chooseRandomNumbers}
                    className={styles.randomButton}
                >
                    Escolher aleatório
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className={styles.clearButton}
                >
                    Limpar números
                </button>
            </div>

            {result && <div className={styles.result}>{result}</div>}
        </div>
    );
};

export default PowerballGame;
