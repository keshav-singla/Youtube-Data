import React from 'react'
import { withRouter } from 'react-router-dom'
import Search from './search';
import '../styles/variable.css'


class Video extends React.Component{
    constructor(props){
        super(props)
        this.state={
            videoID : props.match
        }
    }

    componentDidMount(){
        console.log(this.props);
        console.log();

        localStorage.setItem('rememberMe', this.state.videoID.params.id);
        this.setState({
            videoID : this.props.match
        })
    }

    render(){
        console.log(this.state.videoID);
        return(
            <div>
                <Search />
            <div className='videoContainer'>
                 <iframe 
                    width="900" height="447"
                    src={`https://www.youtube.com/embed/${this.state.videoID.params.id}?autoplay=1`}
                    allow='autoplay'
                    allowFullScreen
                    title='video'>
                </iframe>
            </div>
            </div>

            
        )
    }
}

export default withRouter(Video);
