import React from 'react'
import 'video-react/dist/video-react.css';
import '../styles/variable.css'
import { withRouter } from 'react-router-dom'

class Searchlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            videoDescription: '',
            list: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.renderingList
        })

    }

    playVideo = (vidoeID) => {
        console.log(vidoeID)
        this.props.history.push(`/watch?v=${vidoeID}`)
    }


    render() {
        return (
            <div className='searchList'>
                {this.state.list.map((key, index) => {
                    console.log(key)
                    return (
                        <div className='searchListContainer'>
                            <span className='thumbnail'>
                                <img
                                    onClick={() => this.playVideo(key.id.videoId)}
                                    src={key.snippet.thumbnails.medium.url}
                                    alt="new"
                                />
                            </span>
                            <span className='thumbnail'>
                                <h2>{key.snippet.title}</h2>
                                <p>{key.snippet.description}</p>
                                <p>{key.id.videoId}</p>
                            </span>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default withRouter(Searchlist)