import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello, World from a GET endpoint!');
});
app.get('/hello/:name', (req, res) => {
  const { name } = req.params;
  res.send(`Hello, ${name}, from a GET endpoint with a parameter!`);
});

// app.get('/goodbye', (req, res) => {
//   res.send('Goodbye, World from a GET endpoint!');
// });
app.post('/hello', (req, res) => {
  res.send('Hello, ' + req.body.name + ', from a POST endpoint!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});