# Blackjack Basic Strategy Practice Website

This project is a web application designed to help users practice and master the basic strategy of Blackjack. Built with React and Tailwind CSS, it offers an interactive and engaging way to learn and improve your Blackjack skills.


## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js `v18.17.0` or greater

## Installation

To set up the project locally, follow these steps:

1. Navigate to the project directory.

2. Install the dependencies:

```
npm i
```

## Usage
To run the site in development mode:
```
npm run dev
```

This will launch the site on: `http://localhost:3000`

### Production Build
To create and run a production build:
```
npm run build && npm run start
```

## Project Structure
The site contains 4 important directories which are listed below:
```
|-- src/
|   |-- app/
|   |   -- page.tsx
|   |   -- layout.tsx
|   |-- components/
|   |   -- Card.tsx
|   |-- styles/
|   |   -- global.css
|   |-- utils/
|       -- actions.ts
|       -- card_values.json
|       -- hard_totals.json
|       -- soft_totals.json
|       -- split.json
```

- `app` : Contains the main page and layout.
- `styles` : contains the styling for the whole site. This includes all the animations.
- `utils`: Contains a big part of the logic. It has an `actions.ts` file which has `getCorrectAction` and `getRandomCard`. Further in this directory are all of the totals and combinations of correct actions to take for each hand that is dealt.