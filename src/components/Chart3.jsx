import React, {Component} from 'react';
import * as d3 from "d3";

class Chart2 extends Component {
    constructor(props) {
        super(props);
        this.tmdbRef = React.createRef();
    }
    
    componentDidMount() {
        //let accessToRef = d3.select(this.tmdbRef.current);
        //accessToRef.style("background-color", "green")
        this.drawChart();
    }

    drawChart() {
        const data = [12, 36, 6, 25, 20, 35, 10, 20, 35, 38];
        const w = 500;
        const h = 400;
        
        const accessToRef = d3.select(this.tmdbRef.current)
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("background-color", "#cccccc")
            .style("pading", 10)
            .style("margin-left", 5);
        
        //const svg = d3.select("body").append("svg").attr("width", 700).attr("height", 300);
            accessToRef.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 50)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", 40) // try changing bars width 40-60
            .attr("height", (d, i) => d * 10)
            //.attr("fill", "green")
            .attr("fill", (d, i) => d > 24 ? "green" : "#aa3300")

        // To add labels, add the following code to the drawChart function:

          accessToRef.selectAll("text")
          .data(data)
          .enter()
          .append("text")
          .text((d) => d)
          .attr("x", (d, i) => i * 50)
          .attr("y", (d, i) => h - (10 * d) - 3)


      }

    render() {
        return <>
            <div className="movies_stat" ref={this.tmdbRef}></div>
        </>
    }

}

export default Chart2;
