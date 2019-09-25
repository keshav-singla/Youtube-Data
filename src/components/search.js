import React from 'react';
import axios from 'axios';
import '../styles/search.css'
import '../styles/variable.css'
import { Link } from 'react-router-dom'
import JSONP from 'jsonp';
import Select from 'react-select';
import Autocomplete  from 'react-autocomplete';



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

    
    onSelect = (val) => {
        this.setState({
            search: val
        });

        console.log("Option from 'database' selected : ", val);
    }

    renderItem = (item, isHighlighted) => { 
        return (
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
            </div>   
        ); 
    }

    getItemValue = (item) => {
        // You can obviously only return the Label or the component you need to show
        // In this case we are going to show the value and the label that shows in the input
        // something like "1 - Microsoft"
        return `${item.value} - ${item.label}`;
    }


    youtubeApi = async (input) => {
        const serachApi = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&key=${KEY} `)
        this.setState({
            list: serachApi.data.items,
        })
        this.props.history.push(`/serach-query:${this.state.search}`,
            { state: this.state.list }
        );
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
                   
                        {/* <Select 
                            onChange={this.handleChange}
                            value={this.state.search}
                            type='search'
                            placeholder='Search here'
                            name='search'
                        /> */}

                        {/* <Autocomplete
                            getItemValue={this.getItemValue}
                            items={this.state.options}
                            renderItem={this.renderItem}
                            value={this.state.search}
                            onChange={this.handleChange}
                            onSelect={this.onSelect}
                            placeholder='Search here'
                        /> */}
                    <button className='searchButton' onClick={() => this.youtubeApi(this.state.search)} > Search </button>   <br />
                </div>

                {this.state.options ?
                    <div className='suggestionList'>
                        {this.state.options.map((i, index) => {
                            return (
                                <p onClick={() => this.handleClick(i[0])} >{i[0]}</p>
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