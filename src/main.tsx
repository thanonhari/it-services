import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import LiffForm from './LiffForm.tsx'
import './index.css'

const Root = () => {
  const path = window.location.pathname;
  
  if (path === '/liff-form') {
    return <LiffForm />;
  }
  
  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
