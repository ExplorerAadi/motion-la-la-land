import { BaseCardsStacked } from "../../components/CardStack";

export default function StackedCardsPage() {
  return <BaseCardsStacked />;
}

// Steps:
// 1. Create the icons with with same wobble effect
// 2. Create cards to drag and drop easily across the window without a fixed snap point
// 3. Load cards with delayed animation and stacked on top of each other
// 4. Create open/close animation for the card
// note: the cards look like a dialog but clicking on another card in bg closes the current one as well as opens the clicked one.)
