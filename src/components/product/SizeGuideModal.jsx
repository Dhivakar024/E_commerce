import React, { useState, useEffect } from 'react';
import { X, Ruler } from 'lucide-react';

const SIZE_DATA = [
  { size: 'XS', chestCm: '84 - 88', chestIn: '33 - 34.5', waistCm: '64 - 68', waistIn: '25 - 26.5', hipsCm: '90 - 94', hipsIn: '35.5 - 37', lengthCm: '68', lengthIn: '26.8' },
  { size: 'S', chestCm: '88 - 92', chestIn: '34.5 - 36', waistCm: '68 - 72', waistIn: '26.5 - 28.5', hipsCm: '94 - 98', hipsIn: '37 - 38.5', lengthCm: '70', lengthIn: '27.5' },
  { size: 'M', chestCm: '92 - 96', chestIn: '36 - 38', waistCm: '72 - 76', waistIn: '28.5 - 30', hipsCm: '98 - 102', hipsIn: '38.5 - 40', lengthCm: '72', lengthIn: '28.3' },
  { size: 'L', chestCm: '96 - 102', chestIn: '38 - 40', waistCm: '76 - 82', waistIn: '30 - 32.5', hipsCm: '102 - 108', hipsIn: '40 - 42.5', lengthCm: '74', lengthIn: '29.1' },
  { size: 'XL', chestCm: '102 - 108', chestIn: '40 - 42.5', waistCm: '82 - 88', waistIn: '32.5 - 34.5', hipsCm: '108 - 114', hipsIn: '42.5 - 45', lengthCm: '76', lengthIn: '29.9' },
];

export const SizeGuideModal = ({ isOpen, onClose, category }) => {
  const [unit, setUnit] = useState('cm');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (isOpen && e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-none">
        <div
          className="relative w-full max-w-2xl bg-luxury-black border border-white/15 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Size & Measurement Guide"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2.5">
              <Ruler className="w-4 h-4 text-luxury-gold" />
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                Size & Fit Guide {category ? `• ${category}` : ''}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-luxury-cream/70 hover:text-white rounded-full transition-colors"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Switcher */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-luxury-muted font-light">
              All measurements correspond to body dimensions.
            </span>
            <div className="inline-flex p-0.5 bg-white/5 border border-white/10 rounded-none">
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                  unit === 'cm' ? 'bg-white text-luxury-black font-medium' : 'text-luxury-muted hover:text-white'
                }`}
              >
                CM
              </button>
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                  unit === 'in' ? 'bg-white text-luxury-black font-medium' : 'text-luxury-muted hover:text-white'
                }`}
              >
                INCHES
              </button>
            </div>
          </div>

          {/* Measurement Table */}
          <div className="overflow-x-auto border border-white/10 mb-8">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-luxury-champagne font-medium uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Size</th>
                  <th className="p-3.5">Chest / Bust</th>
                  <th className="p-3.5">Waist</th>
                  <th className="p-3.5">Hips</th>
                  <th className="p-3.5">Garment Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-luxury-cream/90 font-light">
                {SIZE_DATA.map((row) => (
                  <tr key={row.size} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-medium text-white">{row.size}</td>
                    <td className="p-3.5">{unit === 'cm' ? `${row.chestCm} cm` : `${row.chestIn} in`}</td>
                    <td className="p-3.5">{unit === 'cm' ? `${row.waistCm} cm` : `${row.waistIn} in`}</td>
                    <td className="p-3.5">{unit === 'cm' ? `${row.hipsCm} cm` : `${row.hipsIn} in`}</td>
                    <td className="p-3.5">{unit === 'cm' ? `${row.lengthCm} cm` : `${row.lengthIn} in`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure Guide */}
          <div className="pt-6 border-t border-white/10">
            <h4 className="text-xs uppercase tracking-widest text-luxury-champagne font-medium mb-3">
              How to Measure
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-luxury-muted font-light leading-relaxed">
              <div>
                <span className="text-white font-normal block mb-1">1. Chest / Bust</span>
                Measure around the fullest part of your chest, keeping the tape horizontal.
              </div>
              <div>
                <span className="text-white font-normal block mb-1">2. Natural Waist</span>
                Measure around your natural waistline, where your body naturally bends.
              </div>
              <div>
                <span className="text-white font-normal block mb-1">3. Hips</span>
                Measure around the fullest point of your hips with feet together.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
