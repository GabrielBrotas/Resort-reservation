import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Hero from '../componentes/Hero'
import Banner from '../componentes/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from '../context'


export default class SingleRoom extends Component {

    constructor(props){
        super(props)
        this.state ={ 
            // pegar o slug passado pelo parametro
            slug: this.props.match.params.slug,
            defaultBcg
        }
    }

    // pegar os dados da Context
    static contextType = RoomContext

    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug)

        if(!room){
            return <div className="error">
                <h3>no such room could be found</h3>
                <Link to="/rooms" className="btn-primary">Go back</Link>
            </div>
        }
        const {name, description, capacity, size, price, extras, breakfast, pets, images} = room
        return ( 
            <Hero hero="roomsHero">
                <Banner title={`${name} room`}>
                    <Link to="/rooms" className="btn-primary">
                        Back to rooms
                    </Link>
                </Banner>
            </Hero>
        )
    }
}
