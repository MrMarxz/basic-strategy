/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
type Action = "hit" | "stand" | "double" | "split" | "surrender" | "insurance" | "even_money";

import hardTotalsTable from "./hard_totals.json";
import softTotalsTable from "./soft_totals.json";
import splitTable from "./split.json";

const parsedSoftTable = JSON.parse(JSON.stringify(softTotalsTable));
const parsedHardTable = JSON.parse(JSON.stringify(hardTotalsTable));
const parsedSplitTable = JSON.parse(JSON.stringify(splitTable));

export default function getCorrectAction(dealerUpcard: string, playerCards: [string, string]) {
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
