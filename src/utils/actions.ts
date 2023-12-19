/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
type Action = "hit" | "stand" | "double" | "split" | "surrender" | "insurance" | "even_money" | "blackjack";

import hardTotalsTable from "./hard_totals.json";
import softTotalsTable from "./soft_totals.json";
import splitTable from "./split.json";
import cardValues from "~/utils/card_values.json";

const parsedSoftTable = JSON.parse(JSON.stringify(softTotalsTable));
const parsedHardTable = JSON.parse(JSON.stringify(hardTotalsTable));
const parsedSplitTable = JSON.parse(JSON.stringify(splitTable));
const ParsedCardValues = JSON.parse(JSON.stringify(cardValues));

const possibleCards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"];

export function getCorrectAction(dealerUpcard: string, playerCards: [string, string]): string {
    // Use soft totals table
    if (playerCards.includes('A')) {
        // Check if both cards are Aces
        if (playerCards[0] === 'A' && playerCards[1] === 'A') {
            return 'split';
        }

        const otherCard: string = playerCards.find(card => card !== 'A')!;
        if (otherCard === "10") {
            // If the other card has a value of 10, player got a blackjack
            return 'blackjack';
        }
        else {
            const action = parsedSoftTable[otherCard][dealerUpcard];
            return action as Action;
        }
    }
    // Use hard totals table
    else {
        const playerTotal = parseInt(playerCards[0]) + parseInt(playerCards[1]);
        
        // Check if both cards are the same and if the player should split
        if (playerCards[0] === playerCards[1]) {
            const shouldSplit = parsedSplitTable[playerCards[0]][dealerUpcard];
            if (shouldSplit) return 'split';
        }

        // 8 and below is always a hit
        if (playerTotal <= 8) {
            return 'hit';
        }

        // Get the correct action from the hard totals table
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
