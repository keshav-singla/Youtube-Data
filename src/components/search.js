import React from 'react';
import axios from 'axios';
import '../styles/search.css'
import '../styles/variable.css'
import { Link } from 'react-router-dom'
import JSONP from 'jsonp';
import SearchBar from './searchBar';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

const KEY = 'AIzaSyBHkXrHJa0g8E8xwnXVne_wfCJc5hUdZ1U';
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
            options: [],
        }
    }

    componentDidMount() {
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&maxResults=20&chart=mostPopular&regionCode=in&key=${KEY}`)
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

    handleClick = (input) => {
        this.setState({
            search: input
        });
        this.youtubeApi(input)
    }

    render() {
        console.log(this.state.options);
        return (
            < Grid container maxWidth="xl">
                <Grid item xs={12}>
                    {/* Search bar and button */}
                    <SearchBar />
                </Grid>

                <Grid item xs={2} className='homePageVideos'>

                </Grid>
                
                <Grid item xs={10} className='xyz'>
                    <GridList
                        cellHeight={180}
                        className='gridList'
                    >
                        <GridListTile key="header" cols={2} style={{ height: 'auto' }}>
                            <ListSubheader component="div"> Most Popular Videos </ListSubheader>
                        </GridListTile>

                        {this.state.videos.map((key, index) => {
                            console.log(key)
                            return (
                                <Grid
                                    item xs={3}
                                    className='mostPopularVideos'
                                    spacing={5}
                                >
                                    <GridListTile key={key.snippet.thumbnails.medium.url}>
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
                                        <GridListTileBar
                                            title={key.snippet.title}
                                        />
                                    </GridListTile>
                                </Grid >
                            )
                        })}
                    </GridList>
                </Grid>
            </Grid>
        )
    }
}

export default Search;