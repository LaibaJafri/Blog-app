const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = 'mongodb+srv://SyedaLaiba23:m1SrM5LAFyXbtnsn@cluster0.5vwczuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

let db, articlesCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('blog-app'); // Create or use existing database
    articlesCollection = db.collection('articles'); // Create or use existing collection
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

connectToDatabase();

// Routes
// GET all articles
app.get('/articles', async (req, res) => {
  try {
    const articles = await articlesCollection.find().sort({ date: -1 }).toArray();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new article
app.post('/articles/create-article', async (req, res) => {
  const { title, body, author } = req.body;
  
  const article = {
    title,
    body,
    author: author || 'Anonymous',
    date: new Date()
  };

  try {
    const result = await articlesCollection.insertOne(article);
    const newArticle = {
      _id: result.insertedId,
      ...article
    };
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update article
app.put('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Ensure we don't try to update the _id
    delete updateData._id;
    
    const result = await articlesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    if (!result.value) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json(result.value);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE article
app.delete('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await articlesCollection.findOneAndDelete({ 
      _id: new ObjectId(id) 
    });
    
    if (!result.value) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Close MongoDB connection when Node process ends
process.on('SIGINT', async () => {
  await client.close();
  process.exit();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));