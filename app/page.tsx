"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

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
    intro: "Used to build a real solution, then improve it.",
    note: "If it does not work, improve it and test again.",
    icon: "gear",
    badge: "Fix + Improve",
    steps: [
      {
        title: "Define the Problem",
        detail: "Say what is wrong and what success looks like.",
        icon: "target",
      },
      {
        title: "Background Research",
        detail: "Check what is known and what limits you have.",
        icon: "search",
      },
      {
        title: "Brainstorm Solutions",
        detail: "List a few possible ideas to solve it.",
        icon: "bulb",
      },
      {
        title: "Choose the Best Plan",
        detail: "Pick the option that best fits the need.",
        icon: "checkplan",
      },
      {
        title: "Build a Prototype",
        detail: "Make a first version you can test.",
        icon: "wrench",
      },
      {
        title: "Test the Prototype",
        detail: "Try it and collect results.",
        icon: "test",
      },
      {
        title: "Improve if Needed",
        detail: "Fix weak parts and test again.",
        icon: "refresh",
      },
      {
        title: "Report Data",
        detail: "Share final results and what changed.",
        icon: "report",
      },
    ],
    example: {
      title: "Example: Technician Fixing a Car",
      intro: "Quick car repair example using this process.",
      icon: "wrench",
      points: [
        "The car has a starting problem.",
        "The technician checks likely causes.",
        "They list a few repair options.",
        "They choose the best option and do the repair.",
        "They test the car and adjust if needed.",
        "They report the final fix to the owner.",
      ],
    },
  },
  scientific: {
    label: "Scientific Method",
    intro: "Used to test an idea with data.",
    note: "The data decides if the idea is accepted or rejected.",
    icon: "flask",
    badge: "Ask + Test",
    steps: [
      {
        title: "Observe",
        detail: "Notice what is happening.",
        icon: "observe",
      },
      {
        title: "Ask a Question",
        detail: "Ask one clear question you can test.",
        icon: "question",
      },
      {
        title: "Research",
        detail: "Read what is already known.",
        icon: "search",
      },
      {
        title: "Create a Hypothesis",
        detail: "Make a prediction you can test.",
        icon: "hypothesis",
      },
      {
        title: "Run an Experiment",
        detail: "Run a fair test and record data.",
        icon: "experiment",
      },
      {
        title: "Test the Hypothesis",
        detail: "Use data to accept or reject the idea.",
        icon: "decision",
      },
      {
        title: "Draw a Conclusion",
        detail: "State what the results show.",
        icon: "conclusion",
      },
      {
        title: "Report Results",
        detail: "Share your steps and final result.",
        icon: "report",
      },
    ],
    example: {
      title: "Example: Paper Towel Test",
      intro: "Simple test to see which brand absorbs more.",
      icon: "flask",
      points: [
        "One brand looks like it absorbs more.",
        "Question: Which brand absorbs more per sheet?",
        "Hypothesis: Brand A will absorb more than Brand B.",
        "Test both with the same sheet size and water amount.",
        "Compare data and accept or reject the hypothesis.",
        "Share the final answer and test steps.",
      ],
    },
  },
};

const processOrder: ProcessId[] = ["engineering", "scientific"];
const diagramThemes: Record<
  ProcessId,
  {
    points: readonly { x: number; y: number }[];
    previewScale: string;
    fullscreenScale: string;
    gradient: readonly [string, string, string];
    className: string;
  }
