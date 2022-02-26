import React, {Component} from 'react';
import {observer} from "mobx-react"
import {Switch, Route} from "react-router-dom"
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import Movie from "./components/Movie"
import "./styles/main.scss"
import movieStore from "./store/movie"
import actorStore from "./store/actor"
import Actor from "./components/Actor"

const App = observer(class extends Component {
  constructor () {
    super()
    this.state = {
      movies: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null
    }
  }
  componentDidMount() {
    
    this.apiKey=process.env.REACT_APP_API
    console.log(this.apiKey)
    console.log(process.env.REACT_APP_TITLE)

    console.log("Pop", this.props.store.popular)
    this.props.store.fetchPopular(this.props.store.currentPage)
  }

  handleInput = (e) => {
    let term = this.props.store.term = e.target.value
    if(term === 0) {
      this.props.store.fetchPopular(this.props.store.currentPage)
    } else {
      this.props.store.fetchSearch(term, this.props.store.currentPage)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({currentPage: 1})
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({ movies: [...data.results], totalResults: data.total_results })
      })
  }

  changePage = (e) => {
    this.props.store.currentPage = e
    console.log("page", e)
    if(this.props.store.term.length === 0) {
      this.props.store.fetchPopular(this.props.store.currentPage)
    } else {
      this.props.store.fetchSearch(this.props.store.term, this.props.store.currentPage)
    }
    this.scrollTop()
  }

  clearSearch = () => {
    this.props.store.term = ""
    this.props.store.currentPage = 1
    this.props.store.fetchPopular(this.props.store.currentPage)
  }

  scrollTop = () => {
    window.scrollTo(0, 0)
  }

  render() {
    const {popular, searchResults, loaded, term} = this.props.store
    const { credits } = movieStore
    const { crew, cast } = credits
    const director = crew ? crew.filter(i => i.job === 'Director') : null
    const directorName = crew ? director[0].name : null
    const directorId = crew ? director[0].id : null
    const { actorCredits } = actorStore
    return (
      <div className="relative">
        <Navigation 
        clearSearch={this.clearSearch}  
         />
        <Switch>
          <Route exact path="/">
            <Home 
            changePage={this.changePage}
            handleInput={this.handleInput}
            term={this.props.store.term}
            scrollTop={this.scrollTop} 
            handleSubmit={this.handleSubmit} />
          </Route>
        </Switch>

        <Switch>
          {
            // Routes for Popular movies & Searched movies
          }
          {!loaded ? null : !term ? 
          popular.results.map(i => <Route
          path={`/movie/${i.id}`} 
          key={i.id}>
            <Movie id={i.id} 
            scrollTop={this.scrollTop} />
          </Route>) :
          searchResults.results.map(i => <Route
          path={`/movie/${i.id}`} key={i.id}>
            <Movie id={i.id} 
            scrollTop={this.scrollTop}/>
            </Route>)}
        </Switch>

        <Switch>
          {
            // Route for the director
          }
          <Route path={`/director/${directorName ? 
            directorName.split(' ').join('-') : 
            directorName}`}>
            <Actor id={directorId} 
            scrollTop={this.scrollTop} />
          </Route>
          {
            // Routes for Actors 
          }
          {!loaded ? null : 
          credits.length !== 0 ?  
          cast.slice(0, 11).map(person => (
            <Route 
            key={person.id} 
            path={`/actor/${person.name.split(' ').join('-')}`}>
              <Actor id={person.id} 
              scrollTop={this.scrollTop} />
            </Route>
          )) : null}

          {
            // Routes for Actor known for movies
          }
          {actorStore.loaded && (actorCredits.length !== 0) ? 
          actorCredits.cast
            .filter(item => item.vote_average > 5)
            .sort((a, b) =>
                a.vote_average > b.vote_average
                ? -1
                : b.vote_average > a.vote_average
                ? 1
                : 0
            )
            .slice(0, 9)
            .map(i => (
              <Route 
              path={`/movie/${i.id}`} 
              key={i.id}>
                <Movie id={i.id} 
                scrollTop={this.scrollTop} />
              </Route>
            )) :
            null
          }
        </Switch>
      </div>
    )
  }
})

export default App