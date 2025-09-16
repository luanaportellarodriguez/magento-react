import React, { useState } from "react";

const PowerballGame = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [powerball, setPowerball] = useState(null);
  const [result, setResult] = useState("");

  const toggleNumber = (num) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else {
      if (selectedNumbers.length < 5) {
        setSelectedNumbers([...selectedNumbers, num]);
      }
    }
  };

  const playGame = () => {
    if (selectedNumbers.length !== 5 || powerball === null) {
      alert("Escolha 5 números e 1 Powerball antes de jogar!");
      return;
    }

    // Sorteio dos 5 números principais
    const drawnNumbers = [];
    while (drawnNumbers.length < 5) {
      const rand = Math.floor(Math.random() * 69) + 1;
      if (!drawnNumbers.includes(rand)) {
        drawnNumbers.push(rand);
      }
    }

    // Sorteio do Powerball
    const drawnPowerball = Math.floor(Math.random() * 26) + 1;

    // Comparação
    const matches = selectedNumbers.filter((n) =>
      drawnNumbers.includes(n)
    ).length;
    const powerballMatch = powerball === drawnPowerball;

    setResult(
      `Sorteados: ${drawnNumbers.join(", ")} | Powerball: ${drawnPowerball}\n` +
      `Você acertou ${matches} número(s) e o Powerball ${powerballMatch ? "SIM" : "NÃO"}`
    );
  };

  const handleRefresh = () => {
    window.location.reload(); // Recarrega a página inteira
  };

  const chooseRandomNumbers = () => {
  // sorteia 5 números únicos de 1 a 69
  const randomNums = [];
  while (randomNums.length < 5) {
    const rand = Math.floor(Math.random() * 69) + 1;
    if (!randomNums.includes(rand)) {
      randomNums.push(rand);
    }
  }

  // sorteia 1 número de 1 a 26 para o Powerball
  const randomPowerball = Math.floor(Math.random() * 26) + 1;

  setSelectedNumbers(randomNums);
  setPowerball(randomPowerball);
};

  return (
    <div>

      <h3>Escolha 5 números (1-69):</h3>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(11, 1fr)", // 11 colunas
    gap: "6px",
    maxWidth: "700px" // opcional, só pra não ficar gigante
  }}
>
  {[...Array(69)].map((_, i) => {
    const num = i + 1;
    const selected = selectedNumbers.includes(num);
    return (
      <button
        key={num}
        onClick={() => toggleNumber(num)}
        style={{
          padding: "6px 10px",
          background: selected ? "#2ecc71" : "#ecf0f1",
          border: "1px solid #7f8c8d",
          borderRadius: 4,
        }}
      >
        {num}
      </button>
    );
  })}
</div>


      <h3
        style={{
    marginTop: "20px"
  }}
      >Escolha 1 Powerball (1-26):</h3>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(11, 1fr)", // 11 colunas
    gap: "6px",
    maxWidth: "700px", // opcional, só pra não ficar gigante
  }}
>
        {[...Array(26)].map((_, i) => {
          const num = i + 1;
          return (
            <button
              key={num}
              onClick={() => setPowerball(num)}
              style={{
                margin: 2,
                padding: "6px 10px",
                background: powerball === num ? "#2ecc71" : "#ecf0f1",
                border: "1px solid #7f8c8d",
                borderRadius: 4,
              }}
            >
              {num}
            </button>
          );
        })}
      </div>


      <button
        onClick={playGame}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "#3498db",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Play
      </button>

      <button
        onClick={chooseRandomNumbers}
        style={{
          marginTop: 20,
          marginLeft: 20,
          padding: "10px 20px",
          background: "white",
          color: "#3498db",
          border: "1px solid #3498db",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Escolher aleatório
      </button>

      <button
        onClick={handleRefresh}
        style={{
          marginTop: 20,
          marginLeft: 20,
          padding: "10px 20px",
          background: "white",
          color: "#3498db",
          textDecoration: "underline",
          border: "none",
          cursor: "pointer",
        }}
      >
        Atualizar
      </button>

      {result && (
        <div style={{ marginTop: 20, whiteSpace: "pre-line" }}>{result}</div>
      )}
    </div>
  );
};

export default PowerballGame;
