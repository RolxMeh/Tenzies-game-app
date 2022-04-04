import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";

export default function AppComponent() {
  const generateNewNum = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };

  const allDice = () => {
    return Array(36)
      .fill()
      .map(() => generateNewNum());
  };

  const [dice, setDice] = useState(allDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allDiceHeld = dice.every((dic) => dic.isHeld);
    const firstDiceValue = dice[0].value;
    const allDiceValue = dice.every((dic) => dic.value === firstDiceValue);

    if (allDiceHeld && allDiceValue) {
      setTenzies(true);
    }
  }, [dice]);

  const holdDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((dic) => {
        return dic.id === id ? { ...dic, isHeld: !dic.isHeld } : dic;
      })
    );
  };

  const diceNum = dice.map((val) => (
    <Dice
      value={val.value}
      key={val.id}
      clickFunc={() => holdDice(val.id)}
      isHeld={val.isHeld}
    />
  ));

  const rollDice = () => {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((dic) => {
          return dic.isHeld ? dic : generateNewNum();
        })
      );
    } else {
      setTenzies(false);
      setDice(allDice());
    }
  };
  return (
    <main className="bg-gray-900 w-full h-screen p-4 flex flex-col justify-center items-center">
      <div className=" grid grid-cols-6 gap-2">{diceNum}</div>
      <button
        className="bg-blue-700 w-28 h-10 mt-6 text-xl text-white rounded-md"
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
