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
        symbols[1],
        symbols[1],
        symbols[1],
        symbols[2],
        symbols[2],
        symbols[2],
        symbols[3],
        symbols[3],
        symbols[3],
        symbols[4],
        symbols[4],
        symbols[4]
    ];
    return weightedSymbols[Math.floor(Math.random() * weightedSymbols.length)];
}

const SlotGame = () => {
    const [reels, setReels] = useState([symbols[0], symbols[1], symbols[2]]);
    const [message, setMessage] = useState('');
    const [spinning, setSpinning] = useState(false);
    const [anticipation, setAnticipation] = useState(false);
    const [winHighlight, setWinHighlight] = useState(false);

    const spin = () => {
        if (spinning) return;
        setSpinning(true);
        setMessage('');
        setAnticipation(false);
        setWinHighlight(false); // reset do efeito de vitória ao clicar no Play

        const finalReels = [
            getRandomSymbol(),
            getRandomSymbol(),
            getRandomSymbol()
        ];
        const newReels = [...reels];

        finalReels.forEach((finalSymbol, i) => {
            const interval = setInterval(() => {
                newReels[i] = getRandomSymbol();
                setReels([...newReels]);
            }, 100);

            let stopTime = 1000 + i * 500;

            setTimeout(() => {
                clearInterval(interval);
                newReels[i] = finalSymbol;
                setReels([...newReels]);

                // quando o SEGUNDO reel parar, checa anticipation
                if (i === 1 && finalReels[0].char === finalReels[1].char) {
                    setAnticipation(true);
                }

                // quando o TERCEIRO reel parar
                if (i === finalReels.length - 1) {
                    setAnticipation(false);
                    checkWin(finalReels);
                    setSpinning(false);
                }
            }, stopTime);
        });
    };

    const checkWin = reels => {
        if (
            reels[0].char === reels[1].char &&
            reels[1].char === reels[2].char
        ) {
            if (reels[0].value > 0) {
                setMessage(`🎉 Você ganhou ${reels[0].value} pontos!`);
                setWinHighlight(true); // ativa highlight de vitória
            }
        } else {
            const sorteio = Math.floor(Math.random() * 2) + 1;

            if (sorteio === 1) {
                setMessage('Nada!');
            } else {
                setMessage('Nadinha!');
            }
        }
    };

    return (
        <div className="slot-container">
            <div className="slot-content">
                <div className="slot-reels">
                    {reels.map((s, index) => (
                        <div
                            key={index}
                            className={`slot-symbol 
                                ${
                                    anticipation && index === 2
                                        ? 'anticipation'
                                        : ''
                                } 
                                ${winHighlight ? 'win' : ''}`}
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
                    {spinning ? 'GIRANDO' : '▶'}
                </button>
                <h2 className="slot-message">{message}</h2>
            </div>
        </div>
    );
};

export default SlotGame;
