"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function HomePage() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <main className="flex min-h-screen flex-col bg-green-900 text-white">
      <div className="flex flex-row justify-center">
        <h1 className="mt-3 text-5xl">Basic Strategy</h1>
      </div>

      <div className="flex flex-grow flex-col">
        <div className="flex-grow border border-solid border-white">
          <div className="card-container mt-3" onClick={handleFlip}>
            <div className={`card ${isFlipped ? "flipped" : ""}`}>
              <div className="card-front">
                <Image
                  src="/card_back.svg"
                  alt="Ace of Clubs"
                  width={100}
                  height={150}
                />
              </div>
              <div className="card-back">
                <Image src="/svg_cards/2_of_clubs.svg" alt="Ace of Clubs" width={100} height={150} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex justify-end">
          <div className="grid w-1/3 grid-cols-2 gap-4 border border-solid border-white p-3">
            <Button variant="primary">HIT</Button>
            <Button variant="primary">STAND</Button>
            <Button variant="primary">DOUBLE</Button>
            <Button variant="primary">SPLIT</Button>
            <Button variant="primary">SURRENDER</Button>
            <Button variant="primary">INSURANCE</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
