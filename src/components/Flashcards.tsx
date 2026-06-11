import { useEffect, useMemo, useState } from "preact/hooks";

export interface Card {
  front: string;
  back: string;
}

interface Props {
  cards: Card[];
  storageKey: string;
}

type Mastery = Record<number, "got" | "again">;

function load(key: string): Mastery {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "{}");
  } catch {
    return {};
  }
}

export default function Flashcards({ cards, storageKey }: Props) {
  const key = `aie:fc:${storageKey}`;
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastery, setMastery] = useState<Mastery>({});

  useEffect(() => setMastery(load(key)), [key]);

  const gotCount = useMemo(
    () => Object.values(mastery).filter((v) => v === "got").length,
    [mastery],
  );

  const mark = (status: "got" | "again") => {
    const next = { ...mastery, [i]: status };
    setMastery(next);
    localStorage.setItem(key, JSON.stringify(next));
    go(1);
  };

  const go = (delta: number) => {
    setFlipped(false);
    setI((cur) => (cur + delta + cards.length) % cards.length);
  };

  const reset = () => {
    setMastery({});
    localStorage.removeItem(key);
    setI(0);
    setFlipped(false);
  };

  const card = cards[i];
  const status = mastery[i];

  return (
    <div class="fc">
      <div class="fc-meta">
        <span class="fc-count">
          Card {i + 1} of {cards.length}
        </span>
        <span class="fc-mastered">
          {gotCount}/{cards.length} mastered
        </span>
      </div>
      <div class="fc-track" role="progressbar" aria-valuenow={gotCount} aria-valuemax={cards.length}>
        <div
          class="fc-fill"
          style={{ width: `${(gotCount / cards.length) * 100}%` }}
        />
      </div>

      <button
        class={`fc-card ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? "Show question" : "Show answer"}
      >
        <span class="fc-side-label">{flipped ? "Answer" : "Question — tap to flip"}</span>
        <span class="fc-text">{flipped ? card.back : card.front}</span>
        {status && (
          <span class={`fc-status ${status}`}>
            {status === "got" ? "✓ got it" : "↻ review again"}
          </span>
        )}
      </button>

      <div class="fc-controls">
        <button class="btn" onClick={() => go(-1)} aria-label="Previous card">
          ←
        </button>
        <button class="btn" onClick={() => mark("again")}>
          Review again
        </button>
        <button class="btn primary" onClick={() => mark("got")}>
          Got it
        </button>
        <button class="btn" onClick={() => go(1)} aria-label="Next card">
          →
        </button>
      </div>
      <button class="fc-reset" onClick={reset}>
        reset deck
      </button>
    </div>
  );
}
