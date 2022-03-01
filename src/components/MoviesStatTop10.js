import React, {Component} from "react"
import {observer} from "mobx-react"
import store from "../store/home"
import Chart2 from "./Chart2"

// const Rating = (props) => {
    
//     return (
//         <div className="movies_stat">Rating: {rating_vote_avg} </div>
                
//     )
// }

const data = [12, 36, 6, 25, 20, 35, 10, 20, 35, 38];
const w = 500;
const h = 400;


const MovieStat = observer(class extends Component {
    // state = {
    //     data: [12, 35, 6, 26, 20, 36, 10, 20, 34, 38],
    //     width: 700,
    //     height: 500,
    //     id: root
    //   }

    render() {
        const {popular, loaded} = store
        //{loaded ? rating_vote_avg = popular.results.map({id, vote_average}) : ''}

        
        // let rating_vote_avg = []
        // //let vote_count = []
        // //let popularity = [] 
        // for(let i = 1; i <= 10 ; i++ ) {
        //     rating_vote_avg.push(popular.results.vote_average[i])
                
        // }
        // console.log(rating_vote_avg)

        return <>
            <section>
                <div className="movies_stat">
                    <h2>Movie Stats</h2>
                </div>
                <div className="movies_stat">Top 10 Movies/Rating D3 Stat page </div>
                {/* <Chart2 data={this.state.data} width={this.state.width} height={this.state.height} color="green" /> */}
                <Chart2 data={data} width={w} height={h} />
                
                <section>
                {loaded ? <div className="movies-grid">
                        {popular.results.map(({id, 
                            original_title, 
                            release_date, 
                            popularity,
                            vote_average,
                            vote_count}) => (
                                    
                            <section>    
                                <div className="infos-one">{release_date}</div>
                                <div className="infos-two">{original_title}</div>
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
            
        </>
    }
})

export default MovieStat