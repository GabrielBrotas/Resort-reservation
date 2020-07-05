import React from 'react'
import {Link} from 'react-router-dom'

// components
import Hero from '../componentes/Hero'
import Banner from '../componentes/Banner'
import Services from '../componentes/Services'
import FeturedRooms from '../componentes/FeaturedRooms'

const Home = () => {
    return (
        <>
        <Hero>
            <Banner title="luxurious rooms" subtitle="deluxe rooms starting at $299">
                <Link to="/rooms" className="btn-primary">
                    Our Rooms
                </Link>
            </Banner>
        </Hero>
        <Services />
        <FeturedRooms />
        </>
    )
}

export default Home
