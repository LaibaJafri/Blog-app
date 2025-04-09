export default function Article({ article, onEdit, onDelete }) {
  return (
    <article>
      {!article ? (
        <p>No article selected</p>
      ) : (
        <section>
          <h2>{article.title}</h2>
          {article.author && <p className="author">By: {article.author}</p>}
          <p className="date">{`Posted: ${article.date.toLocaleDateString()}`}</p>
          <p className="body">{article.body}</p>
          <div className="actions">
            <button onClick={onEdit}>Edit</button>
            <button onClick={() => onDelete(article.id)}>Delete</button>
          </div>
        </section>
      )}
    </article>
  )
}