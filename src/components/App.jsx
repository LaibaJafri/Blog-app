import { useEffect, useState } from "react"
import Nav from "./Nav"
import Article from "./Article"
import ArticleEntry from "./ArticleEntry"
import { fetchArticles, createArticle, updateArticle, deleteArticle } from "../services/articleService"
import "./App.css"

export default function App() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [writing, setWriting] = useState(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    fetchArticles().then(setArticles)
  }, [])

  function addArticle({ title, body }) {
    createArticle({ title, body }).then((article) => {
      setArticle(article)
      setArticles([article, ...articles])
      setWriting(false)
    })
  }

  function handleUpdateArticle(updatedArticle) {
    updateArticle(updatedArticle.id, updatedArticle).then((article) => {
      setArticle(article)
      setArticles(articles.map(a => a.id === article.id ? article : a))
      setEditing(false)
    })
  }

  function handleDeleteArticle(id) {
    if (window.confirm("Are you sure you want to delete this article?")) {
      deleteArticle(id).then(() => {
        setArticles(articles.filter(a => a.id !== id))
        if (article && article.id === id) {
          setArticle(null)
        }
      })
    }
  }

  return (
    <div className="App">
      <header>
        Blog 
        <button onClick={() => setWriting(true)}>New Article</button>
      </header>
      <Nav articles={articles} setArticle={setArticle} />
      {writing ? (
        <ArticleEntry 
          addArticle={addArticle} 
          onCancel={() => setWriting(false)}
        />
      ) : editing ? (
        <ArticleEntry 
          article={article}
          addArticle={handleUpdateArticle} 
          onCancel={() => setEditing(false)}
        />
      ) : (
        <Article 
          article={article} 
          onEdit={() => setEditing(true)}
          onDelete={handleDeleteArticle}
        />
      )}
    </div>
  )
}