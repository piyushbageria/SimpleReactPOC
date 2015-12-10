var React = require('react');

var SearchResultStore = require('./../flux/ResultStore');
var Dispatcher = require('./../flux/Dispatcher');
var SearchAction = require('./../flux/Action');

var SearchInput = React.createClass({
  onChange:function(){
    var val = this.refs.input.value;
    SearchAction.searchString = val;
    Dispatcher.dispatchAction(SearchAction);
  },
  
  render:function(){
    return (
      <span>
      <input type="text" onChange={this.onChange} ref="input"/>
      <button>Clear</button>
      </span>);
  }
});

var SearchList = React.createClass({
  getInitialState: function(){
    return {list:SearchResultStore.getList()}
  },

  componentDidMount:function(){
    var self = this;
    SearchResultStore.onChange(function () {
      self.setState({list:SearchResultStore.getList()});
    });
  },
  render:function() {
    return (
      <div>
      <SearchInput/>
      <SearchResult list={this.state.list}/>
      </div>
    );
  }
});

var SearchResult = React.createClass({

  render:function(){
    return(
      <ul>
      {
        this.props.list.map(function(item,i){
          return (
            <li>{item.name}</li>
          )
        })
      }
      </ul>
    )
  }
})

module.exports = SearchList;
