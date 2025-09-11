const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;

const server = http.createServer(app);

// Initialize socket connection
const { initializeSocket } = require('./socket');
initializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