> = {
  engineering: {
    points: [
      { x: 14, y: 36 },
      { x: 30, y: 17 },
      { x: 50, y: 20 },
      { x: 69, y: 14 },
      { x: 84, y: 30 },
      { x: 79, y: 49 },
      { x: 58, y: 55 },
      { x: 34, y: 50 },
    ] as const,
    previewScale: "0.75",
    fullscreenScale: "0.8",
    gradient: ["#34d399", "#22d3ee", "#60a5fa"] as const,
    className: "theme-engineering",
  },
  scientific: {
    points: [
      { x: 21, y: 22 },
      { x: 39, y: 13 },
      { x: 62, y: 15 },
      { x: 79, y: 30 },
      { x: 74, y: 48 },
      { x: 56, y: 55 },
      { x: 34, y: 50 },
      { x: 19, y: 36 },
    ] as const,
    previewScale: "0.76",
    fullscreenScale: "0.81",
    gradient: ["#60a5fa", "#38bdf8", "#f59e0b"] as const,
    className: "theme-scientific",
  },
};

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
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const currentProcess = processData[activeProcess];
  const currentDiagramTheme = diagramThemes[activeProcess];
  const step = currentProcess.steps[activeStep];
  const mapHeight = 60;
  const diagramPoints = currentDiagramTheme.points;
  const getTopPercent = (y: number) => (y / mapHeight) * 100;
  const spacePath = diagramPoints
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`,
    )
    .join(" ");
  const progress = Math.round(
    ((activeStep + 1) / currentProcess.steps.length) * 100,
  );
  const lineProgress =
    currentProcess.steps.length > 1
      ? (activeStep / (currentProcess.steps.length - 1)) * 100
      : 0;
  const trackerPoint = diagramPoints[activeStep] ?? diagramPoints[0];
  const mapViewStyle = {
    "--map-scale": isMapExpanded
      ? currentDiagramTheme.fullscreenScale
      : currentDiagramTheme.previewScale,
  } as CSSProperties;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isMapExpanded) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMapExpanded]);

  useEffect(() => {
    if (!isMapExpanded) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMapExpanded(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMapExpanded]);

  const handleProcessSelect = (nextProcess: ProcessId) => {
    setActiveProcess(nextProcess);
    setActiveStep(0);
  };

  const closeMap = () => {
    setIsMapExpanded(false);
  };

  const toggleImmersiveFullscreen = () => {
    setIsMapExpanded((current) => !current);
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
          <p>A quick guide.</p>
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

      <section className={`process-layout ${isMapExpanded ? "map-open" : ""}`}>
        <button
          type="button"
          className={`space-backdrop ${isMapExpanded ? "active" : ""}`}
          onClick={closeMap}
          aria-label="Close full screen map"
          tabIndex={isMapExpanded ? 0 : -1}
        />

        <div className={`space-map-shell ${isMapExpanded ? "is-fullscreen" : ""}`}>
          <div
            className={`space-diagram ${currentDiagramTheme.className} ${isMapExpanded ? "is-fullscreen" : ""}`}
          >
            <div className="diagram-label">
              <div className="diagram-label-group">
                <p className="diagram-title">Diagram for {currentProcess.label}</p>
                <p>Click any point to jump to that step.</p>
              </div>
              <button
                type="button"
                className="map-mode-btn"
                onClick={toggleImmersiveFullscreen}
                aria-label={
                  isMapExpanded
                    ? "Exit immersive full screen map"
                    : "Open immersive full screen map"
                }
              >
                <svg
                  className="mode-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  {isMapExpanded ? (
                    <path
                      d="M10 4H4v6M14 4h6v6M10 20H4v-6M14 20h6v-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
                <span>{isMapExpanded ? "Exit immersive" : "Immersive"}</span>
              </button>
            </div>
            <div className="space-viewport">
              <div className="space-canvas" style={mapViewStyle}>
                <span
                  className="space-focus"
                  style={{
                    left: `${trackerPoint.x}%`,
                    top: `${getTopPercent(trackerPoint.y)}%`,
                  }}
                />
                <svg
                  className="space-links"
                  viewBox="0 0 100 60"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="spaceLinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={currentDiagramTheme.gradient[0]} />
                      <stop offset="52%" stopColor={currentDiagramTheme.gradient[1]} />
                      <stop offset="100%" stopColor={currentDiagramTheme.gradient[2]} />
                    </linearGradient>
                  </defs>
                  <path className="space-link-base" d={spacePath} pathLength={100} />
                  <path
                    className="space-link-progress"
                    d={spacePath}
                    pathLength={100}
                    style={{ strokeDasharray: `${lineProgress} 100` }}
                  />
                  <circle
                    className="space-tracker-ring"
                    cx={trackerPoint.x}
                    cy={trackerPoint.y}
                    r="1.25"
                  />
                  <circle
                    className="space-tracker-dot"
                    cx={trackerPoint.x}
                    cy={trackerPoint.y}
                    r="0.52"
                  />
                </svg>
                <ol className="space-nodes">
                  {currentProcess.steps.map((item, index) => {
                    const isActive = activeStep === index;
                    const isDone = index < activeStep;
                    const placement = diagramPoints[index] ?? { x: 10, y: 10 };

                    return (
                      <li
                        key={item.title}
                        className="space-node-wrap"
                        style={{
                          left: `${placement.x}%`,
                          top: `${getTopPercent(placement.y)}%`,
                          animationDelay: `${index * 75}ms`,
                        }}
                      >
                        <button
                          type="button"
                          className={`space-node ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                          onClick={() => setActiveStep(index)}
                          aria-pressed={isActive}
                        >
                          <span className="space-node-head">
                            <span className="node-number">{index + 1}</span>
                            <span className="node-icon">
                              <Icon name={item.icon} />
                            </span>
                          </span>
                          <h3>{item.title}</h3>
                          <p>{item.detail}</p>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>

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
            Engineering builds a working fix. Science checks if an idea is
            true.
          </p>
        </article>
        <article className="compare-card">
          <span className="compare-icon">
            <Icon name="shield" />
          </span>
          <h4>How They Validate</h4>
          <p>
            Engineering asks if it works. Science asks what the data shows.
          </p>
        </article>
        <article className="compare-card">
          <span className="compare-icon">
            <Icon name="clipboard" />
          </span>
          <h4>What Gets Reported</h4>
          <p>
            Engineering reports the final design. Science reports the final
            conclusion.
          </p>
        </article>
      </section>
    </main>
  );
}
