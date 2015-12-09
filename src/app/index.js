var React = require('react');
var ReactDOM  = require('react-dom');

var Greeting = require('./greeting');

var App = React.createClass({
  render() {
    return <Greeting/>;
  }
});

ReactDOM.render(<App />, document.body);
