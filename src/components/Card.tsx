//  create a basic component
//  create a component with props: front and back

import Image from "next/image";
import { useState } from "react";
import Button from "react-bootstrap/Button";

type CardProps = {
  front: string;
  back: string;
};

export default function Card({ front, back }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div className="card-container mt-3" onClick={handleFlip}>
      <div className={`card ${isFlipped ? "flipped" : ""}`}>
        <div className="card-front">
          <Image src={back} alt="Ace of Clubs" width={100} height={150} />
        </div>
        <div className="card-back">
          <Image src={front} alt="Ace of Clubs" width={100} height={150} />
        </div>
      </div>
    </div>
  );
}