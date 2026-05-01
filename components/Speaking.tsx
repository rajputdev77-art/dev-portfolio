import { speaking } from "@/content/site";
import { renderInline } from "./utils";

export default function Speaking() {
  return (
    <section className="oc-speaking">
      <div className="oc-speaking-l">
        <div className="oc-act-marker">
          <span>{speaking.act}</span>
        </div>
        <h2 className="oc-h2">
          {speaking.headline.map((line, i) => (
            <span key={i}>
              {line}
              {i < speaking.headline.length - 1 && <br />}
            </span>
          ))}
        </h2>
      </div>
      <div className="oc-speaking-r">
        {speaking.paragraphs.map((p, i) => (
          <p key={i}>{renderInline(p)}</p>
        ))}
        <p className="oc-speaking-sig">{speaking.signature}</p>
      </div>
    </section>
  );
}
