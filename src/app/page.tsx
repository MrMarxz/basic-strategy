"use client";
import { SetStateAction, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "~/components/Card";

export default function HomePage() {
  const front = "/svg_cards/ace_of_clubs.svg";
  const back = "/card_back.svg";

  const [isDealingPlayerFirstCard, setIsDealingPlayerFirstCard] = useState(false);
  const [isDealingPlayerSecondCard, setIsDealingPlayerSecondCard] = useState(false);
  const [isDealingDealerFirstCard, setIsDealingDealerFirstCard] = useState(false);
  const [isDealingDealerSecondCard, setIsDealingDealerSecondCard] = useState(false);

  const [isPlayerFirstCardFlipped, setIsPlayerFirstCardFlipped] = useState(false);
  const [isPlayerSecondCardFlipped, setIsPlayerSecondCardFlipped] = useState(false);
  const [isDealerFirstCardFlipped, setIsDealerFirstCardFlipped] = useState(false);
  const [isDealerSecondCardFlipped, setIsDealerSecondCardFlipped] = useState(false);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleCardAction = async (
    actionMessage: string,
    stateSetter: {
      (value: SetStateAction<boolean>): void;
      (value: SetStateAction<boolean>): void;
      (value: SetStateAction<boolean>): void;
      (arg0: boolean): void;
    },
    delayTime: number,
  ) => {
    console.log(actionMessage);
    stateSetter(true);
    await delay(delayTime);
    stateSetter(false);
  };

  const handleDeal = async () => {
    await handleCardAction(
      "Dealing to player first card",
      setIsDealingPlayerFirstCard,
      1000,
    );
    setIsPlayerFirstCardFlipped(true);

    await handleCardAction(
      "Dealing to player second card",
      setIsDealingPlayerSecondCard,
      1000,
    );
    setIsPlayerSecondCardFlipped(true);

    await handleCardAction(
      "Dealing to dealer first card",
      setIsDealingDealerFirstCard,
      1000,
    );

    await handleCardAction(
      "Dealing to dealer second card",
      setIsDealingDealerSecondCard,
      1000,
    );
    setIsDealerSecondCardFlipped(true);
  };

  return (
    <main className="flex min-h-screen flex-col bg-green-900 text-white">
      <div className="flex flex-col">
        <div className="flex flex-row justify-center">
          <h1 className="mt-3 text-5xl">Basic Strategy</h1>
        </div>

        <div
          style={{ height: 500 }}
          className="flex h-fit flex-col border border-solid border-white"
        >
          {/* Dealer Cards */}
          <div style={{ height: 150 }} className="flex flex-row justify-center">
            <div className={ isDealingDealerFirstCard ? "move-dealer-first-card" : "blank" }>
              <Card front={front} back={back} isFlipped={isDealerFirstCardFlipped} />
            </div>
            <div className={ isDealingDealerSecondCard ? "move-dealer-second-card" : "blank"}>
              <Card front={front} back={back} isFlipped={isDealerSecondCardFlipped} />
            </div>
          </div>

          {/* Shoe Cards */}
          <div
            style={{ height: 150 }}
            className="flex flex-row justify-end pr-10"
          >
            {/* Base Card */}
            <Card front={front} back={back} isFlipped={false} />
          </div>

          {/* Player Cards */}
          <div style={{ height: 150 }} className="flex flex-row justify-center">
            <div
              className={
                isDealingPlayerFirstCard ? "move-player-first-card" : "blank"
              }
            >
              <Card front={front} back={back} isFlipped={isPlayerFirstCardFlipped} />
            </div>
            <div
              className={
                isDealingPlayerSecondCard ? "move-player-second-card" : "blank"
              }
            >
              <Card front={front} back={back} isFlipped={isPlayerSecondCardFlipped} />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mt-2 flex justify-end">
            <div className="grid w-1/3 grid-cols-2 gap-4 border border-solid border-white p-3">
              <Button variant="primary">HIT</Button>
              <Button variant="primary">STAND</Button>
              <Button variant="primary">DOUBLE</Button>
              <Button variant="primary">SPLIT</Button>
              <Button variant="primary">SURRENDER</Button>
              <Button variant="primary">INSURANCE</Button>
              <Button variant="primary" onClick={handleDeal}>
                DEAL
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
