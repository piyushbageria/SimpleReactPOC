var React = require('react');

var SearchList = React.createClass({

  getInitialState: function(){
    this.origialList = [
      {name:'John'},
      {name:'Jane'},
      {name:'Peter'},
      {name:'Liz'},
      {name:'Serena'},
      {name:'Tim'},
      {name:'Robert'},
      ];

    return {list:this.origialList}
  },
  onChange:function(){
    var val = this.refs.input.value;
    console.log(this.state.list);
    var filteredList = this.origialList.filter(function(elem){
      if(elem.name.toLowerCase().match(val.toLowerCase())){
        return true;
      }
      else {
        return false;
      }
    });

    this.setState({
      list:filteredList
    });

  },
  render:function() {
    return (
      <div>
      <input type="text" onChange={this.onChange} ref="input"/>
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
