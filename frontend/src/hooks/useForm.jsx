import { useState } from "react";

export const useHook = (formComponents) => {
  const [currentStep, setCurrentStep] = useState(0);

  const changeStep = (i) => {
    if (i > formComponents.length - 1 || i < 0) return;

    setCurrentStep(i);
  };

  return {
    currentStep,
    changeStep,
    currentComponent: formComponents[currentStep],
  };
};
