import React from 'react'

class Video extends React.Component{
    constructor(props){
        super(props)
        this.state={
            videoID : props.match
        }
    }

    componentDidMount(){
        const {match} = this.props.location
        this.setState({
            videoID : match.params.id
        })
    }

    render(){
        console.log(this.state.videoID);
        
        return(
            <div>
                 <iframe 
                    width="246" height="138"
                    src={`https://www.youtube.com/embed/${this.state.videoID}`}
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'>
                </iframe>
            </div>
        )
    }
}

export default Video;
