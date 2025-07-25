import "./Tooltip.css";

const Tooltip = ({ text, style }) => {

    if (!style) return null;

    const { top, left, transform, direction } = style;

    return (
        <div className={`tooltip tooltip-${direction}`} style={{
            top,
            left,
            transform,
        }}>
            <span>{text}</span>
        </div>
    );
};

export default Tooltip;

