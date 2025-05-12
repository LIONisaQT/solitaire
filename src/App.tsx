import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./logic/card";
import TableauPile from "./tableau/TableauPile";
import Stock from "./stock/Stock";
import { Solitaire } from "./logic/solitaire";
import Foundations from "./foundations/Foundations";
import FloatingActionButton from "./fab/FloatingActionButton";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import cardFlip from "./assets/sounds/card1.ogg";
import cardFan from "./assets/sounds/cardFan2.ogg";
import cancel from "./assets/sounds/cancel.ogg";
import useSound from "use-sound";

function App() {
	const [game, setGame] = useState<Solitaire>();
	const [, setTableau] = useState<Card[][]>([]);
	const [, setStock] = useState<Card[]>([]);
	const [, setFoundations] = useState<Card[][]>([]);

	const handle = useFullScreenHandle();

	const [playCardFlip] = useSound(cardFlip, { volume: 0.25 });
	const [playCardFan] = useSound(cardFan);
	const [playCancel] = useSound(cancel, { volume: 0.25 });

	useEffect(() => {
		setGame(new Solitaire());
		playCardFan();
	}, [playCardFan]);

	const cardClicked = (card: Card, origin: Card[]) => {
		if (!game) return;

		switch (game.cardClicked(card, origin)) {
			case "tableau":
			case "flip":
				setTableau([...game.tableau]);
				playCardFlip();
				break;
			case "foundation":
				setFoundations([...game.foundations]);
				playCardFlip();
				break;
			default:
				playCancel();
				break;
		}
	};

	const stockClicked = () => {
		if (!game) return;

		game.stockClicked();
		playCardFlip();
		setStock([...game.stock]);
	};

	const restartClicked = () => {
		if (!game) return;

		game.restartGame();
		reset();
	};

	const reset = () => {
		if (!game) return;

		setTableau(game.tableau); // Only need this to trigger a re-render
		playCardFan();
	};

	return (
		<FullScreen handle={handle}>
			<div className="play-area">
				<div className="top-area">
					<div className="foundations">
						<Foundations
							foundations={game?.foundations}
							foundationCardClicked={cardClicked}
						/>
					</div>
					<div className="stock">
						<Stock
							game={game}
							stockClicked={stockClicked}
							wasteClicked={cardClicked}
						/>
					</div>
				</div>
				<div className="tableau">
					{game?.tableau.map((pile, index) => (
						<TableauPile
							key={`tableau-${index}`}
							cards={pile}
							onClick={cardClicked}
						/>
					))}
				</div>
				<FloatingActionButton
					fullScreenClicked={handle.active ? handle.exit : handle.enter}
					restartClicked={restartClicked}
				/>
			</div>
		</FullScreen>
	);
}

export default App;
