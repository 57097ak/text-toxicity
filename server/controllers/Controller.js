/**
 * @module controllers/Controller
 */

const toxicity = require('@tensorflow-models/toxicity');

/**
 * Classifies the given sentences for toxicity.
 *
 * @async
 * @function classifyText
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string[]} req.body.sentences - An array of sentences to classify.
 * @returns {Promise<void>} Returns a JSON response with predictions or an error message.
 */
const classifyText = async (req, res) => {
  const { sentences } = req.body;

  try {
    const threshold = 0.9;
    const model = await toxicity.load(threshold);
    const predictions = await model.classify(sentences);
    res.json(predictions);
  } catch (error) {
    console.error('Error during classification:', error);
    res.status(500).json({ error: 'Error during classification' });
  }
};

module.exports = {
  classifyText,
};
