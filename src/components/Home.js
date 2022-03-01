import React from "react"
import Popular from "./Popular"
import Search from "./Search"
import "../styles/homepage.scss"
import 'rc-pagination/assets/index.css'
import "../styles/pagination.scss"

//const cehvron_right = require('../images/glyphicons-basic-224-chevron-right.svg')

const Home = (props) => {
    const {term, handleInput} = props
    return (
    <div className="relative">
        <div className="search-input">
            <input type="text" name="search" value={term} onChange={handleInput} onSubmit={props.handleSubmit} placeholder="Search..." />
        <div>
            <h2>Sort Results By</h2>
            <span>
                <select defaultValue="Rating Descending">
                    <option value="popularity.desc">Popularity Descending</option>
                    <option value="popularity.asc">Popularity Ascending</option>
                    <option value="vote_average.desc">Rating Descending</option>
                    <option value="vote_average.asc">Rating Ascending</option>
                    <option value="primary_release_date.desc">Release Date Descending</option>
                    <option value="primary_release_date.asc">Release Date Ascending</option>
                    <option value="title.asc">Title (A-Z)</option>
                    <option value="title.desc">Title (Z-A)</option>
                </select>

            </span>
        </div>
        </div>


        {term.length === 0 ? <Popular {...props} /> : <Search {...props} />}
    </div> 
    )
}

export default Home;