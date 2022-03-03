import { observable, action, decorate, runInAction } from "mobx";
import {API_URL, API_KEY} from "../API";

const html = document.querySelector('html')
 
// Store for fetching the Movies Page
class Movie {
  details = []
  credits = []
  loaded = false
  recommendations = []

  fetchAll(id) {
    runInAction(() => {
      this.loaded = false
    })

    fetch(
      `${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => {
        return (
          this.setDetails(res),
          this.details ? html.style.background = `url(https://image.tmdb.org/t/p/w1280${this.details.backdrop_path}) 
                center center / cover no-repeat fixed` : null
        )
    })

    fetch(
      `${API_URL}movie/${id}/credits?api_key=${API_KEY}`
    )
      .then(res => res.json())
      .then(res => {
        this.setCredits(res)
      })

    fetch(
      `${API_URL}movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
    )
    .then(res => res.json())
    .then(res => (
      this.setRecommendations(res)
    ))
  }

  setDetails(data) {
    this.details = data
  }

  setCredits(data) {
    this.credits = data
  }

  setRecommendations(data) {
    this.recommendations = data
    this.loaded = true
  }
}

decorate(Movie, {
  details: observable,
  credits: observable,
  loaded: observable,
  recommendations: observable,
  setDetails: action,
  setCredits: action,
  setRecommendations: action
})

let movieStore = new Movie()

export default movieStore