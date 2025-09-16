import React from 'react';

/**
 * NewsList renders a list of news articles.
 * Props:
 * - articles: Array<{ title, source: { name }, url, publishedAt }>
 */
const NewsList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="card notice" role="note">
        No news found for this city. Try another search or check spelling.
      </div>
    );
  }

  return (
    <div className="news-list" role="list" aria-label="Top headlines">
      {articles.slice(0, 5).map((a, idx) => (
        <article className="news-item" role="listitem" key={a.url || idx}>
          <div className="news-title">{a.title || 'Untitled'}</div>
          <div className="news-meta">
            {a.source?.name ? a.source.name : 'Unknown source'}
            {a.publishedAt ? ` · ${new Date(a.publishedAt).toLocaleString()}` : ''}
          </div>
          {a.url ? (
            <a
              className="news-link"
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open article: ${a.title}`}
            >
              Read article →
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
};

export default NewsList;
