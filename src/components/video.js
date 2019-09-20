import React from 'react'
import { withRouter } from 'react-router-dom'

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
                 <iframe 
                    src={`https://www.youtube.com/embed/${this.state.videoID.params.id}`}
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'>
                </iframe>
            </div>
        )
    }
}

export default withRouter (Video);
