/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
type Action = "hit" | "stand" | "double" | "split" | "surrender" | "insurance" | "even_money";

import hardTotalsTable from "./hard_totals.json";
import softTotalsTable from "./soft_totals.json";
import splitTable from "./split.json";
import cardValues from "~/utils/card_values.json";

const parsedSoftTable = JSON.parse(JSON.stringify(softTotalsTable));
const parsedHardTable = JSON.parse(JSON.stringify(hardTotalsTable));
const parsedSplitTable = JSON.parse(JSON.stringify(splitTable));
const ParsedCardValues = JSON.parse(JSON.stringify(cardValues));

const possibleCards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"];

export function getCorrectAction(dealerUpcard: string, playerCards: [string, string]) {
    // Use soft totals table
    if (playerCards.includes('A')) {
        const otherCard: string = playerCards.find(card => card !== 'A')!;
        if (otherCard !== 'A') {
            const action = parsedSoftTable[otherCard][dealerUpcard];
            return action as Action;
        }
    }
    // Use hard totals table
    else {
        const shouldSplit = parsedSplitTable[playerCards[0]][dealerUpcard];
        if (shouldSplit) {
            return 'split';
        }

        const playerTotal = parseInt(playerCards[0]) + parseInt(playerCards[1]);
        if (playerTotal <= 8) {
            return 'hit';
        }

        const action = parsedHardTable[playerTotal][dealerUpcard];
        return action as Action;
    }
}

export function getRandomCard(): { cardValue: string, imagePath: string } {
    // Chose a random card value from the possibleCards array
    const cardValue: string = possibleCards[Math.floor(Math.random() * possibleCards.length)] ?? "A"; // Set to Ace if undefined

    // Get the length of the array of card images for the selected card value
    const imagePathArrayLength = ParsedCardValues[cardValue].length;

    // Chose a random card image from the array of card images for the selected card value
    const tempCardImage: string = ParsedCardValues[cardValue][Math.floor(Math.random() * imagePathArrayLength)];

    const fullPath = `/svg_cards/${tempCardImage}`;

    const returnObject = {
        cardValue,
        imagePath: fullPath,
    };

    return returnObject;
}
