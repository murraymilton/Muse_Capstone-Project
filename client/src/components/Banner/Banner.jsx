import React, { useState } from 'react'
import './Banner.css'
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SearchDates from '../Search/Search';

function Banner() {
    const history = useHistory();
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className='banner'>
            <div className='banner__search'>
                {showSearch && <SearchDates/>}
                <Button onClick={() => setShowSearch(!showSearch)} className='banner__searchButton' variant='outlined'>
                    {showSearch ? "Hide" : "Search Venues In Your Area"}
                </Button>
            </div>
            <div className='banner__info'>
                <h1>Find more of your Muse </h1>
                <h5>
                    Plan a different kind of getaway.
                </h5>
                <Button onClick={() => history.push('/searchevents')} variant='outlined'>Explore Opportunities</Button>
            </div>
            
        </div>
    )
}

export default Banner