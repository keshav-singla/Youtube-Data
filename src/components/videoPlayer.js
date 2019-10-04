// import React from 'react';
// import { withRouter } from 'react-router-dom'
// import '../styles/variable.css'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import SearchBar from './searchBar';
// import { Grid, ButtonBase } from '@material-ui/core'
// import Typography from '@material-ui/core/Typography';

// const KEY = 'AIzaSyBHkXrHJa0g8E8xwnXVne_wfCJc5hUdZ1U';


// class VideoPlayer extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             videoID: props.match,
//         }
//     }

//     componentDidMount() {
//         this.setState({
//             videoID: this.props.match
//         })

//         axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.state.videoID.params.id}&key=${KEY}`)
//             .then(res => {
//                 this.setState({
//                     videoInfo: res.data.items[0].snippet
//                 })
//             })
//     }

//     render() {
//         console.log(this.state.videoID);
//         console.log(this.props.match);
        
        
//         return (
//             <div>
//                 <Grid conatiner spacing={3}>

//                     <Grid item xs={12}>
//                         <SearchBar />
//                     </Grid>

//                     <Grid item xs={3} md={3} ls={3}>

//                     </Grid>


//                     <Grid item xs={6} className='xyz'>
//                         <iframe
//                             width="900" height="447"
//                             src={`https://www.youtube.com/embed/${this.state.videoID.params.id}?autoplay=1`}
//                             allow='autoplay'
//                             allowFullScreen
//                             title='video'>
//                         </iframe>

//                         <h2>
//                             {this.state.videoInfo && this.state.videoInfo.title}
//                         </h2>
//                     </Grid>

//                     <Grid item xs={3}>

//                     </Grid>

//                 </Grid>
//             </div>
//         )
//     }
// }

// export default withRouter(VideoPlayer);