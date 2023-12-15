"use client";
import { SetStateAction, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "~/components/Card";

export default function HomePage() {
  const front = "/svg_cards/ace_of_clubs.svg";
  const back = "/card_back.svg";
  const [isDealingToPlayer, setIsDealingToPlayer] = useState(false);
  const [isDealingToDealer, setIsDealingToDealer] = useState(false);
  const [isCleared, setIsCleared] = useState(false);

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
    await handleCardAction("Dealing to player first card", setIsDealingToPlayer, 1000);
    await handleCardAction("Clearing classes", setIsCleared, 10);

    await handleCardAction("Dealing to player second card", setIsDealingToPlayer, 1000);
    await handleCardAction("Clearing classes", setIsCleared, 100);

    await handleCardAction("Dealing to dealer", setIsDealingToDealer, 1000);
    await handleCardAction("Clearing classes", setIsCleared, 100);
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
            <div className="px-3">
              <Card front={front} back={back} clickable={false} />
            </div>
            {/* Dealer's initial card */}
            <div className="px-3">
              <Card front={front} back={back} />
            </div>
          </div>

          {/* Shoe Cards */}
          <div
            style={{ height: 150 }}
            className="flex flex-row justify-end pr-10"
          >
            <div
              className={
                isDealingToDealer
                  ? "diagonal-top-left"
                  : isDealingToPlayer
                    ? "diagonal-bottom-left"
                    : isCleared
                      ? "blank"
                      : ""
              }
            >
              {/* Base Card */}
              <Card front={front} back={back} clickable={false} />
            </div>
          </div>

          {/* Player Cards */}
          <div style={{ height: 150 }} className="flex flex-row justify-center">
            <div className="px-3">
              <Card front={front} back={back} />
            </div>
            <div className="px-3">
              <Card front={front} back={back} />
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
