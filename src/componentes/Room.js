import React from 'react'
import {Link} from 'react-router-dom'
import defaultImg from '../images/room-1.jpeg'

// PropTypes vai servir para validação
import PropTypes from 'prop-types'


export default function Room({room}) {
    const {name, slug, images, price} = room;

    return (
        <article className="room">
            <div className="img-container">
                <img src={images[0] || defaultImg} alt="single room"></img>
                <div className="price-top">
                    <h6>${price}</h6>
                    <p>per night</p>
                </div>
                <Link to={`/rooms/${slug}`} className="btn-primary room-link">Features</Link>
            </div>
            <p className="room-info">{name}</p>
        </article>
    )
}

// aqui vamos checar as props da função Room
Room.prototype ={
    // Room tem a props room e vamos verificiar se ele tem o formato de um objeto 'shape({})' e se dentro desse objeto vai ter os dados 'name' do tipo string, 'image' do tipo array de strings 'arrayOf()', etc.
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        image: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired,

    })
}