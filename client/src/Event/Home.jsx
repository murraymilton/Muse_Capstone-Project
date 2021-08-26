import React from 'react'
import './Home.css';
import Card from '../components/Card/Card';


//We are taking in function and returning our state
const Home = () => {
    return (
        <div className="container-fluid h1 p-5 text-center">
            Landing Home Page 
            <div className='home'>

            <div className='home__section'>
            <Card
                 img="sam.png"
                 title="Seeking Artist For Open Calls"
                 description="Gutarist And All Musicians are welcomed"
                 price="Monthly Gig at $1000"
            />
            <Card
                src="https://unsplash.com/photos/_SUo0bFBMRc"
                title="Seeking Artist For Open Calls"
                description="Gutarist And All Musicians are welcomed"
                price="Monthly Gig at $1000"
            />
            <Card
                 src="https://unsplash.com/photos/_SUo0bFBMRc"
                 title="Seeking Artist For Open Calls"
                 description="Gutarist And All Musicians are welcomed"
                 price="Monthly Gig at $1000"
            />
            </div>
            <div className='home__section'>
            <Card
                 src="https://unsplash.com/photos/_SUo0bFBMRc"
                 title="Seeking Artist For Open Calls"
                 description="Gutarist And All Musicians are welcomed"
                 price="Monthly Gig at $1000"
            />
            <Card
                src="https://unsplash.com/photos/_SUo0bFBMRc"
                title="Seeking Artist For Open Calls"
                description="Gutarist And All Musicians are welcomed"
                price="Monthly Gig at $1000"
            />
            <Card
                src="https://unsplash.com/photos/_SUo0bFBMRc"
                title="Seeking Artist For Open Calls"
                description="Gutarist And All Musicians are welcomed"
                price="Monthly Gig at $1000"
            />
            </div>
        </div>
        </div>
        
    )
};

export default Home;