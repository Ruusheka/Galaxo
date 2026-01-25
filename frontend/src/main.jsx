import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_d2lubmluZy1qYXliaXJkLTQ3LmNsZXJrLmFjY291bnRzLmRldiQ";
console.log("Clerk Publishable Key:", PUBLISHABLE_KEY);

const rootElement = document.getElementById('root')
const RootApp = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    if (this.state.hasError) {
      // Fallback: render a simple error message
      return (
        <div style={{ padding: 20, textAlign: 'center', color: '#fff', background: '#05050A', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Something went wrong</h1>
          <p style={{ color: '#ccc' }}>Please refresh the page. If the issue persists, check your configuration.</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', background: '#f59e0b', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children
  }
}

if (PUBLISHABLE_KEY) {
  createRoot(rootElement).render(
    <ErrorBoundary fallback={RootApp}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        {RootApp}
      </ClerkProvider>
    </ErrorBoundary>
  )
} else {
  // If no Clerk key is provided, render without ClerkProvider to avoid throwing
  // and keep the local dev experience functional.
  // eslint-disable-next-line no-console
  console.warn('VITE_CLERK_PUBLISHABLE_KEY not set — rendering without ClerkProvider')
  createRoot(rootElement).render(RootApp)
}
