PORT = 8000
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = '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';

app.post('/completions', async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "model": 'gpt-3.5-turbo',
      "messages": [{ "role": "user", "content": req.body.message }],
    }),
  };
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`);
});

