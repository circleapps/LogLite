
const http = require('http');
const fs = require('fs')

const fileContents = fs.readFileSync('./test.log').toString();


var tzOffset = (new Date()).getTimezoneOffset() * 60000;
var localISOTime = new Date(Date.now() - tzOffset).toISOString();

const postData = JSON.stringify({
    timestamp: localISOTime,
    category: "Game",
    message: fileContents
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