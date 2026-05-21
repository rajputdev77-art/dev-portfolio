import { now, extras, githubUser } from "@/content/site";
import { getNowData } from "@/lib/markdown";
import DeckStrip from "./DeckStrip";

export default function Now() {
  const data = getNowData();
  const colData: Record<string, any[]> = {
    building: data.building,
    learning: data.learning,
    thinking: data.thinking,
  };

  return (
    <section className="b" id="now">
      <div className="secline">
        <div className="lhs">
          <span className="n">{now.act}</span>
          <span className="ttl">{now.actSub}</span>
        </div>
        <span className="rhs">{now.rhs}</span>
      </div>

      <div className="secbody" data-n={now.act}>
        <div className="now-grid">
          {now.cols.map((col) => (
            <div key={col.id} className={`now-col ${col.colorClass}`}>
              <h3>
                <sup>{col.sup}</sup>
                {col.title}
              </h3>
              <ul>
                {(colData[col.id] || []).map((item, i) => (
                  <li key={i}>
                    <b>{item.title}</b>
                    <i>{item.note}</i>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="now-foot">
          <span>
            {now.footLeft} <b>{data.updated}</b>
          </span>
          <span>{now.footMid}</span>
          <span>{now.footRight}</span>
        </div>

        <DeckStrip extras={extras} githubUser={githubUser} />
      </div>
    </section>
  );
}
