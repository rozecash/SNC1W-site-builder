"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type ProcessId = "engineering" | "scientific";
type IconName =
  | "gear"
  | "flask"
  | "target"
  | "search"
  | "bulb"
  | "checkplan"
  | "wrench"
  | "test"
  | "refresh"
  | "report"
  | "observe"
  | "question"
  | "hypothesis"
  | "experiment"
  | "decision"
  | "conclusion"
  | "compare"
  | "shield"
  | "clipboard";

type ProcessStep = {
  title: string;
  detail: string;
  icon: IconName;
};

type ProcessExample = {
  title: string;
  intro: string;
  points: string[];
  icon: IconName;
};

type ProcessContent = {
  label: string;
  intro: string;
  note: string;
  icon: IconName;
  badge: string;
  steps: ProcessStep[];
  example: ProcessExample;
};

const processData: Record<ProcessId, ProcessContent> = {
  engineering: {
    label: "Engineering Design Process",
    intro: "Builds a solution to a real-world problem and improves it through testing.",
    note: "Engineering often loops between testing and improvement until the design meets the standard.",
    icon: "gear",
    badge: "Build + Improve",
    steps: [
      {
        title: "Define the Problem",
        detail:
          "State the exact problem and list the requirements the final solution must meet.",
        icon: "target",
      },
      {
        title: "Background Research",
        detail:
          "Collect known information, limits, and past attempts before making a design.",
        icon: "search",
      },
      {
        title: "Brainstorm Solutions",
        detail: "Generate several ideas so you have clear options to compare.",
        icon: "bulb",
      },
      {
        title: "Select the Best Plan",
        detail:
          "Choose the design plan that best meets the requirements and constraints.",
        icon: "checkplan",
      },
      {
        title: "Build a Prototype",
        detail: "Create a working model that can be tested in real conditions.",
        icon: "wrench",
      },
      {
        title: "Test the Prototype",
        detail:
          "Measure performance and check whether it meets the required standard.",
        icon: "test",
      },
      {
        title: "Improve if Needed",
        detail:
          "If results are weak, revise the design and test again until it works.",
        icon: "refresh",
      },
      {
        title: "Report Final Data",
        detail: "Document final performance, what changed, and the completed result.",
        icon: "report",
      },
    ],
    example: {
      title: "Example: Technician Fixing a Car",
      intro:
        "A technician follows the design process to solve a car problem in a practical, repeatable way.",
      icon: "wrench",
      points: [
        "A car arrives with a starting issue, so the problem is clearly defined.",
        "The technician researches likely causes like battery, starter, and wiring.",
        "Possible repair paths are brainstormed before making a decision.",
        "The best repair plan is selected based on results, time, and cost.",
        "A repair prototype or setup is created and installed.",
        "The car is tested to verify whether the issue is fixed.",
        "If it still fails, the fix is improved and tested again.",
        "Once it works, the final result is reported to the car owner.",
      ],
    },
  },
  scientific: {
    label: "Scientific Method",
    intro: "Tests an explanation with evidence, then accepts or rejects the hypothesis.",
    note: "The scientific method is evidence-first. The conclusion must match the test data.",
    icon: "flask",
    badge: "Observe + Test",
    steps: [
      {
        title: "Observe",
        detail: "Notice what is happening and identify the event or pattern at hand.",
        icon: "observe",
      },
      {
        title: "Ask a Question",
        detail: "Turn the observation into a focused question that can be tested.",
        icon: "question",
      },
      {
        title: "Research",
        detail: "Review existing information so the experiment starts from real context.",
        icon: "search",
      },
      {
        title: "Create a Hypothesis",
        detail:
          "Write a testable prediction about what you expect to happen and why.",
        icon: "hypothesis",
      },
      {
        title: "Run an Experiment",
        detail: "Test the hypothesis with controlled steps and measurable data.",
        icon: "experiment",
      },
      {
        title: "Test the Hypothesis",
        detail:
          "Use the data to decide whether the hypothesis is accepted or rejected.",
        icon: "decision",
      },
      {
        title: "Draw a Conclusion",
        detail: "Explain what the results mean and what was learned.",
        icon: "conclusion",
      },
      {
        title: "Report Results",
        detail: "Share the procedure and final findings so others can review it.",
        icon: "report",
      },
    ],
    example: {
      title: "Example: Paper Towel Absorbency",
      intro:
        "A student compares two paper towel brands to find out which one absorbs more water.",
      icon: "flask",
      points: [
        "They observe that some brands seem to clean spills faster than others.",
        "Question: Which brand absorbs more water per sheet?",
        "They research what affects absorbency and how to run a fair test.",
        "Hypothesis: Brand A will absorb more water than Brand B.",
        "They run repeated trials with equal sheet sizes and measured water amounts.",
        "Data is analyzed to accept or reject the hypothesis.",
        "The final conclusion explains which brand performed better.",
        "Results are reported with the test steps and measurements.",
      ],
    },
  },
};

