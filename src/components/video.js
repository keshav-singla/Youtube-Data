import React from 'react'
import { withRouter } from 'react-router-dom'
import '../styles/variable.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SearchBar from './searchBar';
import { Grid, ButtonBase } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import VideoPlayer from './videoPlayer'



const KEY = 'AIzaSyBHkXrHJa0g8E8xwnXVne_wfCJc5hUdZ1U';

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

        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.state.videoID.params.id}&key=${KEY}`)
            .then(res => {
                this.setState({
                    videoInfo: res.data.items[0].snippet
                })
            })
    }

    componentDidUpdate(prevProps, nextState){
        console.log(nextState.videoID);
        console.log(this.state.videoID);
        // if (this.state.videoID.params.id!==nextState.videoID.params.id){
        //         console.log("harsh ")
        // }
    }

    render() {
        console.log(this.state.videoInfo && this.state.videoInfo.title);
        return (

            <div>
                    <Grid conatiner spacing={3}>

                        <Grid item xs={12}>
                            <SearchBar />
                        </Grid>

                        <Grid item xs={3} md={3} ls={3}>

                        </Grid>


                        <Grid item xs={6} className='xyz'>
                                <iframe
                                    width="900" height="447"
                                    src={`https://www.youtube.com/embed/${this.state.videoID.params.id}?autoplay=1`}
                                    allow='autoplay'
                                    allowFullScreen
                                    title='video'>
                                </iframe>

                            <h2>
                                {this.state.videoInfo && this.state.videoInfo.title}
                            </h2>
                        </Grid>

                        <Grid item xs={3}>

                        </Grid>

                    </Grid>

                    {/* <VideoPlayer /> */}

                    <Grid item className='suggestionVideo xyz'>
                        {this.state.recomendVideos.map((key, index) => {
                            console.log(key)
                            return (
                                <Grid container spacing={16} className='mostPopularVideos'>
                                    <Grid item xs={2}>

                                    </Grid>
                                    <Grid item >
                                        <ButtonBase>
                                            <Link
                                                to={{
                                                    pathname: `/watch?=${key.id.videoId}`,
                                                    // state: { fromDashboard: true }
                                                }}
                                            >
                                                <img
                                                    src={key.snippet.thumbnails.medium.url}
                                                    alt="new"
                                                />
                                            </Link>
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={1}>

                                    </Grid>

                                    <Grid item xs={12} sm md conatiner >
                                        <Grid item xs container direction="column" spacing={16}>

                                            <Grid item xs spacing={16}>
                                                <Typography gutterBottom variant="subtitle1">
                                                    {key.snippet.title}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {key.snippet.channelTitle}
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                </Grid>
                            )
                        })}
                    </Grid>
            </div>
        )
    }
}

export default withRouter(Video);