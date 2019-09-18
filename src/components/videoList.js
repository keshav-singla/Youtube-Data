import React from 'react'
import { Player, BigPlayButton, ControlBar, PlayToggle } from 'video-react';
import Axios from 'axios'
import 'video-react/dist/video-react.css';
// import { url } from 'inspector';



const KEY = 'AIzaSyBdXjGbMZ7Yd_W3digAhPLAjnKWACgL5Us';

class Videolist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            videoDescription: '',
            items: ''
        }
    }

    playVideo = (state) => {
        console.log(state)
    }
    

    render() {
        return (
            <div>
                <div  >
                    {this.props.renderingList.map((i, index) => {
                        console.log(i);
                        
                         if(i.id.channelId){
                            // i.shift()
                        }
                        return (
                            <div>
                                <iframe
                                    src={`https://www.youtube.com/embed/${i.id.videoId}`}
                                    allow='autoplay; encrypted-media'
                                    allowFullScreen
                                    title='video'>
                                </iframe>
                                <p>{i.snippet.title}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Videolist;

// xyz = (items) => {
//     for(let i=0; i<items.length; i++){
//         if(items)
//     }
// }

// xyz(this.props.renderingList)