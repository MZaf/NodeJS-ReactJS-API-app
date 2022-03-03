import React, {Component} from 'react';
import * as d3 from "d3";
import store from "../store/home"

class Chart3 extends Component {
  constructor(props) {
    super(props);
    this.tmdbRef = React.createRef();
}

componentDidMount() {
    this.drawChart();
}

drawChart() {
    const {popular, loaded} = store
    let rating_vote_avg = []
    
    if (loaded){
        rating_vote_avg = popular.results.slice(0,10).map(({id, vote_average}) => (vote_average))
    }
    
    const data_top10_MovieRating = rating_vote_avg;
    const width = 500;
    const height = 400;
    
    // Get max data value in top Rated data <- 8.3 
    // Scale Bar Chart as per data columns 
    //.range([20, width]);
    var xScale = d3.scaleLinear()
        .domain([0, data_top10_MovieRating.length])
        .range([10, width-40]);
    
    // Scale Bar Chart data max value in height  
    //var yScale = d3.scaleLinear()
    //  .domain([0, d3.max(data_top10_MovieRating)])
    //  .range([0, height * 0.8]); 
        
        //.range([0, height]);
        //.range([height * 0.85 , 0]);
    var yScale = d3.scaleLinear()
        .domain([0, 10])
        .range([height * 0.85 , 0]);

    var xScaleAxis = d3.scaleLinear()
        .domain([0, 10]) 
        .range([15, 460]);
        //.domain([0, data_top10_MovieRating.length])
        // .range([0+20, width-20]);
    
    //  .domain([0, d3.max(data_top10_MovieRating)])
    //  .range([0, height]);
    var yAxis = d3.scaleLinear()
        .domain([0, 10])
        .range([height * 0.85 , 0]);
    
        // const svg = d3.select("svg");
            // svg.attr("width", width)
            // svg.attr("height", height);
    
    // Add SVG bar rect for Bar Chart
    const accessToRef = d3.select(this.tmdbRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("margin-top", '0')
        .style("background-color", "#444")
        
        // .style("pading", 20)
        // .style("margin-left", 0)

        // .attr('transform', 'translate(0, height-50)')
        accessToRef.selectAll("svg")
        .data(data_top10_MovieRating)
        .enter()
        .append("g")
        //.attr("stroke", "#888")
        .call(d3.axisBottom(xScaleAxis))
        .attr('transform', 'translate(25, 350)')
        
        // Add Left Axis
        accessToRef.selectAll("svg")
        .data(data_top10_MovieRating)
        .enter()
        .append('g')
        .attr('transform', 'translate(40, 5)')
        .call(d3.axisLeft(yAxis))
        
        //.tickFormat(function(d){
        //   return "$" + d;
        // }).ticks(10))

        // appropriate heading, axis titles and legends
        // Add D3 chart xAxis title below axisBottom
        accessToRef.selectAll("svg")
        .data(data_top10_MovieRating)
        .enter()
        .append('g')
        .attr("class", "x axis")
        .attr("transform", "translate(150, 390 )")
        .append("text")
        .text("Top 10 Movies")
        .attr("text-color", "#ccc")
        //.attr("text-anchor", "center")
        // .attr("class", "x axis")
        // .attr("transform", "translate(-30," + height + ")")
        // .call(xAxis)
        // .attr("x", width)
        // .attr("dy", 30)
        
    
    // accessToRef.selectAll("g")
        // accessToRef.selectAll("svg")
    //     .append('g')
    //     .attr('transform', 'translate(0, 80)')
    //     .call(d3.axisBottom(xScaleAxis));
        
            
    // accessToRef.selectAll("rect")
    //     .data(data_top10_MovieRating)
    //     .enter()
    //     .append("rect")
    //     .attr("x", (d, i) => xScale(i))
    //     .attr("y", (d) => height-yScale(d) -50)
    //     .attr("width", xScale(0.4)) 
    //     .attr("height", (d, i) => yScale(d) )
    //     //.attr("fill", "green")
    //     .attr("fill", (d, i) => d > 6 ? "green" : "#aa3300");

    // To add labels, add the following code to the drawChart function:
    accessToRef.selectAll("text")
        .data(data_top10_MovieRating)
        .enter()
        .append("text")
        .text((d) => d)
        .attr("x", (d, i) => xScale(i)+5)// i * 50)
        .attr("y", (d, i) => height-yScale(d) -5); 

  }

render() {
    return <>
        <div className="movies_stat" ref={this.tmdbRef}></div>
    </>
}

}


export default Chart3;

// var data = [
//   {key:1, value:5},
//   {key:2, value:10},
//   {key:3, value:15},
//   {key:4, value:26},
//   {key:5, value:33},
//   {key:6, value:33},
//   {key:7, value:33},
//   {key:8, value:33},
//   {key:9, value:33},
//   {key:10, value:33},
// ];

// var margin = {
//  top: 30,
//  right: 10,
//  bottom: 30,
//  left: 30
// },

// width = 500 - margin.left - margin.right,
// height = 300 - margin.top - margin.bottom;

// var x = d3.scaleOrdinal()
// var x = d3.scale.ordinal()
//   .domain(data.map(function(d) {
//     return d.key;
// }))
// .rangeRoundBands([margin.left, width], 0.05);

// var y = d3.scaleLinear()
// .domain([0, d3.max(data, function(d) {
//     return d.value;
// })])
// .range([height, 0]);

// var xAxis = d3.svg.axis()
// .scale(x)
// .orient("bottom");

// var yAxis = d3.svg.axis()
// .scale(y)
// .orient("left");

// var key = function(d) {
// return d.key;
//  };

//  var svg = d3.select("#chart").append("svg")
//  .attr("width", width + margin.left + margin.right + 10)
//  .attr("height", height + margin.top + margin.bottom)
//  .append("g")
//  .text("Your tooltip info")
// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//  svg.append("g")
// .attr("class", "x axis")
// .attr("transform", "translate(-30," + height + ")")
// .call(xAxis)
// .append("text")
// .attr("x", width)
// .attr("dy", 30)
// .attr("text-anchor", "end")
// .text("Top 10 Movies");

//  svg.append("g")
// .attr("class", "y axis")
// .call(yAxis)
// .append("text")
// .attr("transform", "rotate(-90)")
// .attr("y", -30)
// .attr("dy", ".71em")
// .style("text-anchor", "end")
// .text("Movie Rating");


// var barWidth = Math.max(1, 0.9 * x.rangeBand());
// var halfGap = Math.max(0, x.rangeBand() - barWidth) / 2;

// var bars = svg.selectAll("rect")
//  .data(data, key)
//  .enter().append("rect")
//  .attr("x", function(d) {
//     return x(d.key) + halfGap - 30 ;
//   })
//  .attr("y", function(d) {
//     return y(d.value);
//   })
//   .attr("width", barWidth)
//   .attr("height", function(d) {
//     return height - y(d.value);
//   })
//  .style("fill", "blue");