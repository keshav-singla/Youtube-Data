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
import ListSubheader from '@material-ui/core/ListSubheader';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";


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
                const searchResults = data[5];
                self.setState({
                    options: searchResults
                });
            }
        });
    }

    handleClick = (input) => {
        this.setState({
            search: input,
            showMe: false
        });
        this.youtubeApi(input)
        this.setState({
            options: []
        })
    }

    // handleClose = () => {
    //     this.setState({
    //         options: []
    //     })
    // }

    Media = (props) => {
        return (
            <Grid item wrap="nowrap" xs={10} className='xyz' sm md container >
                <GridList
                    // cellHeight={180}
                    // className='gridList'
                >

                    <GridListTile key="header" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div"> Most Popular Videos </ListSubheader>
                    </GridListTile>


                    {this.state.videos.map((key, index) => {
                        return (
                            <Grid
                                item xs={3}
                                // className='mostPopularVideos'
                                spacing={5}
                            >
                                <GridListTile >
                                    <Link
                                        to={{
                                            pathname: `/watch?=${key.id}`,
                                            state: { fromDashboard: true }
                                        }}
                                    >
                                        <img
                                            style={{ width: 210, height: 118 }}
                                            src={key.snippet.thumbnails.medium.url}
                                            alt="new"
                                        />
                                    </Link>
                                    
                                </GridListTile>
                                <Box paddingRight={2}>
                                        <Typography gutterBottom variant="body2">
                                            {key.snippet.title}
                                        </Typography>
                                </Box>

                            </Grid>

                        )
                    })}
                </GridList>
            </Grid>
        );
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.options);
        console.log(classes);

        return (
            < Grid xs sm md container  maxWidth="xl">
                <Grid item xs={12}>
                    {/* Search bar and button */}
                    <SearchBar />
                </Grid>
                <Grid item xs={2}>

                </Grid>
                {/* <Grid container wrap="nowrap" > */}
                    {this.Media()}
                {/* </Grid> */}
            </Grid>
        )
    }
}


export default Search;