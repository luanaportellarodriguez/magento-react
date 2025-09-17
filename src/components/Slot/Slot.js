import React, { useState } from 'react';
import './Slot.css';

const symbols = [
    { char: '*', color: '#ffbe0b', value: 2 },
    { char: '@', color: '#fb5607', value: 2 },
    { char: '#', color: '#ff006e', value: 2 },
    { char: '%', color: '#8338ec', value: 10 },
    { char: '&', color: '#3a86ff', value: 50 }
];

function getRandomSymbol() {
    const weightedSymbols = [
        symbols[0],
        symbols[0],
        symbols[0],
        symbols[1],
        symbols[1],
        symbols[1],
        symbols[2],
        symbols[2],
        symbols[2],
        symbols[3],
        symbols[3],
        symbols[4]
    ];
    return weightedSymbols[Math.floor(Math.random() * weightedSymbols.length)];
}

const SlotGame = () => {
    const [reels, setReels] = useState([symbols[0], symbols[1], symbols[2]]);
    const [message, setMessage] = useState('');
    const [spinning, setSpinning] = useState(false);

    const spin = () => {
        if (spinning) return;
        setSpinning(true);
        setMessage('');

        const finalReels = [
            getRandomSymbol(),
            getRandomSymbol(),
            getRandomSymbol()
        ];
        const newReels = [...reels];

        finalReels.forEach((finalSymbol, i) => {
            let count = 0;
            const interval = setInterval(() => {
                // durante o spin, mostra símbolos aleatórios
                newReels[i] = getRandomSymbol();
                setReels([...newReels]);
                count++;
            }, 100);

            // para o reel em tempos diferentes
            setTimeout(() => {
                clearInterval(interval);
                newReels[i] = finalSymbol;
                setReels([...newReels]);

                // se for o último reel que parou, checar resultado
                if (i === finalReels.length - 1) {
                    checkWin(finalReels);
                    setSpinning(false);
                }
            }, 1000 + i * 500); // reel 0 para em 1s, reel 1 em 1.5s, reel 2 em 2s
        });
    };

    const checkWin = reels => {
        if (
            reels[0].char === reels[1].char &&
            reels[1].char === reels[2].char
        ) {
            if (reels[0].value > 0) {
                setMessage(`🎉 Você ganhou ${reels[0].value} pontos!`);
            } else {
                setMessage('3 iguais, mas não valem nada 😅');
            }
        } else {
            setMessage('Nada dessa vez...');
        }
    };

    return (
        <div className="slot-container">
            <div className="slot-content">
                <h1>Slot Machine</h1>
                <div className="slot-reels">
                    {reels.map((s, index) => (
                        <div
                            key={index}
                            className="slot-symbol"
                            style={{ backgroundColor: s.color }}
                        >
                            {s.char}
                        </div>
                    ))}
                </div>
                <button
                    className="slot-button"
                    onClick={spin}
                    disabled={spinning}
                >
                    {spinning ? 'Girando...' : 'Play'}
                </button>
                <h2 className="slot-message">{message}</h2>
            </div>
        </div>
    );
};

export default SlotGame;
