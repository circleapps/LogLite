
const http = require('http');
const querystring = require('querystring');

const postData = JSON.stringify({
    category: "Game",
    message: "Game Inited"
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/log',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length':  Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(postData);
req.end();