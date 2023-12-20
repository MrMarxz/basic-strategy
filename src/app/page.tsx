/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { type SetStateAction, useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";
import Card from "~/components/Card";
import { getCorrectAction, getRandomCard } from "~/utils/actions";

export default function HomePage() {
  const front = "/svg_cards/ace_of_clubs.svg";

  const [handleDealCount, setHandleDealCount] = useState(0);
  const [correctActionCount, setCorrectActionCount] = useState(0);
  const [playerTotalRounds, setPlayerTotalRounds] = useState(0);
  const [accuracy, setAccuracy] = useState(0);


  const isInitialMount = useRef(true);

  const [playerFirstCardImagePath, setPlayerFirstCardImagePath] =
    useState(front);
  const [playerSecondCardImagePath, setPlayerSecondCardImagePath] =
    useState(front);
  const [dealerFirstCardImagePath, setDealerFirstCardImagePath] =
    useState(front);

  const [isDealingPlayerFirstCard, setIsDealingPlayerFirstCard] =
    useState(false);
  const [isDealingPlayerSecondCard, setIsDealingPlayerSecondCard] =
    useState(false);
  const [isDealingDealerFirstCard, setIsDealingDealerFirstCard] =
    useState(false);
  const [isDealingDealerSecondCard, setIsDealingDealerSecondCard] =
    useState(false);

  const [isPlayerFirstCardFlipped, setIsPlayerFirstCardFlipped] =
    useState(false);
  const [isPlayerSecondCardFlipped, setIsPlayerSecondCardFlipped] =
    useState(false);
  const [isDealerFirstCardFlipped, setIsDealerFirstCardFlipped] =
    useState(false);
  const [isDealerSecondCardFlipped, setIsDealerSecondCardFlipped] =
    useState(false);

  const [isPlayerFirstCardHidden, setIsPlayerFirstCardHidden] = useState(true);
  const [isPlayerSecondCardHidden, setIsPlayerSecondCardHidden] =
    useState(true);
  const [isDealerFirstCardHidden, setIsDealerFirstCardHidden] = useState(true);
  const [isDealerSecondCardHidden, setIsDealerSecondCardHidden] =
    useState(true);

  const [correctAction, setCorrectAction] = useState("");

  useEffect(() => {
    if (isInitialMount.current) {
      console.log("Initial mount");
      isInitialMount.current = false;
    }
    else {

      // Generate random cards for the player and dealer
      const playerFirstCardData = getRandomCard();
      const playerSecondCardData = getRandomCard();
      const dealerFirstCardData = getRandomCard();
  
      // Set the player and dealer cards
      setPlayerFirstCardImagePath(playerFirstCardData.imagePath);
      setPlayerSecondCardImagePath(playerSecondCardData.imagePath);
      setDealerFirstCardImagePath(dealerFirstCardData.imagePath);
  
      console.log("=====================");
      console.log("player first card value", playerFirstCardData.cardValue);
      console.log("player second card value", playerSecondCardData.cardValue);
      console.log("dealer first card value", dealerFirstCardData.cardValue);
  
      // Get the correct action for the player
      const correctAction: string = getCorrectAction(
        dealerFirstCardData.cardValue,
        [playerFirstCardData.cardValue, playerSecondCardData.cardValue],
      );
      setCorrectAction(correctAction);
  
      // If the handleDeal is run, set all cards to be face down
      setIsPlayerFirstCardFlipped(false);
      setIsPlayerSecondCardFlipped(false);
      setIsDealerFirstCardFlipped(false);
      setIsDealerSecondCardFlipped(false);
  
      // If the handleDeal is run, set all cards to be hidden for 0.2 seconds
      setTimeout(() => {
        setIsPlayerFirstCardHidden(false);
      }, 200);
  
      setTimeout(() => {
        setIsPlayerSecondCardHidden(false);
      }, 1200);
  
      setTimeout(() => {
        setIsDealerFirstCardHidden(false);
      }, 2200);
  
      setTimeout(() => {
        setIsDealerSecondCardHidden(false);
      }, 3200);
    }
  }, [handleDealCount]);

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
    // Increment the handleDealCount
    setHandleDealCount(handleDealCount + 1);

    // Set all cards to be hidden
    setIsPlayerFirstCardHidden(true);
    setIsPlayerSecondCardHidden(true);
    setIsDealerFirstCardHidden(true);
    setIsDealerSecondCardHidden(true);

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

  const checkSelectedAction = async (selectedAction: string) => {
    // Increment the playerTotalRounds
    const newPlayerTotalRounds = playerTotalRounds + 1;
    setPlayerTotalRounds(newPlayerTotalRounds);
    if (selectedAction === correctAction) {

      // Increment the correctActionCount
      const newCorrectActionCount = correctActionCount + 1;
      setCorrectActionCount(newCorrectActionCount);

      // Calculate the accuracy with no decimal places
      const rawAccuracy = (newCorrectActionCount / newPlayerTotalRounds) * 100;
      const roundedAccuracy = Math.floor(rawAccuracy);
      setAccuracy(roundedAccuracy);

      toast.success("Correct!", {
        duration: 2000,
      });
    } else {
      // Calculate the accuracy with no decimal places
      const rawAccuracy = (correctActionCount / newPlayerTotalRounds) * 100;
      const roundedAccuracy = Math.floor(rawAccuracy);
      setAccuracy(roundedAccuracy);

      toast.error(`The correct action was: ${correctAction}`, {
        duration: 2000,
      });
    }

    setTimeout(() => {
      handleDeal()
        .then(() => {
          console.log("New round started");
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
  };

  return (
    <main className="flex min-h-screen flex-col bg-green-900 text-white">
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center">
          <h1 className="mt-3 text-5xl">Basic Strategy</h1>
        </div>

        <div
          style={{ height: 500, width: 1000 }}
          className="mt-2 flex h-fit flex-col border border-solid border-white"
        >
          {/* Dealer Cards */}
          <div style={{ height: 150 }} className="flex flex-row justify-center">
            <div
              className={`${
                isDealingDealerFirstCard ? "move-dealer-first-card" : "blank"
              } ${isDealerFirstCardHidden ? "opacity-0" : "opacity-100"}`}
            >
              <Card front={front} isFlipped={isDealerFirstCardFlipped} />
            </div>
            <div
              className={`${
                isDealingDealerSecondCard ? "move-dealer-second-card" : "blank"
              } ${isDealerSecondCardHidden ? "opacity-0" : "opacity-100"}`}
            >
              <Card
                front={dealerFirstCardImagePath}
                isFlipped={isDealerSecondCardFlipped}
              />
            </div>
          </div>

          {/* Shoe Cards */}
          <div
            style={{ height: 150 }}
            className="flex flex-row justify-end pr-10"
          >
            {/* Base Card */}
            <Card front={front} isFlipped={false} />
          </div>

          {/* Player Cards */}
          <div style={{ height: 150 }} className="flex flex-row justify-center">
            <div
              className={`${
                isDealingPlayerFirstCard ? "move-player-first-card" : "blank"
              } ${isPlayerFirstCardHidden ? "opacity-0" : "opacity-100"}`}
            >
              <Card
                front={playerFirstCardImagePath}
                isFlipped={isPlayerFirstCardFlipped}
              />
            </div>
            <div
              className={`${
                isDealingPlayerSecondCard ? "move-player-second-card" : "blank"
              } ${isPlayerSecondCardHidden ? "opacity-0" : "opcaity-100"}`}
            >
              <Card
                front={playerSecondCardImagePath}
                isFlipped={isPlayerSecondCardFlipped}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-row justify-center">
        <div style={{ width: 300 }} className="border border-solid border-white flex flex-col mr-10 items-center">
          <h3 className="text-2xl">Accuracy: {accuracy}</h3>
          <h3 className="text-2xl">{correctActionCount} of {playerTotalRounds} hands</h3>
        </div>
        <div style={{ width: 500 }} className="grid grid-cols-2 gap-4 border border-solid border-white p-3">
          <Button variant="primary" onClick={() => checkSelectedAction("hit")}>
            HIT
          </Button>
          <Button
            variant="primary"
            onClick={() => checkSelectedAction("stand")}
          >
            STAND
          </Button>
          <Button
            variant="primary"
            onClick={() => checkSelectedAction("double")}
          >
            DOUBLE
          </Button>
          <Button
            variant="primary"
            onClick={() => checkSelectedAction("split")}
          >
            SPLIT
          </Button>
          <Button
            variant="primary"
            onClick={() => checkSelectedAction("surrender")}
          >
            SURRENDER
          </Button>
          <Button
            variant="primary"
            onClick={() => checkSelectedAction("insurance")}
          >
            INSURANCE
          </Button>
          <Button variant="primary" onClick={handleDeal}>
            DEAL
          </Button>
        </div>
      </div>
    </main>
  );
}
