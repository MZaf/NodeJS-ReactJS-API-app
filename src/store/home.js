import {observable, action, decorate, runInAction} from "mobx"
import {API_URL, API_KEY, TOP_RATED_URL} from "../API";

const html = document.querySelector('html')

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
let random = randomNumber(0, 20)


class Home {
    popular = []
    topRated = []
    loaded = false
    searchResults = []
    term = ""
    currentPage = 1

    fetchPopular (page) {
        runInAction(() => {
            this.loaded = false
        })

        fetch(
            `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
          )
            .then(res => res.json())
            .then(res => {
              return (
              this.setPopular(res),
              this.popular.results[random] ? html.style.background = `url(https://image.tmdb.org/t/p/w1280${this.popular.results[random].backdrop_path}) 
              center center / cover no-repeat fixed` : null 
              )
        });
    }

    fetchTopRated () {
      runInAction(() => {
          this.loaded = false
      })

      fetch(`${TOP_RATED_URL}`)
          .then(res => res.json())
          .then(res => {
            return (
            this.setTopRated(res) 
            )
      });
  }

    fetchSearch (term, page) {
        runInAction(() => {
          this.loaded = false;
          this.currentPage = 1;
        });
        fetch(
          `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${term}&page=${page}&include_adult=false`
        )
        .then(res => res.json())
        .then(res => {
        this.setSearch(res);
        // console.log(res);
        });
    }

    setPopular(data) {
        this.popular = data;
        this.loaded = true;
    }

    setToprated(data) {
      this.toprated = data;
      this.loaded = true;
    }
    
    setSearch(data) {
        this.searchResults = data;
        this.loaded = true;
    }
}

decorate(Home, {
    popular: observable,
    topRated: observable,
    search: observable,
    currentPage: observable,
    term: observable,
    setPopular: action,
    setToprated: action,
    setSearch: action,
    loaded: observable
})

const store =  new Home()

export default store