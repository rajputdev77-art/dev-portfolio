import { ticker } from "@/content/site";

export default function Topbar() {
  // Render the marquee twice for seamless scroll.
  const items = [...ticker.items, ...ticker.items];
  return (
    <div className="ticker">
      <div className="marquee">
        {items.map((it, i) => {
          const isRed = ticker.redIndices.includes(i % ticker.items.length);
          return (
            <span key={i} className={`x${isRed ? " r" : ""}`}>
              {it}
            </span>
          );
        })}
      </div>
    </div>
  );
}
