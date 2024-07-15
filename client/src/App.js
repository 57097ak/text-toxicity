/**
 * @file App.js
 * @description Main entry point of the Toxicity Detection application.
 */

import React from 'react';
import ToxicityDetector from './components/ToxicityDetector';

/**
 * Main App component.
 * 
 * This component serves as the root of the Toxicity Detection application,
 * rendering the ToxicityDetector component.
 * 
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <div>
      <ToxicityDetector />
    </div>
  );
}

export default App;
