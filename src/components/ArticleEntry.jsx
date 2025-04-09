import { useState, useEffect } from "react"

export default function ArticleEntry({ addArticle, onCancel, article }) {
  const [title, setTitle] = useState(article?.title || "")
  const [body, setBody] = useState(article?.body || "")
  const [author, setAuthor] = useState(article?.author || "")
  const [error, setError] = useState(null)

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setBody(article.body);
      setAuthor(article.author || "");
    }
  }, [article]);

  function submit(e) {
    setError(null)
    e.preventDefault()
    if (!title.trim() || !body.trim()) {
      setError("Both the title and body must be supplied")
    } else {
      addArticle({ 
        title, 
        body, 
        ...(author && { author }),
        ...(article?.id && { id: article.id })
      })
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        {error && <p className="error">{error}</p>}
        Title
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        Author (optional)
        <input 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
        />
        Body
        <textarea
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <div className="form-actions">
          <button type="submit">{article ? 'Update' : 'Create'}</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}