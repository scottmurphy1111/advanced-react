import React from 'react';
import PropTypes from 'prop-types';
import storeProvider from './storeProvider';

const styles = {
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

class Article extends React.PureComponent {
  render() {
    const { article, author } = this.props;

    return (
      <div style={styles.article}>
        <div style={styles.title}>{article.title}</div>
        <div style={styles.date}>
          {dateDisplay(article.date)}
        </div>
        <div style={styles.author}>
          <a href={author.website}>
            {author.firstName} {author.lastName}
          </a>
        </div>
        <div style={styles.body}>{article.body}</div>
      </div>
    );
  }
}

Article.propTypes = {
  author: PropTypes.shape({
    website: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }),
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })
};

function extraProps(store, originalProps) {
  return {
    author: store.lookupAuthor(originalProps.article.authorId)
  };
}

export default storeProvider(extraProps)(Article);
