import React from 'react';
import { Check } from 'lucide-react';

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
  const currentIdx = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="w-full py-6 sm:py-8 border-b border-white/10 mb-8 sm:mb-12">
      <div className="max-w-3xl mx-auto flex items-center justify-between relative px-2 sm:px-6">
        {/* Connecting Background Line */}
        <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[1px] bg-white/10 -z-0" />

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
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  isCompleted
                    ? 'bg-luxury-gold text-luxury-black ring-4 ring-luxury-black'
                    : isCurrent
                    ? 'bg-white text-luxury-black ring-4 ring-luxury-black font-semibold'
                    : 'bg-luxury-charcoal text-luxury-muted border border-white/20'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.number}
              </div>

              <span
                className={`text-[10px] sm:text-xs uppercase tracking-wider mt-2 font-medium transition-colors ${
                  isCurrent
                    ? 'text-white'
                    : isCompleted
                    ? 'text-luxury-champagne'
                    : 'text-luxury-muted/70'
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
