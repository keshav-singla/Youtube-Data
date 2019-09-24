import React from 'react';
import axios from 'axios';
import '../styles/search.css'
import '../styles/variable.css'
import { Link } from 'react-router-dom'
import JSONP from 'jsonp';




const KEY = 'AIzaSyBdXjGbMZ7Yd_W3digAhPLAjnKWACgL5Us';
const googleAutoSuggestURL = `//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=`;


class Search extends React.Component {

    constructor() {
        super()
        this.state = {
            search: '',
            videos: [],
            list: [],
            error: '',
            regionVideo: []
        }
    }



    componentDidMount() {
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&maxResults=10&chart=mostPopular&regionCode=in&key=${KEY}`)
            .then(res => {
                const videos = res.data.items;
                this.setState({ videos });
            })
    }

    handleChange = (e) => {
        const url = googleAutoSuggestURL + this.state.search,
            self = this;
        this.setState({ [e.target.name]: e.target.value });
        JSONP(url, function (error, data) {
            if (error) {
                console.log(error);
            }
            else {
                const searchResults = data[1];
                self.setState({
                    options: searchResults
                });
            }
        });
    }


    youtubeApi = async () => {
        const serachApi = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.search}&key=${KEY} `)
        this.setState({
            list: serachApi.data.items,
        })
        this.props.history.push(`/serach-query:${this.state.search}`,
            { state: this.state.list }
        );
    }

    render() {
        console.log(this.state.options);

        return (

            // Search bar and button
            <div className='container'>
                <div className='searchContainer'>
                    <input
                        className="searchBar"
                        id="hyv-search"
                        type='search'
                        placeholder='Search here'
                        name='search'
                        value={this.state.search}
                        onChange={this.handleChange}
                        autocomplete="on" 
                        />
                    <button className='searchButton' onClick={() => this.youtubeApi()} > Search </button>   <br />
                </div>


                {this.state.options ?
                    <div className='suggestionList'>
                        {this.state.options.map((i, index) => {
                            return (
                                <p>{i[0]}</p>
                            )
                        })
                        }
                    </div> : null}

                {this.state.error}

                {/* Most Popular Videos list renderig using Api */}
                <h2>Most Popular Videos</h2>


                <div className='homePageVideos'>
                    {this.state.videos.map((key, index) => {
                        console.log(key)
                        return (
                            <div className='mostPopularVideos'>
                                <span className='thumbnail'>
                                    <Link
                                        to={{
                                            pathname: `/watch?=${key.id}`,
                                            state: { fromDashboard: true }
                                        }}
                                    >
                                        <img
                                            src={key.snippet.thumbnails.medium.url}
                                            alt="new"
                                        />
                                    </Link>
                                </span>
                                <span className='thumbnail'>
                                    <p>{key.snippet.title}</p>
                                </span>
                            </div>
                        )
                    })}

                </div>

            </div>
        )
    }
}

export default Search;