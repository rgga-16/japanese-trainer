import { parseFurigana } from "../engine/furigana";
import type { FuriganaMode } from "../state/types";

interface FuriganaProps {
  /** Text in furigana notation, e.g. "窓[まど]を開[あ]けてください。" */
  text: string;
  /**
   * How readings are displayed: "always" shown, "hover" revealed on
   * hover/tap (ruby stays in DOM, CSS toggles visibility), "hidden" never
   * shown. Defaults to "always".
   */
  mode?: FuriganaMode;
  className?: string;
}

/** Renders furigana-notation text as <ruby> annotated Japanese. */
export default function Furigana({
  text,
  mode = "always",
  className,
}: FuriganaProps) {
  const segments = parseFurigana(text);
  const modeClass =
    mode === "hidden"
      ? "furigana-hidden"
      : mode === "hover"
        ? "furigana-hover"
        : "";
  const cls = ["jp", modeClass, className ?? ""].filter(Boolean).join(" ");
  return (
    <span className={cls} lang="ja">
      {segments.map((seg, i) =>
        seg.reading ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: static segment list
          <ruby key={i}>
            {seg.base}
            <rt>{seg.reading}</rt>
          </ruby>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: static segment list
          <span key={i}>{seg.base}</span>
        ),
      )}
    </span>
  );
}
