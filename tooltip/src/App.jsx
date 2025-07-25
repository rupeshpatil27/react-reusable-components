import { useRef, useState } from "react";
import Tooltip from "./component/Tooltip";

function App() {
  const containerRef = useRef();
  const [tooltipText, setTooltipText] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);

  const handleMouseEnter = (e) => {
    const containerRect = e.target.offsetParent.getBoundingClientRect();
    const targetRect = e.currentTarget.getBoundingClientRect();

    const space = {
      top: targetRect.top - containerRect.top,
      bottom: containerRect.bottom - targetRect.bottom,
      left: targetRect.left - containerRect.left,
      right: containerRect.right - targetRect.right,
    };

    let top = 0;
    let left = 0;
    let transform = ""; // to adjust positioning based on direction
    let direction = ""; // to adjust positioning based on direction

    const spaceNeeded = 50; // minimum space needed for tooltip

    const offset = 8; // space between tooltip and target element

    if (space.bottom > spaceNeeded) {
      // Show below
      top = targetRect.bottom - containerRect.top + offset;
      left = targetRect.left + targetRect.width / 2 - containerRect.left;
      transform = "translate(-50%, 0)";
      direction = "bottom";
    } else if (space.top > spaceNeeded) {
      // Show above
      top = targetRect.top - containerRect.top - offset;
      left = targetRect.left + targetRect.width / 2 - containerRect.left;
      transform = "translate(-50%, -100%)";
      direction = "top";
    } else if (space.right > spaceNeeded) {
      // Show to the right
      top = targetRect.top + targetRect.height / 2 - containerRect.top;
      left = targetRect.right - containerRect.left + offset;
      transform = "translate(0, -50%)";
      direction = "right";
    } else if (space.left > spaceNeeded) {
      // Show to the left
      top = targetRect.top + targetRect.height / 2 - containerRect.top;
      left = targetRect.left - containerRect.left - offset;
      transform = "translate(-100%, -50%)";
      direction = "left";
    } else {
      // Default to top-center fallback
      top = targetRect.top - containerRect.top - offset;
      left = targetRect.left + targetRect.width / 2 - containerRect.left;
      transform = "translate(-50%, -100%)";
      direction = "top";
    }
    setTooltipPos({ top, left, transform, direction });
  };

  const handleMouseLeave = () => {
    setTooltipText(null);
    setTooltipPos(null);
  };

  return (
    <div ref={containerRef} className="w-full h-screen bg-neutral-100 relative">
      <div
        onMouseEnter={(e)=>{
          handleMouseEnter(e),setTooltipText("Top")
        }}
        onMouseLeave={handleMouseLeave}
        className="bg-amber-200 rounded-full text-black font-bold text-2xl px-3 py-1.5 cursor-pointer absolute top-0 left-0 tooltip-container"
      >
        <span>Top tooltip</span>
      </div>
  

      <div
         onMouseEnter={(e)=>{
          handleMouseEnter(e),setTooltipText("bottom")
        }}
        onMouseLeave={handleMouseLeave}
        className="bg-amber-200 rounded-full text-black font-bold text-2xl px-3 py-1.5 cursor-pointer absolute bottom-0 right-0 tooltip-container"
      >
        <span>bootom tooltip</span>
      </div>

      <div
         onMouseEnter={(e)=>{
          handleMouseEnter(e),setTooltipText("center")
        }}
        onMouseLeave={handleMouseLeave}
        className="bg-amber-200 rounded-full text-black font-bold text-2xl px-3 py-1.5 cursor-pointer absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 tooltip-container"
      >
        <span>center tooltip</span>
      </div>

      {/* Tooltip */}
      {tooltipText && tooltipPos && <Tooltip text={tooltipText} style={tooltipPos} />}
    </div>
  );
}

export default App;
