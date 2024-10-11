const express = require('express');
const { marked } = require('marked');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/convert', (req, res) => {
  try {
    const { markdown } = req.body;
    if (!markdown) {
      return res.status(400).json({ error: 'Markdown content required' });
    }
    const html = marked(markdown); 
    res.json({ html });
  } catch (error) {
    console.error('Error in conversion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
