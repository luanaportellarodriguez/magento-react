import React, { useState } from 'react';
import './Roulette.css';

const prizes = [
    { label: 'R$ 2', value: 2 },
    { label: 'R$ 2', value: 2 },
    { label: 'R$ 2', value: 2 },
    { label: 'R$ 2', value: 2 },
    { label: 'R$ 2', value: 2 },
    { label: 'R$ 50', value: 50 },
    { label: 'R$ 50', value: 50 },
    { label: 'R$ 100', value: 100 },
    { label: 'R$ 500', value: 500 },
    { label: 'R$ 1000', value: 1000 }
];

const Roulette = () => {
    const [rotation, setRotation] = useState(0); // graus acumulados
    const [duration, setDuration] = useState(4); // segundos da transição
    const [result, setResult] = useState(null);
    const [spinning, setSpinning] = useState(false);

    const slices = prizes.length;
    const sliceAngle = 360 / slices;

    function spin() {
        if (spinning) return;
        setSpinning(true);
        setResult(null);

        const randomIndex = Math.floor(Math.random() * slices);

        // voltas extras
        const spinsCount = Math.floor(Math.random() * 3) + 3;
        const extraSpinsDegrees = spinsCount * 360;

        const centerAngle = randomIndex * sliceAngle + sliceAngle / 2;

        const finalRotation =
            rotation + extraSpinsDegrees + (360 - centerAngle);

        // velocidade
        const newDuration = 3 + spinsCount * 1;
        setDuration(newDuration);

        setTimeout(() => setRotation(finalRotation), 20);

        // quando a animação terminar, calcula **qual** fatia ficou sob o ponteiro a partir do ângulo final
        setTimeout(() => {
            // normaliza 0..359
            const normalized = ((finalRotation % 360) + 360) % 360;
            const targetAngle = (360 - normalized) % 360;
            const landedIndex = Math.floor(targetAngle / sliceAngle) % slices;
            console.log('landedIndex', landedIndex, prizes[landedIndex]);

            setResult(prizes[landedIndex].label);
            setSpinning(false);
        }, Math.round(newDuration * 1000) + 120);
    }

    return (
        <div className="roulette-container">
            <div
                className="roulette-wheel"
                style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: `transform ${duration}s cubic-bezier(0.33, 1, 0.68, 1)`
                }}
            >
                {prizes.map((p, i) => {
                    const rotate = i * sliceAngle;
                    const bg = i % 2 === 0 ? '#f39c12' : '#e74c3c';
                    return (
                        <div
                            key={i}
                            className="slice"
                            style={{
                                transform: `rotate(${rotate}deg) skewY(-54deg)`,
                                background: bg
                            }}
                        >
                            {/* label dentro da fatia, desfazendo a skew para ficar legível */}
                            <div
                                className="slice-label"
                                style={{
                                    transform: `skewY(54deg) rotate(${sliceAngle /
                                        2}deg)`
                                }}
                            >
                                {p.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="pointer" />
            <button onClick={spin} disabled={spinning}>
                {spinning ? 'Girando...' : 'Play'}
            </button>

            {result && <h2 className="result">Você ganhou: {result}!</h2>}
        </div>
    );
};
export default Roulette;
