import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-red-600">Oops! Something went wrong.</h1>
          <p className="mb-8 text-gray-600">We're sorry, but an unexpected error occurred.</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-[#22c622] px-6 py-3 font-semibold text-white transition hover:bg-[#FACC15] hover:text-[#1E3A1A]"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
