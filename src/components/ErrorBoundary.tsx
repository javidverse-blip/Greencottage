import { Component, type ErrorInfo, type ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Grace Cottage render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-error-shell">
          <img src={`${import.meta.env.BASE_URL}images/branding/Logo.png`} alt="Grace Cottage logo" />
          <h1>Grace Cottage</h1>
          <p>The page could not render in this browser session. Refresh the page or restart the Vite dev server.</p>
          <p className="app-error-contact">Call 502-755-6052 or email info@gracecottagetnllc.com.</p>
        </main>
      );
    }

    return this.props.children;
  }
}
