import React from 'react'
import { withRouter } from 'react-router-dom'
import '../styles/variable.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SearchBar from './searchBar';

const KEY = 'AIzaSyBdXjGbMZ7Yd_W3digAhPLAjnKWACgL5Us';

class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoID: props.match,
            recomendVideos: [],
        }
    }

    componentDidMount() {
        this.setState({
            videoID: this.props.match
        })
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${this.state.videoID.params.id}&type=video&key=${KEY}`)
            .then(res => {
                this.setState({
                    recomendVideos: res.data.items
                })
            })
    }

    render() {
        console.log(this.state.videoID);
        return (
            <div className='videoContainer'>

                <SearchBar />

                <div className='videoPlayerContainer'>
                    <iframe
                        width="900" height="447"
                        src={`https://www.youtube.com/embed/${this.state.videoID.params.id}?autoplay=1`}
                        allow='autoplay'
                        allowFullScreen
                        title='video'>
                    </iframe>
                </div>

                <div className='suggestionVideo'>
                    {this.state.recomendVideos.map((key, index) => {
                        console.log(key)
                        return (
                            <div className='mostPopularVideos'>
                                <span className='thumbnail'>
                                    <Link
                                        to={{
                                            pathname: `/watch?=${key.id.videoId}`,
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

export default withRouter(Video);