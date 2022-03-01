import React, {Component} from 'react';
import * as d3 from "d3";

class Chart1 extends Component {
    constructor(props) {
        super(props);
        this.tmdbRef = React.createRef();
    }
    
    componentDidMount() {
        let accessToRef = d3.select(this.tmdbRef.current);
        accessToRef.style("background-color", "green")
        //this.drawChart();
    }

    render() {
        return <>
            <div className="movies_stat" ref={this.tmdbRef}>Testing Refs</div>
        </>
    }

}

export default Chart1;