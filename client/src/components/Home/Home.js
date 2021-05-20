import React from 'react'
import { Link } from "react-router-dom"
import "./Home.css"

const Home = () => {
    return (
        <div className="home">
            <div className="circle green"></div>
            <div className="home__info">
                <p>
                    Create
                    <br/>
                    Explore
                    <br/>
                    Share
                    <br/>
                    Templates
                </p>
            </div>
            <div className="home__desc">
                <p className="home__descParagraph">Plat is a platform where you can share html templates and decorates it with css, also you can get templates and edit it for use to your projects.<br/>Templates in plat has the objective to get a fast  design for a static web project. in plat you can download the html and css files of the template who you choose. </p>
                <div className="home__links">
                    <Link to="/explore" className="home__linkButton">
                        <p>Explore Now</p> 
                    </Link>
                    <Link to="/create" className="home__linkButton">
                        <p>Create Now</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
