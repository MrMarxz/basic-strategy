import Image from 'next/image';
import Button from 'react-bootstrap/Button';

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-green-900 text-white">
      <div className="flex flex-row justify-center">
        <h1 className="mt-3 text-5xl">Basic Strategy</h1>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex-grow border border-white border-solid">
          Card div
          <div className='diagonal-move'>
            <Image src="/svg_cards/2_of_clubs.svg" alt="Ace of Clubs" width={100} height={150} />
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <div className="border border-white border-solid grid grid-cols-2 gap-4 w-1/3 p-3">
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
