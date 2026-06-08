const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') }); // Loads backend .env variables regardless of working directory
const app = require('./src/app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));