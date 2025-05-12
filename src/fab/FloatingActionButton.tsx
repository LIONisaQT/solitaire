import type React from "react";
import "./FloatingActionButton.css";
import { useState } from "react";

interface FabProps {
	fullScreenClicked: () => void;
}

const FloatingActionButton: React.FC<FabProps> = ({ fullScreenClicked }) => {
	const [isOpen, setOpen] = useState(false);

	return (
		<div className="fab">
			<button className="fab-button" onClick={() => setOpen(!isOpen)}>
				{isOpen ? "❌" : "➕"}
			</button>
			<ul className={`fab-menu-items ${isOpen ? "visible" : "invisible"}`}>
				<li className="menu-item">
					<button className="menu-item-button" onClick={fullScreenClicked}>
						<span>⛶</span>
					</button>
				</li>
				<li className="menu-item">
					<button
						className="menu-item-button"
						onClick={() => location.reload()}
					>
						<span>🔄</span>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default FloatingActionButton;
