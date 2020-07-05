import React, { Component } from 'react'
import {RoomContext} from '../context'
import Loading from './Loading'
import Room from '../componentes/Room'

export default class FeaturedRooms extends Component {

    // para ter acesso ao context
    static contextType = RoomContext

    render() {

        // const value = this.context;
        const {featuredRooms: rooms} = this.context
        console.log(rooms)
        
        
        return (
            <div>
                <Room />
                <Loading />
            </div>
            
        )
    }
}
