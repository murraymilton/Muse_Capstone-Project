import React, { useState } from 'react'
import './Banner.css'
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";


function Banner() {
    const history = useHistory();
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className='banner'>
            <div className='banner__search'>

                <Button onClick={() => setShowSearch(!showSearch)} className='banner__searchButton' variant='outlined'>
                    {showSearch ? "Hide" : "Search Dates"}
                </Button>
            </div>
            <div className='banner__info'>
                <h1>Find Your Next You</h1>
                <h5>
                    Plan a different kind of getaway.
                </h5>
                <Button onClick={() => history.push('/search')} variant='outlined'>Explore Oppurtunities</Button>
            </div>
        </div>
    )
}

export default Banner