import React from 'react';
import axios from 'axios';
import '../styles/search.css'
import '../styles/variable.css'
import { Link } from 'react-router-dom'
import JSONP from 'jsonp';
import SearchBar from './searchBar';

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
            regionVideo: [],
            options : [],
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
        this.setState({ search: e.target.value });
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

    handleClick= (input) => {
        this.setState({
            search: input
        });
        this.youtubeApi(input)
    }

    render() {
        console.log(this.state.options);
        return (
            // Search bar and button
            <div className='container'>
                <SearchBar />

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