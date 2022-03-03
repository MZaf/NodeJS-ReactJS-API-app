import React from "react"
import {Link} from "react-router-dom"
import {observer} from "mobx-react"
import "../styles/nav.scss"
import Home from "./Home"

const logo = require('../images/logo.svg')

const Navigation = observer(({ clearSearch}) => {
    return <header>
        <div className="menu-grid">
            <img className="logo" src={logo} alt="TMDB" onClick={Home} />
            <div className="nav-btn">
                <Link to="/" onClick={clearSearch} className="btn">TopRated Movies</Link>
                <Link to="/movieStat" onClick={clearSearch} className="btn">Movies Stat</Link>
                <Link to="/" onClick={clearSearch} className="btn"> Back</Link>
            </div>
        </div>
    </header>
})

export default Navigation