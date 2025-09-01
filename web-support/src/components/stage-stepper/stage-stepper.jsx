import React, { useState } from "react";

export default function StageStepper({ stages, activeStage = 0, handleChange }) {
  const [currentIndex, setCurrentIndex] = useState(activeStage);

  const nextStage = () => {
    if (currentIndex < stages.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      handleChange(stages[currentIndex + 1]);
    }
  };

  const prevStage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      handleChange(stages[currentIndex - 1]);
    }
  };

  return (
    <div className="rounded-md w-full mx-auto text-center">

      {/* Stepper */}
      <div className="flex justify-between relative overflow-hidden">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex flex-col items-center relative">
            <div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold z-10 
                ${index === currentIndex
                  ? "bg-blue-700 text-white border-blue-700"
                  : index < currentIndex
                  ? "bg-blue-700 text-white border-blue-700 opacity-70"
                  : "bg-white text-blue-700 border-blue-700"
                }`}
            >
              {stage.id}
            </div>
            <div className="mt-2 text-sm font-medium">{stage.label}</div>

            {/* Connecting line */}
            {index < stages.length - 1 && (
              <div className="absolute top-6 left-1/2 w-[1000%] h-0.5 bg-blue-700 z-0"></div>
            )}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={prevStage}
          disabled={currentIndex === 0}
          className={`px-6 py-2 rounded-full font-semibold transition 
            ${currentIndex === 0
              ? "bg-blue-300 cursor-not-allowed text-white"
              : "bg-blue-700 hover:bg-blue-800 text-white"
            }`}
        >
          Prev
        </button>
        <button
          onClick={nextStage}
          disabled={currentIndex === stages.length - 1}
          className={`px-6 py-2 rounded-full font-semibold transition 
            ${currentIndex === stages.length - 1
              ? "bg-blue-300 cursor-not-allowed text-white"
              : "bg-blue-700 hover:bg-blue-800 text-white"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
