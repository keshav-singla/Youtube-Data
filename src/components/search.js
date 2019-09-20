import React from 'react';
import axios from 'axios';
import Searchlist from './searchList';
import '../styles/search.css'
import '../styles/variable.css'


const KEY = 'AIzaSyBdXjGbMZ7Yd_W3digAhPLAjnKWACgL5Us';

class Search extends React.Component {
    
    constructor() {
        super()
        this.state = {
            search: '',
            list: [],
            error: ''
        }
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    youtubeApi = async () => {
        const serachApi = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${this.state.search}&key=${KEY} `)
        this.setState({
            list: serachApi.data.items,
        })

    }               



    render() {
        // console.log(this.state.list);
        
        return (
            <div className='container'>
                <div className='searchContainer'>
                    <input className="searchBar" type='text' placeholder='Search here' name='search' value={this.state.search} onChange={this.handleChange} />
                    <button className='searchButton' onClick={() => this.youtubeApi()} > Search </button>   <br />
                </div>
                {this.state.error}
                <Searchlist renderingList={this.state.list} />
            </div>
        )
    }
}

export default Search;