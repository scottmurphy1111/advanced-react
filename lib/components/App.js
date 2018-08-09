import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import pickBy from 'lodash.pickby';
import Timestamp from './Timestamp';


class App extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  appState = () => {
    const {articles, searchTerm} = this.props.store.getState();
    return {articles, searchTerm};
  }

  state = this.appState();

  onStoreChange = () => {
    this.setState(this.appState());
  }

  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }

  render() {
    let { articles, searchTerm } = this.state;
    const searchRE = new RegExp(searchTerm, 'i');
    if(searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.match(searchRE)
        || value.body.match(searchRE);
      });
    }
    return (
      <div>
        <Timestamp />
        <SearchBar />
        <ArticleList 
          articles={articles}
          store={this.props.store}
        />
      </div>
    );
  }
}

export default App;
