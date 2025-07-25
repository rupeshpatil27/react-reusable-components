// import "./Tooltip.css"

// const Tooltip = ({ text }) => {
//     return (
//         <div className="tooltip">
//             <span>{text}</span>
//         </div>
//     );
// };

// export default Tooltip;


import React, { useEffect, useRef, useState } from "react";
import "./Tooltip.css";

const Tooltip = ({ text, children }) => {
    const tooltipRef = useRef(null);
    const [position, setPosition] = useState("top");

    useEffect(() => {
        const tooltipEl = tooltipRef.current;

        if (!tooltipEl) return;

        const tooltipRect = tooltipEl.getBoundingClientRect();
        const containerRect = tooltipEl.parentNode.getBoundingClientRect();

        const space = {
            top: containerRect.top,
            bottom: window.innerHeight - containerRect.bottom,
            left: containerRect.left,
            right: window.innerWidth - containerRect.right,
        };

        let bestPosition = "top";
        const spaceNeeded = tooltipRect.height + 12;

        if (space.top > spaceNeeded) {
            bestPosition = "top";
        } else if (space.bottom > spaceNeeded) {
            bestPosition = "bottom";
        } else if (space.left > tooltipRect.width + 12) {
            bestPosition = "left";
        } else if (space.right > tooltipRect.width + 12) {
            bestPosition = "right";
        }

        setPosition(bestPosition);
    }, []);

    return (
        <div ref={tooltipRef} className={`tooltip tooltip-${position}`}>
            <span>{text}</span>
        </div>
    );
};

export default Tooltip;

