const querystring = require('querystring');
const http = require('http');

var postData = querystring.stringify({
    'msg' : 'Hello World!'
});

var options = {
  hostname: 'posttestserver.com',
  port: 80,
  path: '/post.php',
  method: 'POST',
  headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       'Content-Length': postData.length
     }
};

var req = http.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(postData);
req.end();