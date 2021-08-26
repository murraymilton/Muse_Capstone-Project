import React from 'react'
import { useSelector } from 'react-redux';


//We are taking in function and returning our state
const Home = () => {
    const {user} = useSelector((state) => ({...state}))  
    return (
        <div className="container-fluid h1 p-5 text-center">
            Event List Home{JSON.stringify(user)}
        </div>
    )
};

export default Home;