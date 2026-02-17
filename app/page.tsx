"use client";

import { useState } from "react";

type ProcessId = "engineering" | "scientific";

type ProcessStep = {
  title: string;
  detail: string;
};

type ProcessExample = {
  title: string;
  intro: string;
  points: string[];
};

type ProcessContent = {
  label: string;
  intro: string;
  note: string;
  steps: ProcessStep[];
  example: ProcessExample;
};

const processData: Record<ProcessId, ProcessContent> = {
  engineering: {
    label: "Engineering Design Process",
    intro: "Builds a solution to a real-world problem and improves it through testing.",
    note: "Engineering often loops between testing and improvement until the design meets the standard.",
    steps: [
      {
        title: "Define the Problem",
        detail:
          "State the exact problem and list the requirements the final solution must meet.",
      },
      {
        title: "Background Research",
        detail:
          "Collect known information, limits, and past attempts before making a design.",
      },
      {
        title: "Brainstorm Solutions",
        detail: "Generate several ideas so you have clear options to compare.",
      },
      {
        title: "Select the Best Plan",
        detail:
          "Choose the design plan that best meets the requirements and constraints.",
      },
      {
        title: "Build a Prototype",
        detail: "Create a working model that can be tested in real conditions.",
      },
      {
        title: "Test the Prototype",
        detail:
          "Measure performance and check whether it meets the required standard.",
      },
      {
        title: "Improve if Needed",
        detail:
          "If results are weak, revise the design and test again until it works.",
      },
      {
        title: "Report Final Data",
        detail: "Document final performance, what changed, and the completed result.",
      },
    ],
    example: {
      title: "Example: Technician Fixing a Car",
      intro:
        "A technician follows the design process to solve a car problem in a practical, repeatable way.",
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
    steps: [
      {
        title: "Observe",
        detail: "Notice what is happening and identify the event or pattern at hand.",
      },
      {
        title: "Ask a Question",
        detail: "Turn the observation into a focused question that can be tested.",
      },
      {
        title: "Research",
        detail: "Review existing information so the experiment starts from real context.",
      },
      {
        title: "Create a Hypothesis",
        detail:
          "Write a testable prediction about what you expect to happen and why.",
      },
      {
        title: "Run an Experiment",
        detail: "Test the hypothesis with controlled steps and measurable data.",
      },
      {
        title: "Test the Hypothesis",
        detail:
          "Use the data to decide whether the hypothesis is accepted or rejected.",
      },
      {
        title: "Draw a Conclusion",
        detail: "Explain what the results mean and what was learned.",
      },
      {
        title: "Report Results",
        detail: "Share the procedure and final findings so others can review it.",
      },
    ],
    example: {
      title: "Example: Paper Towel Absorbency",
      intro:
        "A student compares two paper towel brands to find out which one absorbs more water.",
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
      <section className="hero">
        <p className="eyebrow">Interactive Infographic</p>
        <h1>Scientific Method + Engineering Design Process</h1>
        <p>
          Two clear systems for solving problems. Pick a process, click any
          step, and move through the flow.
        </p>
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
              <span>{process.label}</span>
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
                  <span className="step-number">{index + 1}</span>
                  <span className="step-content">
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
              <h3>{process.example.title}</h3>
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
          <h4>Main Goal</h4>
          <p>
            Engineering aims to build a working solution. Science aims to test
            an explanation.
          </p>
        </article>
        <article className="compare-card">
          <h4>How They Validate</h4>
          <p>
            Engineering validates with performance requirements. Science
            validates with experimental evidence.
          </p>
        </article>
        <article className="compare-card">
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
