const express = require('express');
const fs = require('fs').promises;
const app = express();
const path = require('path');

function checkHttps(request, response, next) {
  // Check the protocol — if http, redirect to https.
  if (request.get('X-Forwarded-Proto').indexOf('https') != -1) {
    return next();
  } else {
    response.redirect('https://' + request.hostname + request.url);
  }
}

app.all('*', checkHttps);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/tickets', async (req, res) => {
  const dataFile = await fs.readFile('./data.json');
  const dataJson = JSON.parse(dataFile);
  if (!req.query.searchText) {
    res.send(dataJson);
  } else {
    const filteredData = dataJson.filter((ticket) =>
      ticket.title.toLowerCase().includes(req.query.searchText.toLowerCase())
    );
    res.send(filteredData);
  }
});

app.post('/api/tickets/:ticketId/done', async (req, res) => {
  let dataFile = await fs.readFile('./data.json');
  dataFile = JSON.parse(dataFile);
  for (const i in dataFile) {
    if (dataFile[i].id === req.params.ticketId) {
      dataFile[i].done = true;
      break;
    }
  }
  await fs.writeFile('./data.json', JSON.stringify(dataFile));
  res.send(dataFile);
});

app.post('/api/tickets/:ticketId/undone', async (req, res) => {
  let dataFile = await fs.readFile('./data.json');
  dataFile = JSON.parse(dataFile);
  for (const i in dataFile) {
    if (dataFile[i].id === req.params.ticketId) {
      dataFile[i].done = false;
      break;
    }
  }
  await fs.writeFile('./data.json', JSON.stringify(dataFile));
  res.send(dataFile);
});

let port;
console.log('❇️ NODE_ENV is', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
} else {
  port = 3001;
  console.log('⚠️ Not seeing your changes as you develop?');
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log('❇️ Express server is running on port', listener.address().port);
});
