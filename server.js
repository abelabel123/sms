require('dotenv').config();
const http = require('http');
require("./config/dbConnect");
const app = require('./App/app');

const PORT = process.env.PORT || 2024

const server = http.createServer(app)
server.listen(PORT, console.log(`Server is running on port ${PORT}`));

//MtX98SYulgUjmvHI