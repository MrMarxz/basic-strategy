//  create a basic component
//  create a component with props: front and back

import Image from "next/image";
import { useState } from "react";
import Button from "react-bootstrap/Button";

type CardProps = {
  front: string;
  isFlipped: boolean;
};

export default function Card({ front, isFlipped }: CardProps) {

  return (
    <div className="mt-3">
      <div className={`card ${isFlipped ? "flipped" : ""}`}>
        <div className="card-front">
          <Image src="/card_back.svg" alt="Ace of Clubs" width={100} height={140} />
        </div>
        <div className="card-back">
          <Image src={front} alt="Ace of Clubs" width={100} height={150} />
        </div>
      </div>
    </div>
  );
}
