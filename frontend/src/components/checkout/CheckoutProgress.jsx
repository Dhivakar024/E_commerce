import React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const STEPS = [
  { id: 'information', label: 'Information', number: 1 },
  { id: 'shipping', label: 'Shipping', number: 2 },
  { id: 'payment', label: 'Payment', number: 3 },
  { id: 'review', label: 'Review', number: 4 },
];

export const CheckoutProgress = ({
  currentStep,
  completedSteps = [],
  onStepClick,
}) => {
  const { isDark } = useTheme();
  const currentIdx = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className={`w-full py-6 sm:py-8 border-b mb-8 sm:mb-12 transition-colors duration-250 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
      <div className="max-w-3xl mx-auto flex items-center justify-between relative px-2 sm:px-6">
        {/* Connecting Background Line */}
        <div className={`absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[1px] -z-0 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

        {STEPS.map((step, idx) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const isAccessible = isCompleted || idx <= currentIdx;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center group cursor-pointer"
              onClick={() => isAccessible && onStepClick?.(step.id)}
            >
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#C9A45C] text-[#101820] ring-4 ring-white dark:ring-[#101820]'
                    : isCurrent
                    ? isDark
                      ? 'bg-white text-[#101820] ring-4 ring-[#101820]'
                      : 'bg-[#101820] text-white ring-4 ring-white shadow-md'
                    : isDark
                    ? 'bg-[#151F28] text-[#A9B0B5] border border-white/20'
                    : 'bg-neutral-100 text-[#717D86] border border-black/15'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.number}
              </div>

              <span
                className={`text-[10px] sm:text-xs uppercase tracking-wider mt-2 font-semibold transition-colors ${
                  isCurrent
                    ? isDark ? 'text-white' : 'text-[#101820]'
                    : isCompleted
                    ? 'text-[#C9A45C]'
                    : isDark ? 'text-[#A9B0B5]/70' : 'text-[#717D86]'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
