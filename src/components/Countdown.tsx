import { useEffect, useRef, useState } from "react";

interface CountdownProps {
  /** Total duration in seconds; a change resets the displayed remaining time. */
  seconds: number;
  /** Called exactly once, when the countdown reaches zero. */
  onExpire: () => void;
  /** Ticks only while true. */
  running: boolean;
}

const LOW_TIME_THRESHOLD_SEC = 3 * 60;

function formatRemaining(totalSec: number): string {
  const clamped = Math.max(0, Math.ceil(totalSec));
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

/** mm:ss countdown display. Fires onExpire once when it hits zero. */
export default function Countdown({ seconds, onExpire, running }: CountdownProps) {
  const [remaining, setRemaining] = useState(seconds);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    setRemaining(seconds);
    expiredRef.current = false;
  }, [seconds]);

  useEffect(() => {
    if (!running) return undefined;
    const id = window.setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0 && !expiredRef.current) {
          expiredRef.current = true;
          onExpireRef.current();
        }
        return Math.max(0, next);
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const low = remaining <= LOW_TIME_THRESHOLD_SEC;

  return (
    <div
      className={low ? "mock-countdown mock-countdown-bad" : "mock-countdown"}
      role="timer"
      aria-live="off"
    >
      {formatRemaining(remaining)}
    </div>
  );
}
