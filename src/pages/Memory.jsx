import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Memory = () => {
  const navigate = useNavigate();

  const [arrayNum, setArrayNum] = useState(16);
  const [gridCol, setGridCol] = useState(4);
  const [time, setTime] = useState(3000);
  const [gameLocked, setGameLocked] = useState(true);
  const [icons, setIcons] = useState(["😱", "🫀", "📦", "🔭", "👾", "🌟"]);

  const [firstSelected, setFirstSelected] = useState(null);
  const [secondSelected, setSecondSelected] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrectPairs, setIncorrectPairs] = useState([]);
  const [correctPairs, setCorrectPairs] = useState([]);

  const [cells, setCells] = useState(
    Array(arrayNum)
      .fill(null)
      .map(() => ({
        emoji: "",
        isVisible: false,
      }))
  );

  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  };

  const setDifficulty = (diff) => {
    if (diff === "Easy") {
      setArrayNum(16);
      setGridCol(4);
      setIcons(["😱", "🫀", "📦", "🔭", "👾", "🌟"]);
      setTime(3000);
      setGameLocked(true);
    } else if (diff === "Medium") {
      setArrayNum(20);
      setGridCol(5);
      setIcons(["😱", "🫀", "📦", "🔭", "👾", "🌟", "🔥", "🚀"]);
      setTime(2000);
      setGameLocked(true);
    } else if (diff === "Hard") {
      setArrayNum(24);
      setGridCol(6);
      setIcons(["😱", "🫀", "📦", "🔭", "👾", "🌟", "🔥", "🚀", "🪐", "💎"]);
      setTime(1000);
      setGameLocked(true);
    }

    setMatchedPairs(0);
    setScore(0);
    setFirstSelected(null);
    setSecondSelected(null);
    setIncorrectPairs([]);
    setCorrectPairs([]);
  };

  useEffect(() => {
    const pairs = [];
    for (let i = 0; i < arrayNum / 2; i++) {
      const emoji = icons[i % icons.length];
      pairs.push(emoji, emoji);
    }

    const shuffledPairs = pairs.sort(() => Math.random() - 0.5);

    const newCells = shuffledPairs.map((emoji) => ({
      emoji,
      isVisible: true,
    }));

    setCells(newCells);

    const timer = setTimeout(() => {
      setCells((prevCells) =>
        prevCells.map((cell) => ({
          ...cell,
          isVisible: false,
        }))
      );
      setGameLocked(false);
    }, time);

    return () => clearTimeout(timer);
  }, [arrayNum, icons, time]);

  const handleClick = (index) => {
    if (gameLocked) return;

    if (firstSelected === null) {
      setFirstSelected(index);
      setCells((prevCells) => {
        const updatedCells = [...prevCells];
        updatedCells[index].isVisible = true;
        return updatedCells;
      });
    } else if (secondSelected === null && index !== firstSelected) {
      setSecondSelected(index);
      setCells((prevCells) => {
        const updatedCells = [...prevCells];
        updatedCells[index].isVisible = true;
        return updatedCells;
      });
    }
  };

  useEffect(() => {
    if (firstSelected !== null && secondSelected !== null) {
      if (cells[firstSelected].emoji === cells[secondSelected].emoji) {
        setMatchedPairs((prev) => prev + 1);
        setScore((prevScore) => prevScore + 10);

        setCorrectPairs((prev) => [...prev, firstSelected, secondSelected]);
      } else {
        setCells((prevCells) => {
          const updatedCells = [...prevCells];
          updatedCells[firstSelected].isVisible = true;
          updatedCells[secondSelected].isVisible = true;

          setIncorrectPairs((prev) => [...prev, firstSelected, secondSelected]);

          return updatedCells;
        });
        setScore((prevScore) => Math.max(prevScore - 5, 0));
      }

      setFirstSelected(null);
      setSecondSelected(null);
    }
  }, [firstSelected, secondSelected, cells]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#333]">
      <h1 className="text-4xl font-semibold mt-8 font-fira text-white tracking-wide text-center">
        Memory Game!
      </h1>

      <h2 className="text-2xl font-semibold text-white text-center mt-6">
        Score: {score}
      </h2>

      <div className="w-screen h-fit flex justify-center gap-4 m-0">
        <button
          className="px-8 py-2 rounded mt-8 bg-green-400 cursor-pointer font-semibold hover:bg-green-500 active:bg-green-600 transition-colors"
          onClick={() => setDifficulty("Easy")}
        >
          Easy
        </button>
        <button
          className="px-8 py-2 rounded mt-8 bg-yellow-400 cursor-pointer font-semibold hover:bg-yellow-500 active:bg-yellow-600 transition-colors"
          onClick={() => setDifficulty("Medium")}
        >
          Medium
        </button>
        <button
          className="px-8 py-2 rounded mt-8 bg-red-400 cursor-pointer font-semibold hover:bg-red-500 active:bg-red-600 transition-colors"
          onClick={() => setDifficulty("Hard")}
        >
          Hard
        </button>
      </div>

      {/* Return to Home button */}
      <div className="w-screen h-fit flex justify-center gap-4 m-0">
        <button
          className="px-8 py-2 rounded mt-8 text-gray-800 bg-gray-400 cursor-pointer font-semibold transition-colors hover:bg-gray-500 active:bg-gray-600"
          onClick={() => {
            navigate("/");
          }}
        >
          Return to Hub
        </button>
      </div>

      <div className="flex justify-center items-start h-full overflow-auto mt-8">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${gridCol}, minmax(6rem, 1fr))`,
          }}
        >
          {cells.map((cell, index) => (
            <div
              key={index}
              className={`w-24 h-24 border-4 rounded flex items-center justify-center text-4xl hover:shadow-md cursor-pointer hover:shadow-red-200
                    ${cell.isVisible ? "border-white" : "bg-gray-300"}
                    ${
                      incorrectPairs.includes(index)
                        ? "bg-red-500 border-red-700"
                        : ""
                    }
                    ${
                      correctPairs.includes(index)
                        ? "bg-green-500 border-green-700"
                        : ""
                    }`}
              onClick={() => handleClick(index)}
            >
              {cell.isVisible ? cell.emoji : null}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Memory;
