import React from 'react';
import axios from 'axios';
import '../styles/search.css'
import '../styles/variable.css'
import JSONP from 'jsonp';
import { withRouter } from 'react-router-dom'

const KEY = 'AIzaSyBdXjGbMZ7Yd_W3digAhPLAjnKWACgL5Us';
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
        const serachApi = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&key=${KEY} `)
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
                        autocomplete="off"
                    />

                    <button 
                        className='searchButton' 
                        onClick={() => this.youtubeApi(this.state.search)} 
                    > 
                        Search 
                    </button>   <br />
                </div>

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

                {this.state.error}
            </div>
        )
    }
}

export default withRouter(SearchBar);