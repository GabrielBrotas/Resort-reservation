import React from 'react'
import {Link} from 'react-router-dom'


import Hero from '../componentes/Hero'
import Banner from '../componentes/Banner'
import RoomContainer from '../componentes/RoomContainer'      


const Rooms = () => {
    return (
    <>
    <Hero hero="roomsHero">
        <Banner title="Nossos quartos">
            <Link to ="/" className="btn-primary">
                Retornar
            </Link>
            
        </Banner>
    </Hero>
    <RoomContainer />
    </>
    )
}

export default Rooms
