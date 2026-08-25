import React, { useState } from 'react';
import { Star, CheckCircle, PenTool, X, Sparkles } from 'lucide-react';

const DEMO_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Aanya K.',
    rating: 5,
    date: 'August 12, 2026',
    title: 'Exquisite drape and luxurious finish',
    comment: 'The quality of the textile surpassed my expectations. The French seam finishing and subtle luster give it a true haute couture presence. Fits true to size with effortless grace.',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Devansh R.',
    rating: 5,
    date: 'July 28, 2026',
    title: 'Worth every single rupee',
    comment: 'Impeccable cut and fabric. It feels extraordinarily breathable yet retains its crisp architectural silhouette all day. Packaging was bespoke and arrived in pristine condition.',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Meera S.',
    rating: 4,
    date: 'July 14, 2026',
    title: 'Stunning piece for evening occasions',
    comment: 'A magnificent design. The mother-of-pearl hardware is a delicate touch. Slightly longer on my 5’4 frame than the model, but looks gorgeous with low heels.',
    verified: true,
  },
];

export const ProductReviewsSection = ({ product }) => {
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
    <section className="pt-16 sm:pt-20 border-t border-black/10 mb-20">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-black/10 gap-4">
        <div>
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
            CLIENT EXPERIENCES
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#101820] font-normal">
            Verified Reviews
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setIsWriteReviewOpen(true)}
          className="btn-shine inline-flex items-center gap-2 px-6 py-3 bg-[#101820] hover:bg-[#C9A45C] text-[#F7F3EA] hover:text-[#101820] text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Score Overview & Distribution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-12 mb-12 border-b border-black/10">
        {/* Left: Overall Rating Card (5 Cols) */}
        <div className="md:col-span-5 p-6 sm:p-8 bg-white border border-black/10 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="font-serif text-5xl sm:text-6xl text-[#101820] font-normal mb-2">
            {rating}
          </span>
          <div className="flex items-center gap-1.5 text-[#C9A45C] mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating)
                    ? 'fill-[#C9A45C] text-[#C9A45C]'
                    : 'text-neutral-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-[#A9B0B5] font-light">
            Based on {reviewCount} verified client evaluations
          </span>
        </div>

        {/* Right: Star Breakdown Progress Bars (7 Cols) */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-3 text-xs">
          {[
            { star: 5, pct: 84 },
            { star: 4, pct: 11 },
            { star: 3, pct: 3 },
            { star: 2, pct: 1 },
            { star: 1, pct: 1 },
          ].map((bar) => (
            <div key={bar.star} className="flex items-center gap-3">
              <span className="w-10 text-[#A9B0B5] flex items-center gap-1 font-medium">
                <span>{bar.star}</span>
                <Star className="w-3 h-3 fill-[#C9A45C] text-[#C9A45C]" />
              </span>
              <div className="flex-grow h-1.5 bg-black/10 overflow-hidden">
                <div
                  className="h-full bg-[#C9A45C] transition-all duration-500"
                  style={{ width: `${bar.pct}%` }}
                />
              </div>
              <span className="w-9 text-right text-[#A9B0B5] font-mono text-[11px]">
                {bar.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Cards List */}
      <div className="space-y-6">
        {DEMO_REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-6 sm:p-7 bg-white border border-black/10 space-y-3 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="font-serif text-base text-[#101820] font-semibold">
                  {rev.name}
                </span>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Buyer</span>
                  </span>
                )}
              </div>
              <span className="text-xs text-[#A9B0B5]">{rev.date}</span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 text-[#C9A45C]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < rev.rating ? 'fill-[#C9A45C] text-[#C9A45C]' : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>

            {/* Review Title & Body */}
            <h5 className="text-sm font-semibold text-[#101820]">{rev.title}</h5>
            <p className="text-xs text-[#101820]/80 font-light leading-relaxed">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {isWriteReviewOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 animate-fade-in"
            onClick={() => setIsWriteReviewOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <div
              className="relative w-full max-w-lg bg-luxury-black border border-white/15 p-6 sm:p-8 pointer-events-auto shadow-2xl animate-fade-in"
              role="dialog"
              aria-modal="true"
              aria-label="Write a product review"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-luxury-gold" />
                  <h4 className="font-serif text-xl text-white font-normal">
                    Review {product?.name}
                  </h4>
                </div>
                <button
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="p-2 text-luxury-muted hover:text-white rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-luxury-gold mx-auto" />
                  <h5 className="font-serif text-lg text-white">Thank you for your review</h5>
                  <p className="text-xs text-luxury-muted">
                    Your review has been submitted for verification.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-luxury-cream uppercase tracking-widest mb-1.5">
                      Your Rating:
                    </label>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setUserRating(i + 1)}
                          className="p-1 text-luxury-gold hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              i < userRating ? 'fill-luxury-gold' : 'text-white/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-luxury-cream uppercase tracking-widest mb-1.5">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Sophia M."
                      className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white p-3 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-luxury-cream uppercase tracking-widest mb-1.5">
                      Review Headline:
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="e.g. Exceptional tailoring and fit"
                      className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white p-3 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-luxury-cream uppercase tracking-widest mb-1.5">
                      Your Experience:
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Tell us about the fabric quality, silhouette, and drape..."
                      className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white p-3 text-xs focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsWriteReviewOpen(false)}
                      className="px-5 py-2.5 bg-transparent border border-white/20 text-luxury-muted hover:text-white uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-shine px-6 py-2.5 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-wider font-medium shadow-lg"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
