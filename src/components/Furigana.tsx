import { parseFurigana } from "../engine/furigana";

interface FuriganaProps {
  /** Text in furigana notation, e.g. "窓[まど]を開[あ]けてください。" */
  text: string;
  /** When false, ruby readings are hidden (layout stays stable via CSS visibility). */
  show?: boolean;
  className?: string;
}

/** Renders furigana-notation text as <ruby> annotated Japanese. */
export default function Furigana({ text, show = true, className }: FuriganaProps) {
  const segments = parseFurigana(text);
  const cls = ["jp", show ? "" : "furigana-hidden", className ?? ""]
    .filter(Boolean)
    .join(" ");
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
