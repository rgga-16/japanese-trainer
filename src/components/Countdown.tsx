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
  // Mirrors `remaining` so the running-effect can read the latest value
  // without needing it in its dependency array (which would restart the
  // interval — and reset the deadline — on every tick).
  const remainingRef = useRef(seconds);
  // Wall-clock timestamp the countdown reaches zero. Recomputed from the
  // held `remaining` value whenever ticking (re)starts, so backgrounding
  // (which throttles/suspends the interval) can't make the timer drift, and
  // pausing/resuming freezes and resumes from the correct point.
  const deadlineRef = useRef(Date.now() + seconds * 1000);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    remainingRef.current = seconds;
    setRemaining(seconds);
    expiredRef.current = false;
    deadlineRef.current = Date.now() + seconds * 1000;
  }, [seconds]);

  useEffect(() => {
    if (!running) return undefined;
    deadlineRef.current = Date.now() + remainingRef.current * 1000;
    const id = window.setInterval(() => {
      const rawRemaining = (deadlineRef.current - Date.now()) / 1000;
      const next = Math.max(0, rawRemaining);
      remainingRef.current = next;
      setRemaining(next);
      if (rawRemaining <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current();
      }
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
