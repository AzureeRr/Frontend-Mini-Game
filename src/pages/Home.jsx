import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#333]">
      <div className="flex justify-center items-start h-auto">
        <h1 className="text-4xl font-semibold mt-8 font-fira text-white tracking-wide">
          Azuree's Hub
        </h1>
      </div>
      <div className="flex justify-center items-start h-full overflow-auto mt-60">
        <div className="grid gap-4">
          <div
            className="w-min h-min py-4 px-8 border-4 rounded flex gap-4 items-center justify-center text-4xl cursor-pointer hover:bg-blue-700 active:bg-blue-800 transition-colors"
            onClick={() => navigate("/memory")}
            aria-label="Memory Game Button"
          >
            <div className="text-[40px]">🧠</div>
            <div className="text-xl text-white">Memory Game</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
