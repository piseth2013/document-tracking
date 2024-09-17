const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let documents = [
  { id: 1, name: 'Document 1', status: 'Pending' },
];

app.get('/api/documents', (req, res) => {
  res.json(documents);
});

app.post('/api/documents', (req, res) => {
  const newDoc = { id: documents.length + 1, name: req.body.name, status: 'Pending' };
  documents.push(newDoc);
  res.status(201).json(newDoc);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});