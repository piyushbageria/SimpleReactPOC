var React = require('react');
var ReactDOM  = require('react-dom');

var Greeting = require('./greeting');
var SearchList = require('./components/SearchList');

var App = React.createClass({
  render() {
    return <SearchList/>;
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
