import React, {Component} from "react"
import {observer} from "mobx-react"
import store from "../store/home"
import Chart1 from "./Chart1"
import Chart2 from "./Chart2"
const MovieStat = observer(class extends Component {
    
  render() {
    const {popular, loaded} = store
    return (
      <section>
        <div className="movies_stat">
            <h2>Movie Stats</h2>
        </div>
        <div className="movies_stat">Top 10 Movies Rating D3 Stat page</div>
        <Chart1 />
        <br/>
        <div className="movies_stat">Number of times a Movies has been Rated</div>
        <Chart2 />
        
        <section>
        {loaded ? 
          <div className="movies-grid" >
            {popular.results.slice(0,10).map(({id, 
              original_title,
              title, 
              release_date, 
              popularity,
              vote_average,
              vote_count}) => (
                    
              <section key={id}>    
                <div className="infos-one">{release_date}</div>
                {/* <div className="infos-two">{original_title}</div> */}
                <div className="infos-three">{title}</div>
                <div className="infos-three">{vote_average}</div>
                <div className="infos-three">{vote_count}</div>
                <div className="infos-three">{popularity}</div>
              </section>
              
              )
            )} 
          </div> 
            : <div className="loading">Loading...</div>
        }
        </section>
      </section>
      
    )
  }
})

export default MovieStat