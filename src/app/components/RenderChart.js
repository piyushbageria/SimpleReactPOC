var React = require('react');
var ReactDOM  = require('react-dom');
//loading the sample data using json file
var customData = require('../../resources/data.json');
// react d3 required modules to render chart
var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;

// setting the chart basic properties
var width = 700,
    height = 300,
    margins = {left: 100, right: 100, top: 50, bottom: 50},
    title = "Id vs Value",
    chartSeries = [
      {
        field: 'value',
        name: 'value',
        color: '#ff7f0e'
      }
    ],
    x = function(d) {
      return d.id;
    };

var RenderChart = React.createClass({

getInitialState: function(){
    return{
	    customDataArray:customData.data,
	    categories: [],
	    statusArray: [],
	    selectedCategory:"",
	    selectedStatus:"",
	    chartJsonData:[]
    }
  },

  // filtering the json data to prepare the array of unique categories
  getCategories:function(){
	var categories = this.state.customDataArray.map(function(obj) { return obj.category; });
	categories = categories.filter(function(v,i) { return categories.indexOf(v) == i; });
	return categories;
  },

 // filtering the json data to prepare the array of unique status for the selected category
  getStatusArrray:function(){
  	var dataArary  =  this.state.customDataArray
	var tempArray = [];
	for(var i = 0;i<dataArary.length;i++){
		if(dataArary[i].category == this.state.selectedCategory){
			tempArray.push(dataArary[i].status)
		}
	}
	tempArray = tempArray.filter(function(v,i) { return tempArray.indexOf(v) == i; });
	return tempArray;
  },

  componentWillMount: function(){
  	this.state.categories = this.getCategories();
  	this.state.selectedCategory = this.state.categories[0];
  	this.state.statusArray = this.getStatusArrray();
  	this.state.selectedStatus =this.state.statusArray[0];
  	this.state.chartJsonData = this.prepareChartJson();
  },

  //call back for category dropdown 'onchange' event
  onCategoryChange: function(value) {
  	this.state.selectedCategory = value
  	this.state.statusArray = this.getStatusArrray()
  	this.state.selectedStatus =this.state.statusArray[0]
    this.state.chartJsonData= this.prepareChartJson();
  	this.setState({})
  },

  //call back for status dropdown 'onchange' event
  onStatusChange: function(value) {
  	this.state.selectedStatus = value
  	this.state.chartJsonData= this.prepareChartJson();
  	this.setState({})
  },

  // prepare the array of objects for selected category and status
  prepareChartJson: function(){
		var dataArary  =  this.state.customDataArray;
		var tempArray = [];
		for(var i = 0;i<dataArary.length;i++){
			if(dataArary[i].category == this.state.selectedCategory && dataArary[i].status == this.state.selectedStatus){
				tempArray.push(dataArary[i])
			}
		}
		return tempArray;
	},

  render:function() {
    return (
    	<div>
    	<CategoryDropdown categories={this.state.categories} onChange={this.onCategoryChange}/>
    	<StatusDropdown statusArray={this.state.statusArray} onChange={this.onStatusChange}/>
    	<Chart title={title} width={width} height={height} margins= {margins}>
	      <LineChart
	        showXGrid= {false}
	        showYGrid= {false}
	        margins= {margins}
	        title={title}
	        data={this.state.chartJsonData}
	        width={width}
	        height={height}
	        chartSeries={chartSeries}
	        x={x}
	      />
	    </Chart>
    	</div>
    );
  }
});

var CategoryDropdown = React.createClass({
  render:function() {
	    return (
	    <div>
		<span>CATEGORY:</span>
		<div>
			<select  onChange={this.changeHandler} >
				{
		        this.props.categories.map(function(item) {
		        	return <option value={item} key = {item}>{item}</option>
		        })
		       }
			</select>
		</div>
	</div>
	    );
  },
	changeHandler: function(e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value);
        }
    },
});

var StatusDropdown = React.createClass({
  render:function() {
    return (
    <div>
	<span>STATUS:</span>
	<div>
		<select onChange={this.changeHandler}>
			{
	        this.props.statusArray.map(function(item) {
	        	return <option value={item} key = {item}>{item}</option>
	        })
	       }
		</select>
	</div>
</div>
    );
  },
  changeHandler: function(e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value);
        }
    },
});

module.exports = RenderChart;
