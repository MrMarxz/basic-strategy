//  create a basic component
//  create a component with props: front and back

import Image from "next/image";
import { useState } from "react";
import Button from "react-bootstrap/Button";

type CardProps = {
  front: string;
  back: string;
  clickable?: boolean;
};

export default function Card({ front, back, clickable }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isClickable = clickable ?? true;

  const handleFlip = () => {
    if (isClickable) setIsFlipped(!isFlipped);
  };
  return (
    <div className="mt-3" onClick={handleFlip}>
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
