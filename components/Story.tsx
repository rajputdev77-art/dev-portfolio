import { story } from "@/content/site";
import { renderInline } from "./utils";

export default function Story() {
  return (
    <section id="story" className="oc-story">
      <div className="oc-act-marker">
        <span>{story.act}</span>
        <span className="oc-eyebrow-rule" />
        <span>{story.actSub}</span>
      </div>

      <aside className="oc-story-l">
        <div className="oc-story-photo">
          {story.photo.src ? (
            <img src={story.photo.src} alt={story.photo.alt} />
          ) : (
            <span>{story.photo.caption}</span>
          )}
        </div>
        <blockquote className="oc-story-pull">
          <p>&ldquo;{renderInline(story.quote.text)}&rdquo;</p>
        </blockquote>
        <div className="oc-story-attr">
          — {story.quote.attribution} · {story.quote.work}
        </div>
      </aside>

      <div className="oc-story-r">
        {story.paragraphs.map((p, i) => (
          <p key={i} className="oc-story-p">
            {renderInline(p)}
          </p>
        ))}
      </div>
    </section>
  );
}
