import React from 'react';

const style = {
  article: {
    paddingBottom: 16,
    marginBottom: 16,
    borderBottom: '1px solid #ccc'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    marginBottom: 16
  },
  date: {
    fontSize: '0.8rem',
    color: 'tomato'
  },
  author: {
    display: 'block'
  },
  body: {
    paddingLeft: 16
  }
};

const dateDisplay = (dateString) => 
  new Date(dateString).toDateString();

const Article = (props) => {
  const { article, actions } = props;
  const author = actions.lookupAuthor(article.authorId);
  
  return (
    <div style={style.article}>
      <div style={style.title}>{article.title}</div>
      <div style={style.date}>
        {dateDisplay(article.date)}
      </div>
      <div style={style.author}>
        <a href={author.website}>
          {author.firstName} {author.lastName}
        </a>
      </div>
      <div style={style.body}>{article.body}</div>
    </div>
  );
};
export default Article;