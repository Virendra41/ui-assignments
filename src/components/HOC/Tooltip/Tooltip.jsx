import "./Tooltip.scss";

export default function Tooltip({ text, children }) {
  return (
    <div className="tooltipWrap">
      {children}
      {text && <span className="tooltiptext">{text}</span>}
    </div>
  );
}
