import React from 'react'
import Banner from '../components/Banner/Banner'
import './Home.css';
import Card from '../components/Card/Card';



const Home = () => {
    return (
        <div className="home">
            <Banner/>
            <div className='home'>

            <div className='home__section'>
            <Card
                 img src="https://images.unsplash.com/photo-1606403528881-70ab29ebeaed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                 title="Seeking Live Bands "
                 description=" "
                 price=""
            />
            <Card
                src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                title="Open Mic Saturday Call"
                description=""
                price=""
            />
            <Card
                 src="https://images.unsplash.com/photo-1557780225-0875e1a6ec22?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                 title="The city of the stars audition"
                 description=""
                 price=""
            />
            </div>
            <div className='home__section'>
            <Card
                 src="https://images.unsplash.com/photo-1585320426283-6599b42b85ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                 title="City Lights Pub seeking bands and solo Acts"
                 description=""
                 price=""
            />
            <Card
                src="https://images.unsplash.com/photo-1619229666372-3c26c399a4cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2250&q=80"
                title="Rock-n-Park Festival"
                description=""
                price=""
            />
            <Card
                src="https://images.unsplash.com/photo-1578730169862-749bbdc763a8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                title="Perform at our wedding venue"
                description=""
                price=""
            />
            </div>
        </div>
        </div>
        
    )
};

export default Home;