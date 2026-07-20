import type { FuriganaMode } from "../state/types";
import Furigana from "./Furigana";

interface LessonProseProps {
  /** Markdown-lite lesson text: blank-line paragraphs, **bold**, "- " bullets. */
  text: string;
  /** Forwarded to every Furigana chunk; defaults to "always". */
  mode?: FuriganaMode;
}

const BOLD_SPLIT = /(\*\*[^*]+\*\*)/;

function renderInline(text: string, mode: FuriganaMode, keyPrefix: string) {
  return text
    .split(BOLD_SPLIT)
    .filter((chunk) => chunk !== "")
    .map((chunk, i) => {
      const key = `${keyPrefix}-${i}`;
      if (chunk.startsWith("**") && chunk.endsWith("**") && chunk.length >= 4) {
        return (
          <strong key={key}>
            <Furigana text={chunk.slice(2, -2)} mode={mode} />
          </strong>
        );
      }
      return <Furigana key={key} text={chunk} mode={mode} />;
    });
}

/** Renders the lesson markdown-lite format, running every text chunk through Furigana. */
export default function LessonProse({
  text,
  mode = "always",
}: LessonProseProps) {
  const blocks = text
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter((b) => b.length > 0);

  return (
    <div className="lesson-prose">
      {blocks.map((block, bi) => {
        const lines = block
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0);
        const isList =
          lines.length > 0 && lines.every((l) => l.startsWith("- "));

        if (isList) {
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: static paragraph-block list
            <ul key={bi} className="lesson-prose-list">
              {lines.map((line, li) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static line list
                <li key={li}>
                  {renderInline(line.slice(2), mode, `${bi}-${li}`)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static paragraph-block list
          <p key={bi}>{renderInline(lines.join(" "), mode, `${bi}`)}</p>
        );
      })}
    </div>
  );
}
