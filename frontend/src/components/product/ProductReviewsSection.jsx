import React, { useState } from 'react';
import { Star, CheckCircle, PenTool, X, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const DEMO_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Aanya K.',
    rating: 5,
    date: 'August 12, 2026',
    title: 'Exquisite quality and finish',
    comment: 'The quality surpassed my expectations. Genuine product, arrived securely packed, and performs flawlessly. Will definitely buy from LAX360 again.',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Devansh R.',
    rating: 5,
    date: 'July 28, 2026',
    title: 'Worth every single rupee',
    comment: 'Impeccable build and presentation. Packaging was reinforced and arrived in pristine condition within 48 hours.',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Meera S.',
    rating: 4,
    date: 'July 14, 2026',
    title: 'Great experience overall',
    comment: 'A magnificent product. Authentic craftsmanship and great customer support when tracking delivery.',
    verified: true,
  },
];

export const ProductReviewsSection = ({ product }) => {
  const { isDark } = useTheme();
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewName && reviewText) {
      setSubmitted(true);
      setTimeout(() => {
        setIsWriteReviewOpen(false);
        setSubmitted(false);
        setReviewName('');
        setReviewTitle('');
        setReviewText('');
      }, 2000);
    }
  };

  const rating = product?.rating || 4.8;
  const reviewCount = product?.reviewCount || 124;

  return (
    <section className={`pt-16 sm:pt-20 border-t mb-20 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
            VERIFIED RATINGS & REVIEWS
          </span>
          <h2 className={`font-serif text-2xl sm:text-3xl font-normal ${
            isDark ? 'text-white' : 'text-[#101820]'
          }`}>
            Customer Experiences
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl sm:text-4xl text-[#C9A45C] font-semibold">{rating}</span>
            <div>
              <div className="flex items-center text-[#C9A45C]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(rating)
                        ? 'fill-[#C9A45C] text-[#C9A45C]'
                        : 'text-neutral-300 dark:text-neutral-700'
                    }`}
                  />
                ))}
              </div>
              <span className={`text-[11px] font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
                Based on {reviewCount} verified purchases
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsWriteReviewOpen(true)}
            className="btn-shine px-5 py-2.5 bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820] text-xs uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer shadow-md"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Write Review Modal / Dropdown */}
      {isWriteReviewOpen && (
        <div className={`p-6 sm:p-8 border mb-12 animate-fade-in ${
          isDark ? 'bg-[#1B2630] border-white/15' : 'bg-white border-black/15 shadow-xl'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`font-serif text-xl font-medium ${isDark ? 'text-white' : 'text-[#101820]'}`}>
              Share Your Feedback
            </h3>
            <button
              onClick={() => setIsWriteReviewOpen(false)}
              className="text-[#A9B0B5] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-2 text-emerald-400">
              <CheckCircle className="w-8 h-8 mx-auto" />
              <p className="font-serif text-lg text-emerald-500">Thank you for submitting your review!</p>
              <p className={`text-xs ${isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'}`}>Your verified feedback has been received and will appear after moderation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className={`block uppercase tracking-wider font-semibold text-[11px] ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}>Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= userRating
                            ? 'fill-[#C9A45C] text-[#C9A45C]'
                            : isDark ? 'text-neutral-700' : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={`block uppercase tracking-wider font-semibold text-[11px] ${
                    isDark ? 'text-white' : 'text-[#101820]'
                  }`}>Name</label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="e.g. Priya M."
                    className={`w-full border px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#C9A45C] ${
                      isDark ? 'bg-white/5 border-white/15 text-white' : 'bg-[#F8F6F0] border-black/15 text-[#101820]'
                    }`}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className={`block uppercase tracking-wider font-semibold text-[11px] ${
                    isDark ? 'text-white' : 'text-[#101820]'
                  }`}>Headline</label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. Excellent build quality"
                    className={`w-full border px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#C9A45C] ${
                      isDark ? 'bg-white/5 border-white/15 text-white' : 'bg-[#F8F6F0] border-black/15 text-[#101820]'
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={`block uppercase tracking-wider font-semibold text-[11px] ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}>Review</label>
                <textarea
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share details about performance, fit, packaging, or delivery..."
                  className={`w-full border px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#C9A45C] ${
                    isDark ? 'bg-white/5 border-white/15 text-white' : 'bg-[#F8F6F0] border-black/15 text-[#101820]'
                  }`}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-shine px-7 py-3 bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820] text-xs uppercase tracking-widest font-semibold cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEMO_REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className={`p-6 border space-y-3 ${
              isDark ? 'bg-[#1B2630] border-white/10' : 'bg-white border-black/10 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center text-[#C9A45C]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < rev.rating
                        ? 'fill-[#C9A45C] text-[#C9A45C]'
                        : isDark ? 'text-neutral-700' : 'text-neutral-200'
                    }`}
                  />
                ))}
              </div>
              <span className={`text-[10px] ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>{rev.date}</span>
            </div>

            <h4 className={`font-serif text-base font-medium ${isDark ? 'text-white' : 'text-[#101820]'}`}>
              "{rev.title}"
            </h4>

            <p className={`text-xs font-light leading-relaxed ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
            }`}>
              {rev.comment}
            </p>

            <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px]">
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>{rev.name}</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle className="w-3 h-3" />
                Verified Buyer
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
