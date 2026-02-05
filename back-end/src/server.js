import express from 'express';
import pkg from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';

const credentials = JSON.parse(
  fs.readFileSync('./credentials.json', 'utf8')
)

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});


const { MongoClient, ServerApiVersion } = pkg;

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

// MongoDB connection
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

let db;

// Connect to MongoDB once when server starts
async function connectToDb() {
  try {
    await client.connect();
    db = client.db('full-stack-react-db');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  
  try {
    const article = await db.collection('articles').findOne({ name });
    
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error: error.message });
  }
});

app.post('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params;
  
  try {
    const result = await db.collection('articles').findOneAndUpdate(
      { name },
      { $inc: { upvotes: 1 } },
      { returnDocument: 'after' }
    );
    
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error upvoting article', error: error.message });
  }
});

app.post('/api/articles/:name/comments', async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  
  try {
    const result = await db.collection('articles').findOneAndUpdate(
      { name },
      { $push: { comments: { postedBy, text } } },
      { returnDocument: 'after' }
    );
    
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
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

// Connect to database and start server
connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});