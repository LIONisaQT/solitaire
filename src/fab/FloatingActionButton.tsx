import type React from "react";
import "./FloatingActionButton.css";
import { useState } from "react";

const FloatingActionButton: React.FC = () => {
	const [isOpen, setOpen] = useState(false);

	return (
		<div className="fab">
			<button className="fab-button" onClick={() => setOpen(!isOpen)}>
				{isOpen ? "❌" : "➕"}
			</button>
			<ul className={`fab-menu-items ${isOpen ? "visible" : "invisible"}`}>
				<li className="menu-item">
					<button className="menu-item-button">
						<span className="button-text">⛶</span>
					</button>
				</li>
				<li className="menu-item">
					<button className="menu-item-button">
						<span className="button-text">🔄</span>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default FloatingActionButton;
