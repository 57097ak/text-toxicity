/**
 * @module server
 */

const express = require('express');
const cors = require('cors');
const toxicityRoutes = require('./routes/Routes');
const { swaggerUi, swaggerDocs } = require('./swagger'); // Import Swagger


/**
 * Initializes the Express application.
 * @type {express.Application}
 */
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Use the routes
app.use('/api', toxicityRoutes);


// Set up Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * Starts the server.
 * @function
 * @returns {void}
 */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
