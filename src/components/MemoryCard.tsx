import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";

const MemoryCard = () => {
  const [score, setScore] = useState<number>(0);
  const [highestScore, setHighestScore] = useState<number>(0);
  const [selectedCards, setSelectedCards] = useState<Array<string>>([]);
  const { response } = useFetch(
    "https://rickandmortyapi.com/api/character",
    10
  );

  const shuffle = () => {
    response.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (card: string) => {
    setSelectedCards([...selectedCards, card]);
    setScore(score + 1);

    if (selectedCards.includes(card)) {
      setHighestScore((prevScore: number) =>
        prevScore > score ? prevScore : score
      );
      setSelectedCards([]);
      setScore(0);
    }
  };

  useEffect(() => {
    shuffle();
  }, [response, selectedCards]);

  return (
    <div className="container">
      <h3>Score: {score}</h3>
      <h3>Highest Score: {highestScore}</h3>
      <div className="char-container">
        {response.map((char: any) => (
          <div
            key={char.name}
            className="char-info"
            onClick={() => handleCardClick(char.name)}
          >
            <img src={char.image} />
            <p>{char.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryCard;
