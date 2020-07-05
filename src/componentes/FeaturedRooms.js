import React, { Component } from 'react'
import {RoomContext} from '../context'
import Loading from './Loading'
import Room from '../componentes/Room'
import Title from './Title'

export default class FeaturedRooms extends Component {

    // para ter acesso ao context
    static contextType = RoomContext

    render() {

        // const value = this.context;
        let {featuredRooms: rooms, loading} = this.context 
        
        // retornar todos os room formatado
        rooms = rooms.map(room => {
            return <Room key={room.id} room={room} />
        })
        
        
        return (
            <section className="featured-rooms">
            
                <Title title="featured rooms" />
                <div className="featured-rooms-center">
                    {/* se estiver carregando mostrar o gif quando terminar mostrar os quartos */}
                    {loading ? <Loading /> : rooms}
                </div>
                

            </section>
            
        )
    }
}
