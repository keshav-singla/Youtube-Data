import React from 'react';
import axios from 'axios';
import Videolist from './videoList';

const KEY = 'AIzaSyBdXjGbMZ7Yd_W3digAhPLAjnKWACgL5Us';

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [],
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    youtubeApi = async () => {
        const serachApi = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${this.state.search}&key=${KEY} `)
            .then(res => {
                const data = res.data;
                this.setState({
                    list: data.items,

                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <input type='text' placeholder='Search here' name='search' value={this.state.search} onChange={this.handleChange} />
                <button onClick={() => this.youtubeApi()} > Search </button>   <br />

                <div>
                    <Videolist renderingList ={this.state.list} />
                </div>

               

            </div>
        )
    }

}

export default Search;

// <ReactPlayer url={`https://www.youtube.com/watch?v=${this.state.id}`} playing />