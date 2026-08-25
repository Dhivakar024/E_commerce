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
        <div className="min-h-screen bg-[#101820] text-[#F7F3EA] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#1B2630] border border-white/10 p-8 sm:p-10 space-y-6 shadow-2xl backdrop-blur-md">
            <div className="w-14 h-14 rounded-full bg-rose-950/40 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-ultra text-[#C9A45C] block font-semibold">
                LAX360 PLATFORM NOTICE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                An Unexpected Exception Occurred
              </h2>
              <p className="text-xs text-[#A9B0B5] font-light leading-relaxed">
                Our marketplace system encountered a momentary disruption. Your cart, session and saved preferences remain safely preserved.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="btn-shine w-full py-3.5 bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872] uppercase tracking-widest text-xs font-semibold transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Return to Marketplace Home</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
