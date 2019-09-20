import React from 'react'
import 'video-react/dist/video-react.css';
import '../styles/variable.css'
import { withRouter, Link } from 'react-router-dom'

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


    render() {
        return (
            <div className='searchList'>
                {this.state.list.map((key, index) => {

                    console.log(key)
                    return (
                        <div className='searchListContainer'>
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
                                <h2>{key.snippet.title}</h2>
                                <p>{key.snippet.description}</p>
                                <p>{key.id.videoId}</p>
                            </span>
                        </div>
                    )
                })}
                <div>
                    {/* <Video videoID={this.state.id} /> */}
                </div>
            </div>
        )
    }
}

export default withRouter(Searchlist)