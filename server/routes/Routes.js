/**
 * @module routes/Routes
 */

const express = require('express');
const { classifyText } = require('../controllers/Controller');

/**
 * Router for toxicity classification.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * POST /classify
 * Classifies the sentences for toxicity.
 *
 * @function
 * @name classifyText
 * @memberof module:routes/Routes
 * @see {@link module:controllers/Controller.classifyText}
 */

/**
 * @swagger
 * /api/classify:
 *   post:
 *     summary: Classify text for toxicity
 *     description: Classifies the provided sentences for various types of toxicity.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sentences:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successful classification
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   label:
 *                     type: string
 *                   results:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         match:
 *                           type: boolean
 *       500:
 *         description: Internal server error
 */
router.post('/classify', classifyText);

module.exports = router;
