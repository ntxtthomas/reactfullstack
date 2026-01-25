import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

const articleInfo = [
  { name: 'learn-node',
    upvotes: 0,
    comments: [],
  },
  { name: 'learn-react',
    upvotes: 0,
    comments: [],
  },
  { name: 'learn-mongodb',
    upvotes: 0,
    comments: [],
  },
]

app.use(express.json());

app.post('/api/articles/:name/upvote', (req, res) => {
  const articleName = req.params.name;

  const article = articleInfo.find(a => a.name === articleName);

  if (article) {
    article.upvotes += 1;
    res.status(200).json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

app.post('/api/articles/:name/comments', (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  const article = articleInfo.find(a => a.name === name);

  if (article) {
    article.comments.push({ postedBy, text });
    res.status(200).json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});
// app.get('/hello', (req, res) => {
//   res.send('Hello, World from a GET endpoint!');
// });
// app.get('/hello/:name', (req, res) => {
//   const { name } = req.params;
//   res.send(`Hello, ${name}, from a GET endpoint with a parameter!`);
// });
// app.get('/goodbye', (req, res) => {
//   res.send('Goodbye, World from a GET endpoint!');
// });

// app.post('/hello', (req, res) => {
//   res.send('Hello, ' + req.body.name + ', from a POST endpoint!');
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});