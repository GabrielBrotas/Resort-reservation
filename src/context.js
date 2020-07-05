/* A contextAPI precisa de um provider e um consumer
    Provider vai dizer para quais arquivos a context vai ser disponibilizada, geralmente colocamos no App ou Index
    Context é o conteudo
    Consumer vai ter acesso ao Context
*/
import React, { Component } from 'react'
import items from './data'
const RoomContext = React.createContext();


class RoomProvider extends Component {
    state= {
        rooms: [], // .todos os quartos 
        sortedRooms: [], // quartos filtrados
        featuredRooms: [], 
        loading: true,
    }


    // pegar os items(quartos) quando renderizar a tela
    componentDidMount(){
        let rooms = this.formatData(items)
        let featuredRooms = rooms.filter(room => room.featured === true)
        
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false
        })
    }


    // formatar os quartos
    formatData(items) {
        let tempItems = items.map(item => {
            // id dos itens
            let id = item.sys.id 
            // criar um array para pegar todas as imagens dos quartos
            let images = item.fields.images.map(image => image.fields.file.url)
            // copiar os dados do quarto
            let room = {...item.fields, images, id}

            // retornar todos os quartos em um padrao
            return room
        })
        return tempItems
    }


    // passar o room de acordo com a url
    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room => room.slug === slug))
        return room;
    }


    render() {
        return (
            // value é o valor que vai ser passado para os consumer, nesse caso estamos passando nosso state
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

// consumidor
const RoomConsumer = RoomContext.Consumer

export {RoomProvider, RoomConsumer, RoomContext}