const processOrder: ProcessId[] = ["engineering", "scientific"];

function Icon({ name }: { name: IconName }) {
  const sharedProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const iconMap: Record<IconName, ReactNode> = {
    gear: (
      <>
        <circle cx="12" cy="12" r="3.2" {...sharedProps} />
        <path d="M12 2.8v2.1M12 19.1v2.1M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2.8 12h2.1M19.1 12h2.1M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5" {...sharedProps} />
        <circle cx="12" cy="12" r="8.4" {...sharedProps} />
      </>
    ),
    flask: (
      <>
        <path d="M10 2.7h4M11.3 2.7v4.1l-4.8 8.4a3.6 3.6 0 0 0 3.1 5.5h5a3.6 3.6 0 0 0 3.1-5.5l-4.8-8.4V2.7" {...sharedProps} />
        <path d="M8 13.6h8" {...sharedProps} />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8.8" {...sharedProps} />
        <circle cx="12" cy="12" r="4.9" {...sharedProps} />
        <circle cx="12" cy="12" r="1.5" {...sharedProps} />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6.6" {...sharedProps} />
        <path d="M16 16l4.2 4.2" {...sharedProps} />
      </>
    ),
    bulb: (
      <>
        <path d="M8.8 15.2a5.8 5.8 0 1 1 6.5 0c-.9.6-1.5 1.6-1.5 2.7v.6h-3.6v-.6c0-1.1-.6-2.1-1.4-2.7Z" {...sharedProps} />
        <path d="M10 21.2h4" {...sharedProps} />
      </>
    ),
    checkplan: (
      <>
        <rect x="4.1" y="4.2" width="15.8" height="15.6" rx="2.2" {...sharedProps} />
        <path d="M7.8 9.2h8.1M7.8 12.6h8.1M7.8 16h4.4M14.1 16.2l1.5 1.5 2.5-2.9" {...sharedProps} />
      </>
    ),
    wrench: (
      <>
        <path d="M14.8 5.1a3.8 3.8 0 0 0 4.3 4.9L11 18.1a2.2 2.2 0 1 1-3.1-3.1l8.1-8.1a3.8 3.8 0 0 0-1.2-1.8Z" {...sharedProps} />
      </>
    ),
    test: (
      <>
        <path d="M4.2 14.8h4.1v4.1H4.2zM9.9 10.5H14v8.4H9.9zM15.6 6.2h4.1v12.7h-4.1z" {...sharedProps} />
      </>
    ),
    refresh: (
      <>
        <path d="M19.5 8.6A7.7 7.7 0 0 0 6.7 7.2" {...sharedProps} />
        <path d="M6.9 4.3v3.1H3.7" {...sharedProps} />
        <path d="M4.5 15.4a7.7 7.7 0 0 0 12.8 1.4" {...sharedProps} />
        <path d="M17.1 19.7v-3.1h3.2" {...sharedProps} />
      </>
    ),
    report: (
      <>
        <rect x="5.1" y="3.8" width="13.8" height="16.4" rx="2" {...sharedProps} />
        <path d="M8.5 8.6h7M8.5 12h7M8.5 15.4h4.6" {...sharedProps} />
      </>
    ),
    observe: (
      <>
        <path d="M2.8 12s3.6-5.4 9.2-5.4 9.2 5.4 9.2 5.4-3.6 5.4-9.2 5.4S2.8 12 2.8 12Z" {...sharedProps} />
        <circle cx="12" cy="12" r="2.4" {...sharedProps} />
      </>
    ),
    question: (
      <>
        <path d="M9.3 8.8a2.8 2.8 0 1 1 4.8 2c-.8.8-1.8 1.3-1.8 2.7" {...sharedProps} />
        <circle cx="12" cy="17.8" r="0.8" {...sharedProps} />
        <circle cx="12" cy="12" r="8.9" {...sharedProps} />
      </>
    ),
    hypothesis: (
      <>
        <path d="M7.4 3.9h9.2M12 3.9V20" {...sharedProps} />
        <path d="M7.4 20.1h9.2M8.4 8.4H15.6M9.2 12h5.6" {...sharedProps} />
      </>
    ),
    experiment: (
      <>
        <path d="M9.2 3.3h5.6M10.8 3.3v5.2l-4.4 7.7a3.5 3.5 0 0 0 3 5.3h5.2a3.5 3.5 0 0 0 3-5.3l-4.4-7.7V3.3" {...sharedProps} />
        <path d="M8.2 14h7.6" {...sharedProps} />
      </>
    ),
    decision: (
      <>
        <path d="M5.1 5.1h13.8v13.8H5.1z" {...sharedProps} />
        <path d="m8.6 12.2 2.2 2.1 4.6-4.8" {...sharedProps} />
      </>
    ),
    conclusion: (
      <>
        <path d="M5.2 18.9V5.1M9.6 18.9V9.2M14 18.9v-6.1M18.4 18.9V7" {...sharedProps} />
      </>
    ),
    compare: (
      <>
        <path d="M7.1 4.7h4.2v14.6H7.1zM12.9 4.7h4.2v14.6h-4.2z" {...sharedProps} />
      </>
    ),
    shield: (
      <>
        <path d="M12 3.1 18.8 6v5.4c0 4.4-3.1 7.8-6.8 9.5-3.7-1.7-6.8-5.1-6.8-9.5V6L12 3.1Z" {...sharedProps} />
        <path d="m9.2 11.9 1.9 2 3.7-3.9" {...sharedProps} />
      </>
    ),
    clipboard: (
      <>
        <path d="M9 4.1h6M9.8 2.9h4.4a1 1 0 0 1 1 1v1.2H8.8V3.9a1 1 0 0 1 1-1Z" {...sharedProps} />
        <rect x="5.3" y="5.1" width="13.4" height="15.8" rx="2.1" {...sharedProps} />
        <path d="M8.5 9.1h7M8.5 12.5h7M8.5 15.9h4.8" {...sharedProps} />
      </>
    ),
  };

  return (
    <svg
      className="icon-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {iconMap[name]}
    </svg>
  );
}

