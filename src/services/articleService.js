const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Fetch all articles
export async function fetchArticles() {
  try {
    const response = await fetch(`${API_URL}/articles`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    const articles = await response.json();
    return articles.map(article => ({
      id: article._id,
      title: article.title,
      body: article.body,
      date: new Date(article.date),
      author: article.author
    }));
  } catch (err) {
    console.error('Error in fetchArticles:', err);
    throw err;
  }
}

// Create new article
export async function createArticle({ title, body, author = 'Anonymous' }) {
  try {
    const response = await fetch(`${API_URL}/articles/create-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, author }),
    });
    if (!response.ok) {
      throw new Error('Failed to create article');
    }
    const article = await response.json();
    return {
      id: article._id,
      title: article.title,
      body: article.body,
      date: new Date(article.date),
      author: article.author
    };
  } catch (err) {
    console.error('Error in createArticle:', err);
    throw err;
  }
}

// Update article
export async function updateArticle(id, { title, body, author }) {
  try {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, author }),
    });
    if (!response.ok) {
      throw new Error('Failed to update article');
    }
    const article = await response.json();
    return {
      id: article._id,
      title: article.title,
      body: article.body,
      date: new Date(article.date),
      author: article.author
    };
  } catch (err) {
    console.error('Error in updateArticle:', err);
    throw err;
  }
}

// Delete article
export async function deleteArticle(id) {
  try {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete article');
    }
    return await response.json();
  } catch (err) {
    console.error('Error in deleteArticle:', err);
    throw err;
  }
}

// Seed initial data (optional)
export async function seedInitialData() {
  const initialArticles = [
    {
      title: "There's a fair tomorrow",
      body: [
        "Is a mháithrín an ligfidh tú chun aonaigh mé",
        "Is a mhuirnín óg ná healaí é",
        "Beidh aonach amárach in gContae an Chláir",
        "Cén mhaith domh é ní bheidh mé ann",
      ].join("\n"),
      author: "Traditional"
    },
    {
      title: "Hello Everyone",
      body: "It is a good day to learn React and MongoDB\n".repeat(3),
      author: "Admin"
    },
  ];

  try {
    for (const article of initialArticles) {
      await createArticle(article);
    }
    console.log('Initial articles seeded');
  } catch (err) {
    console.error('Error seeding initial data:', err);
  }
}