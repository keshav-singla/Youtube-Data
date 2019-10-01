import React from 'react'
import 'video-react/dist/video-react.css';
import '../styles/variable.css'
import { withRouter, Link } from 'react-router-dom'
import SearchBar from './searchBar';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ButtonBase from "@material-ui/core/ButtonBase";

class Searchlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            videoDescription: '',
            list: props.location.state
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.state !== nextProps.location.state) {
            this.setState({
                list: nextProps.location.state
            })
        }
    }

    componentDidMount() {
        console.log(this.props.location);
        this.setState({
            list: this.props.location.state
        })
    }

    render() {
        return (
            <div>
                <Paper>
                    <Grid
                        container
                        // maxWidth="xl"
                        spacing={3}
                    >
                        {/* Search bar and button */}

                        <Grid item xs={12}>
                            <SearchBar />
                        </Grid>

                        <Grid className='homePageVideos' item xs={2}>
                            Hello
                        </Grid>

                        <Grid
                            item xs={10}
                            className='xyz'
                        >
                            {this.state.list.state.length > 0 && this.state.list.state.map((key, index) => {

                                console.log(key)
                                return (
                                    <Grid container spacing={4}>

                                        <Grid item xs={1}>

                                        </Grid>
                                        
                                        <Grid item xs={3} >
                                            <ButtonBase>
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
                                            </ButtonBase>
                                        </Grid>

                                        <Grid item xs={5} container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1">
                                                    {key.snippet.title}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {key.snippet.channelTitle}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {key.snippet.description}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

export default withRouter(Searchlist)