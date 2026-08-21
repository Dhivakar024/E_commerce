import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-3 font-medium">
          404 ERROR
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-luxury-muted mb-8 leading-relaxed">
          The requested page or collection does not exist or has been relocated to our private archives.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-luxury-black text-xs uppercase tracking-widest font-medium hover:bg-luxury-champagne transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};
