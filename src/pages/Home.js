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
            <Banner title="Pousadas de Luxo" subtitle="Quartos de luxo a partir de R$299">
                <Link to="/rooms" className="btn-primary">
                    Nossos quartos
                </Link>
            </Banner>
        </Hero>
        <Services />
        <FeturedRooms />

        </>
    )
}

export default Home
