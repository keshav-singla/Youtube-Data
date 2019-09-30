import React from 'react';
import axios from 'axios';
import '../styles/search.css'
import '../styles/variable.css'
import JSONP from 'jsonp';
import { withRouter } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Downshift from 'downshift';


const KEY = 'AIzaSyBHkXrHJa0g8E8xwnXVne_wfCJc5hUdZ1U';
const googleAutoSuggestURL = `//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=`;


class SearchBar extends React.Component {
    constructor() {
        super()
        this.state = {
            search: '',
            videos: [],
            list: [],
            error: '',
            regionVideo: [],
            options: [],
            showMe: true,
        }
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

    youtubeApi = async (input) => {
        const serachApi = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&key=${KEY}`)
        this.setState({
            list: serachApi.data.items,
        })
        console.log(this.props.history);
        this.props.history.push(`/results/serach-query:${this.state.search}`,
            { state: this.state.list }
        );
    }

    handleClick = (input) => {
        this.setState({
            search: input,
            showMe: false
        });
        this.youtubeApi(input)
    }

    handleClose = () => {
        this.setState({
            options: []
        })
    }

    render() {
        return (
            <div className='root'>
                <AppBar style={{ backgroundColor: '#009FF5' }} >
                    <Grid container >

                        <Grid item xs={3}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    // className={classes.menuButton}
                                    color="inherit"
                                    aria-label="open drawer"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Icon className="youTubeIcon" color="secondary" />
                            </Toolbar>

                        </Grid>

                        <Grid
                            justify="center"
                            container direction='row'
                            alignItems="center"
                            item xs={6}
                            className='search'
                        >
                            <input
                                className="searchBar"
                                // id="outlined-search"
                                type="search"
                                placeholder='Search here'
                                name='search'
                                margin="normal"
                                variant="outlined"
                                value={this.state.search}
                                onChange={this.handleChange}
                                autocomplete="off"
                            />



                            <button
                                className='searchButton'
                                onClick={() => this.youtubeApi(this.state.search)}
                            >
                                Search
                            </button>

                            {this.state.options ?
                                <div className='suggestionList'>
                                    {this.state.options.map((i, index) => {
                                        return (
                                            this.state.showMe ?
                                                <div className='suggestionListItem'>
                                                    <p
                                                        onClick={() => this.handleClick(i[0])}
                                                        onBlur={() => this.handleClose}
                                                    >{i[0]}</p>
                                                </div>
                                                : null
                                        )
                                    })}
                                </div> : null
                            }
                        </Grid>

                        <Grid item xs={3}>

                        </Grid>

                    </Grid>
                </AppBar>
            </div>
        )
    }
}

export default withRouter(SearchBar);