import React from 'react';
import axios from 'axios';
import Searchlist from './searchList';
import '../styles/search.css'
import '../styles/variable.css'
import { withRouter, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField"


const KEY = 'AIzaSyBdXjGbMZ7Yd_W3digAhPLAjnKWACgL5Us';

class Search extends React.Component {

    constructor() {
        super()
        this.state = {
            search: '',
            videos: [],
            list: [],
            error: '',
            regionVideo:[]
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
        this.setState({ [e.target.name]: e.target.value });
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
        console.log(this.state.regionVideo);

        return (

            // Search bar and button
            <div className='container'>
                <div className='searchContainer'>
                    <input onKeyDown ={() => this.youtubeApi()}
                        className="searchBar"
                        id="hyv-search"
                        type='search'
                        placeholder='Search here'
                        name='search'
                        value={this.state.search}
                        onChange={this.handleChange}
                        autocomplete="off" />
                    <button className='searchButton' onClick={() => this.youtubeApi()} > Search </button>   <br />
                </div>
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