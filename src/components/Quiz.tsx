import { useEffect, useMemo, useState } from "preact/hooks";

export interface Question {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface Props {
  questions: Question[];
  storageKey: string;
}

type Answers = Record<number, number>;

function load(key: string): Answers {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "{}");
  } catch {
    return {};
  }
}

export default function Quiz({ questions, storageKey }: Props) {
  const key = `aie:quiz:${storageKey}`;
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => setAnswers(load(key)), [key]);

  const answered = Object.keys(answers).length;
  const correct = useMemo(
    () =>
      Object.entries(answers).filter(
        ([qi, choice]) => questions[Number(qi)]?.answer === choice,
      ).length,
    [answers, questions],
  );

  const choose = (qi: number, choice: number) => {
    if (answers[qi] !== undefined) return; // locked once answered
    const next = { ...answers, [qi]: choice };
    setAnswers(next);
    localStorage.setItem(key, JSON.stringify(next));
  };

  const reset = () => {
    setAnswers({});
    localStorage.removeItem(key);
  };

  return (
    <div class="quiz">
      <div class="quiz-score">
        {answered === 0 ? (
          <span>
            {questions.length} questions — answers lock in once you pick, so
            think first.
          </span>
        ) : (
          <span>
            <strong>
              {correct}/{answered}
            </strong>{" "}
            correct{answered < questions.length ? ` · ${questions.length - answered} to go` : " · done!"}
          </span>
        )}
        {answered > 0 && (
          <button class="fc-reset" onClick={reset}>
            retake quiz
          </button>
        )}
      </div>

      {questions.map((question, qi) => {
        const chosen = answers[qi];
        const isAnswered = chosen !== undefined;
        return (
          <div class="quiz-q" key={qi}>
            <p class="quiz-stem">
              <span class="quiz-num">{qi + 1}</span>
              {question.q}
            </p>
            <div class="quiz-options" role="group">
              {question.options.map((opt, oi) => {
                let cls = "quiz-opt";
                if (isAnswered) {
                  if (oi === question.answer) cls += " right";
                  else if (oi === chosen) cls += " wrong";
                  else cls += " muted";
                }
                return (
                  <button
                    class={cls}
                    key={oi}
                    disabled={isAnswered}
                    onClick={() => choose(qi, oi)}
                  >
                    <span class="quiz-letter">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <p
                class={`quiz-explain ${chosen === question.answer ? "good" : "bad"}`}
              >
                <strong>
                  {chosen === question.answer ? "Correct. " : "Not quite. "}
                </strong>
                {question.explanation}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
