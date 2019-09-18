import React from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player'

const KEY = 'AIzaSyBdXjGbMZ7Yd_W3digAhPLAjnKWACgL5Us';

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            search: '',
            tittle: '',
            id: '',
            url: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    youtubeApi = async () => {
        console.log(this.state.search);
        const serachApi = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.state.search}&key=${KEY} `)
            .then(res => {
                const data = res.data;
                console.log(data);
                this.setState({
                    tittle: data.items[1].snippet.title,
                    url: data.items[2].snippet.thumbnails.default.url,
                    id: data.items[2].id.videoId,
                })
            })

            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <input type='text' placeholder='Search here' name='search' value={this.state.search} onChange={this.handleChange} />
                <button onClick={() => this.youtubeApi()} > Search </button>   <br/>

                {this.state.search ? (
                    <div>
                        <img
                            src={this.state.url}
                            alt="new"
                        /> <br/>
                        {this.state.tittle} <br/>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${this.state.id}`} playing />
                    </div>

                ) :
                    (
                        ""
                    )}

            </div>
        )
    }

}

export default Search;

//GET https://www.googleapis.com/youtube/v3/videos?part=snippet&id=1&key=[YOUR_API_KEY] HTTP/1.1