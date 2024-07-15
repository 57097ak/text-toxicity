/**
 * @file ToxicityDetector.js
 * @description A React component for detecting toxicity in text input.
 */

import React, { useState } from 'react';

/**
 * ToxicityDetector component.
 * 
 * This component allows users to input text, submit it for toxicity classification,
 * and view the results. It includes a loading animation while the classification is in progress.
 * 
 * @component
 * @returns {JSX.Element} The rendered ToxicityDetector component.
 */
const ToxicityDetector = () => {
  /** @type {string} The text input from the user. */
  const [text, setText] = useState('');
  
  /** @type {Array<Object>} The predictions returned from the toxicity model. */
  const [predictions, setPredictions] = useState([]);
  
  /** @type {boolean} Indicates if the loading state is active. */
  const [loading, setLoading] = useState(false);
  
  /** @type {number} The percentage of loading progress. */
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  
  /** @type {string} The submitted text to display in predictions. */
  const [submittedText, setSubmittedText] = useState('');

  /**
   * Handles the form submission.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   * @async
   * @returns {Promise<void>} A promise that resolves when the submission is complete.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingPercentage(0);

    const interval = setInterval(() => {
      setLoadingPercentage((prev) => (prev < 90 ? prev + 10 : prev));
    }, 100);

    const response = await fetch('http://localhost:3001/api/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sentences: [text] }),
    });

    const data = await response.json();
    clearInterval(interval);

    const formattedPredictions = data.map((item) => ({
      label: item.label.replace(/_/g, ' '),
      match: item.results[0].match,
    }));

    setPredictions(formattedPredictions);
    setSubmittedText(text);
    setText('');
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Toxicity Detection</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Classify
        </button>
      </form>
      
      {loading ? (
        <div className="mt-6 w-full max-w-md bg-gray-50 border border-gray-300 rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <div className="w-full bg-gray-200 rounded-full mt-2">
            <div
              className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${loadingPercentage}%` }}
            >
              {loadingPercentage}%
            </div>
          </div>
        </div>
      ) : (
        predictions.length > 0 && (
          <div className="mt-6 w-full max-w-md">
            <h2 className="text-xl font-semibold">Predictions for: "{submittedText}"</h2>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <ul>
                {predictions.map((prediction) => (
                  <li key={prediction.label} className="flex justify-between py-1">
                    <span className="font-medium">{prediction.label}:</span>
                    <span>{prediction.match ? 'True' : 'False'}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ToxicityDetector;
