import React, {Component} from 'react';
import store from "../store/home"
import * as d3 from "d3";

class Chart1 extends Component {
    constructor(props) {
        super(props);
        this.tmdbRef = React.createRef();
    }
    
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
      const {popular, loaded} = store
      let rating_vote_count = []
      
      if (loaded){
          rating_vote_count = popular.results.slice(0,10).map(({id, vote_count}) => (vote_count))
      }
      
      const data_top10_vote_count = rating_vote_count;
      const width = 500;
      const height = 400;

      // Get max data value in top Rated data <- 8569 
      // Scale Bar Chart as per data columns 
      // var xScale = d3.scaleLinear()
      //     .domain([0, data_top10_vote_count.length])
      //     .range([0, width]);
      
      var xScale = d3.scaleLinear()
        .domain([0, data_top10_vote_count.length])
        .range([50, width-10]);
      
      // Scale Bar Chart data max value in height  
      var yScale = d3.scaleLinear()
        .domain([0, d3.max(data_top10_vote_count)])
        .range([0, height * 0.7]);

      var xAxis = d3.scaleLinear()
        .domain([0, data_top10_vote_count.length])
        .range([0, width-70]);
    
      var yAxis = d3.scaleLinear()
        .domain([0, 10])
        .range([height * 0.85 , 0]);

      // Add SVG bar rect for Bar Chart
      const accessToRef = d3.select(this.tmdbRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "#cccccc")
        .style("pading", 1)
        .style("margin-left", 5);
    
      // Add Bar chart rect color #01d277     
      accessToRef.selectAll("rect")
        .data(data_top10_vote_count)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(i)+10)
        .attr("y", (d) => height-yScale(d) -45)
        .attr("width", 35) 
        .attr("height", (d, i) => yScale(d) )
        .attr("fill", "green")
        
        // Add bar Chart rect
        // accessToRef.selectAll("rect")
        //     .data(data_top10_vote_count)
        //     .enter()
        //     .append("rect")
        //     .attr("x", (d, i) => xScale(i))
        //     .attr("y", (d) =>  height-yScale(d))
        //     .attr("width", xScale(0.8)) 
        //     .attr("height", (d) => yScale(d)) // ((d - 10)* 1))
        //     //.attr("fill", "green")
        //     .attr("fill", (d, i) => d > 6 ? "green" : "#aa3300");


      // Add Rating labels above Chart Bars
      accessToRef.selectAll("svg")
      .data(data_top10_vote_count)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d,i) => xScale(i)+10)
      .attr("y", (d,i) => height-yScale(d)-50 )
    
      // Add bottom xAxis
      accessToRef.selectAll("svg")
        .data(data_top10_vote_count)
        .enter()
        .append('g')
        .attr("color", "#000")
        //.attr("stroke", "#888")
        .attr('transform', 'translate(40, 360)')
        .call(d3.axisBottom(xAxis))

      // Add Left yAxis
      accessToRef.selectAll("svg")
        .data(data_top10_vote_count)
        .enter()
        .append('g')
        .attr("color", "#000")
        .attr('transform', 'translate(40, 20)')
        .call(d3.axisLeft(yAxis))

      // Add D3 chart xAxis title below axisBottom
      accessToRef.selectAll("svg")
        .data(data_top10_vote_count)
        .enter()
        .append('g')
        .attr("class", "x axis")
        .attr("color", "#ccc")
        .attr("transform", "translate(205, 392 )")
        .append("text")
        .text("Top 10 Movies")
        //.attr("text-size", "14")

      // Add D3 chart yAxis title and rotate 
      accessToRef.selectAll("svg")
        .data(data_top10_vote_count)
        .enter()
        .append('g')
        .attr("class", "y axis")
        .attr("color", "#ddd")
        .attr("transform", "translate(20, 230 )")
        .append("text")
        .text("Rated Count")
        .attr("transform", "rotate(-90)")
        .attr("x", 10)
      
      
      }

    render() {
        return <>
            <div className="movies_stat" ref={this.tmdbRef}></div>
        </>
    }

}

export default Chart1;