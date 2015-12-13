var React = require('react');
var ReactDOM  = require('react-dom');

var Greeting = require('./greeting');
var SearchList = require('./components/SearchList');
var RenderChart = require('./components/RenderChart');

var App = React.createClass({
  render() {
    return <RenderChart/>;
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
