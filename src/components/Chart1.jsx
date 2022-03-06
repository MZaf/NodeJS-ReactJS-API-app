import React, {Component} from 'react';
import * as d3 from "d3";
import store from "../store/home"
class Chart2 extends Component {
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
      var xScale = d3.scaleLinear()
        .domain([0, data_top10_MovieRating.length])
        .range([50, width-10]);
    
      // Scale Bar Chart data max value in height  
      var yScale = d3.scaleLinear()
        .domain([0, d3.max(data_top10_MovieRating)])
        .range([0, height * 0.7]);

      var xAxis = d3.scaleLinear()
        // .domain([0, 20]) 
        // .range([80, 180]);
        .domain([0, data_top10_MovieRating.length])
        .range([0, width-70]);
    
      // var yAxis = d3.scaleLinear()
      //   .domain([0, d3.max(data_top10_MovieRating)])
      //   .range([height, 0]);
    
      var yAxis = d3.scaleLinear()
        .domain([0, 10])
        .range([height * 0.85 , 0]);

      // Add SVG bar rect for Bar Chart
      const accessToRef = d3.select(this.tmdbRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        // .append("g")
        //.style("margin-top", 50)
        .style("background-color", "#888")
        
      // accessToRef.selectAll("svg")
      accessToRef.selectAll("svg")
        .data(data_top10_MovieRating)
        .enter()
        .append('g')
        .attr('transform', 'translate(40, 360)')
        .call(d3.axisBottom(xAxis))

      // Add Left Axis
      accessToRef.selectAll("svg")
        .data(data_top10_MovieRating)
        .enter()
        .append('g')
        .attr('transform', 'translate(40, 20)')
        .call(d3.axisLeft(yAxis))
        
    
        // Add Bar chart rect color #01d277     
      accessToRef.selectAll("rect")
        .data(data_top10_MovieRating)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(i)+10)
        .attr("y", (d) => height-yScale(d) -45)
        .attr("width", 35) 
        .attr("height", (d, i) => yScale(d) )
        //.attr("fill", "green")
        .attr("fill", (d, i) => d > 6.3 ? "#006600" : "#aa4400")

      // Add Rating labels above Chart Bars
      accessToRef.selectAll("svg")
        .data(data_top10_MovieRating)
        .enter()
        .append("text")
        .text((d) => d)
        .attr("x", (d,i) => xScale(i)+15)
        .attr("y", (d,i) => height-yScale(d)-50 )
      
      
      // Add D3 Chart heading, axis titles and legends
      // Add D3 chart xAxis title below axisBottom
      accessToRef.selectAll("svg")
        .data(data_top10_MovieRating)
        .enter()
        .append('g')
        .attr("class", "x axis")
        //.attr("color", "#ccc")
        .attr("fill", "#00ff00" )
        .attr("transform", "translate(205, 392 )")
        .append("text")
        .text("Top 10 Movies")
        //.attr("text-size", "14")

      // Add D3 chart yAxis title and rotate 
      accessToRef.selectAll("svg")
        .data(data_top10_MovieRating)
        .enter()
        .append('g')
        .attr("class", "y axis")
        //.attr("color", "#ccc")
        .attr("fill", "#0000ff" )
        .attr("transform", "translate(20, 230 )")
        .append("text")
        .text("R a t i n g")
        .attr("transform", "rotate(-90)")
        .attr("x", 10)
        
      //  svg.append("g")
      // .attr("class", "y axis")
      // .call(yAxis)
      // .append("text")
      // .attr("transform", "rotate(-90)")
      // .attr("y", -30)
      // .attr("dy", ".71em")
      // .style("text-anchor", "end")
      // .text("Movie Rating");
        
        

      }

    render() {
        return <>
            <div className="movies_stat" ref={this.tmdbRef}></div>
        </>
    }

}

export default Chart2;