export default function Home() {
  const [activeProcess, setActiveProcess] = useState<ProcessId>("engineering");
  const [activeStep, setActiveStep] = useState(0);

  const currentProcess = processData[activeProcess];
  const step = currentProcess.steps[activeStep];
  const progress = Math.round(
    ((activeStep + 1) / currentProcess.steps.length) * 100,
  );

  const handleProcessSelect = (nextProcess: ProcessId) => {
    setActiveProcess(nextProcess);
    setActiveStep(0);
  };

  const moveStep = (direction: -1 | 1) => {
    setActiveStep((previousStep) => {
      const maxStep = currentProcess.steps.length - 1;
      const nextStep = previousStep + direction;
      return Math.min(maxStep, Math.max(0, nextStep));
    });
  };

  return (
    <main className="infographic-shell">
      <section className="hero-grid">
        <div className="hero">
          <p className="eyebrow">Interactive Infographic</p>
          <h1>Scientific Method + Engineering Design Process</h1>
          <p>
            Two clear systems for solving problems. Pick a process, click any
            step, and move through the flow.
          </p>
          <div className="stat-strip">
            <article className="stat-chip">
              <span className="chip-icon">
                <Icon name="compare" />
              </span>
              <div>
                <strong>16 total steps</strong>
                <small>8 in each method</small>
              </div>
            </article>
            <article className="stat-chip">
              <span className="chip-icon">
                <Icon name="shield" />
              </span>
              <div>
                <strong>Evidence + Results</strong>
                <small>Data drives decisions</small>
              </div>
            </article>
          </div>
        </div>

        <aside className="hero-visual" aria-hidden="true">
          <div className="hero-orbit">
            <span className="orbit-dot dot-a" />
            <span className="orbit-dot dot-b" />
            <span className="orbit-dot dot-c" />
            <div className="visual-token token-top">
              <Icon name="gear" />
            </div>
            <div className="visual-token token-bottom">
              <Icon name="flask" />
            </div>
            <svg
              viewBox="0 0 280 220"
              className="hero-lines"
              role="presentation"
            >
              <path d="M24 120c22-54 78-86 141-81 54 4 88 32 92 73 4 46-30 79-91 83-57 4-105-14-132-47" />
              <path d="M63 97c11-28 39-43 70-40 27 2 45 15 47 34 2 21-15 36-46 39-30 2-55-8-71-27" />
            </svg>
          </div>
        </aside>
      </section>

      <section className="process-picker" aria-label="Process picker">
        {processOrder.map((processId) => {
          const process = processData[processId];
          const isActive = processId === activeProcess;

          return (
            <button
              key={processId}
              type="button"
              className={`process-button ${isActive ? "active" : ""}`}
              onClick={() => handleProcessSelect(processId)}
              aria-pressed={isActive}
            >
              <span className="process-head">
                <span className="process-icon">
                  <Icon name={process.icon} />
                </span>
                <span className="process-title">{process.label}</span>
                <span className="process-badge">{process.badge}</span>
              </span>
              <small>{process.intro}</small>
            </button>
          );
        })}
      </section>

      <section className="process-layout">
        <ol className="step-grid">
          {currentProcess.steps.map((item, index) => {
            const isActive = activeStep === index;

            return (
              <li key={item.title}>
                <button
                  type="button"
                  className={`step-card ${isActive ? "active" : ""}`}
                  onClick={() => setActiveStep(index)}
                  style={{ animationDelay: `${index * 80}ms` }}
                  aria-pressed={isActive}
                >
                  <span className="step-icon">
                    <Icon name={item.icon} />
                  </span>
                  <span className="step-content">
                    <span className="step-topline">
                      <span className="step-number">{index + 1}</span>
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <article className="detail-panel" key={`${activeProcess}-${activeStep}`}>
          <p className="detail-kicker">Current Step</p>
          <h2 className="detail-title">
            {activeStep + 1}. {step.title}
          </h2>
          <p className="detail-copy">{step.detail}</p>

          <div className="progress-label">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-track" role="presentation">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="detail-actions">
            <button
              type="button"
              className="mini-btn"
              onClick={() => moveStep(-1)}
              disabled={activeStep === 0}
            >
              Previous
            </button>
            <button
              type="button"
              className="mini-btn"
              onClick={() => moveStep(1)}
              disabled={activeStep === currentProcess.steps.length - 1}
            >
              Next
            </button>
          </div>

          <p className="note-block">{currentProcess.note}</p>
        </article>
      </section>

      <section className="examples" aria-label="Real examples">
        {processOrder.map((processId, index) => {
          const process = processData[processId];
          const isFocused = processId === activeProcess;

          return (
            <article
              key={processId}
              className={`example-card ${isFocused ? "focused" : ""}`}
              style={{ animationDelay: `${index * 130}ms` }}
            >
              <h3>
                <span className="example-icon">
                  <Icon name={process.example.icon} />
                </span>
                {process.example.title}
              </h3>
              <p className="example-subtitle">{process.example.intro}</p>
              <ol className="example-list">
                {process.example.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ol>
            </article>
          );
        })}
      </section>

      <section className="compare-row" aria-label="Quick comparison">
        <article className="compare-card">
          <span className="compare-icon">
            <Icon name="gear" />
          </span>
          <h4>Main Goal</h4>
          <p>
            Engineering aims to build a working solution. Science aims to test
            an explanation.
          </p>
        </article>
        <article className="compare-card">
          <span className="compare-icon">
            <Icon name="shield" />
          </span>
          <h4>How They Validate</h4>
          <p>
            Engineering validates with performance requirements. Science
            validates with experimental evidence.
          </p>
        </article>
        <article className="compare-card">
          <span className="compare-icon">
            <Icon name="clipboard" />
          </span>
          <h4>What Gets Reported</h4>
          <p>
            Engineering reports design outcomes. Science reports conclusions
            about the hypothesis.
          </p>
        </article>
      </section>
    </main>
  );
}
