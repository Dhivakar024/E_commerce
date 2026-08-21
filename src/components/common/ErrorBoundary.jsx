import { Component } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-luxury-black text-luxury-cream flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-luxury-charcoal/40 border border-white/10 p-8 sm:p-10 space-y-6 shadow-2xl backdrop-blur-md">
            <div className="w-14 h-14 rounded-full bg-rose-950/40 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
                ATELIER CLIENT EXPERIENCE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                An Unexpected Exception Occurred
              </h2>
              <p className="text-xs text-luxury-muted font-light leading-relaxed">
                Our atelier digital concierge encountered an unforeseen disruption. Your cart and preferences remain safely preserved.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="btn-shine w-full py-3.5 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-widest text-xs font-medium transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Return to Atelier Sanctuary</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
