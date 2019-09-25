import React from 'react'
import 'video-react/dist/video-react.css';
import '../styles/variable.css'
import { withRouter, Link } from 'react-router-dom'
import SearchBar from './searchBar';

class Searchlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            videoDescription: '',
            list: props.location.state
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.props.location.state !== nextProps.location.state) {
            this.setState({
                list : nextProps.location.state
            })
        }
    }
        
    componentDidMount(){
        console.log(this.props.location);
            this.setState({
                list : this.props.location.state
            })
    }

    render() {
        return (
            <div className='searchList'>

                <SearchBar  />


                {this.state.list.state.length > 0 && this.state.list.state.map((key, index) => {

                    console.log(key)
                    return (
                        <div className='searchListContainer'>
                            <div className='thumbnailContainer'  >
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
                            </div >
                            <div  className='thumbnail'>
                                <h2>{key.snippet.title}</h2>
                                <p>{key.snippet.channelTitle}</p>
                                <p>{key.snippet.description}</p>
                            </div >
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default withRouter(Searchlist)