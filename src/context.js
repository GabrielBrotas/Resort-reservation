/* A contextAPI precisa de um provider e um consumer
    Provider vai dizer para quais arquivos a context vai ser disponibilizada, geralmente colocamos no App ou Index
    Context é o conteudo
    Consumer vai ter acesso ao Context
*/
import React, { Component } from 'react'
import items from './data'
import Client from './Contentful'

const RoomContext = React.createContext();


class RoomProvider extends Component {
    state= {
        rooms: [], // .todos os quartos 
        sortedRooms: [], // quartos filtrados
        featuredRooms: [], 
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }

    // getData from Contentful
    getData = async () => {
        try{
            let response = await Client.getEntries({
                content_type: 'beachResortRoom',
                order: "sys.createdAt"
            })

            let rooms = this.formatData(response.items)
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));
            
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize, 

            })
        } catch(err) {
            console.log(err)
        }
    }

    // pegar os items(quartos) quando renderizar a tela
    componentDidMount(){
        this.getData()
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

    handleChange = event => {
        const target = event.target
        // o valor vai ser dinamico, caso seja checkbox vai pegar checeked caso nao vai pegar o valor do campo
        const value = target.type === "checkbox" ? target.checked : target.value
        // vai pegar qualquer que seja o name do campo (breakfast, type, price..)
        const name = event.target.name
        this.setState({
            [name]: value
        }, this.filterRooms)
    }

    filterRooms = () => {
       let {
           rooms, type, capacity, price, minSize, maxSize, breakfast, pets 
       } = this.state
       
       // all the rooms
       let tempRooms = [...rooms];
       // transform value
       capacity = parseInt(capacity)
       // price
       price = parseInt(price)

       //filter by type
       if(type !== 'all'){
        //    retornar os quartos que o quarto for igual ao type escolhido
           tempRooms = tempRooms.filter(room => room.type === type)
       }
       
       // filter by capacity
       if(capacity !== 1){
           // retornar os quartos que são maior ou igual a capacidade escolhida
           tempRooms = tempRooms.filter(room => room.capacity >= capacity)
       }

       // filter by price
       tempRooms = tempRooms.filter(room => room.price <= price)

       // filter by sizes
       tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

       //filter by breakfast
       if(breakfast){
           tempRooms = tempRooms.filter(room => room.breakfast === true)
       }

       //filter by pets
       if(pets){
           tempRooms = tempRooms.filter(room => room.pets === true)
       }
       // change state
       this.setState({
           sortedRooms: tempRooms
       })
    }

    render() {
        return (
            // value é o valor que vai ser passado para os consumer, nesse caso estamos passando nosso state
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

// consumidor
const RoomConsumer = RoomContext.Consumer

// passando o consumer para o componente dentro dessa função
export function withRoomConsumer(Component) {
    // as props vem do componente, pois quando retornar essa função vamos querer manter essas props
    return props => {
        // vai passar para o Component dentro de 'withRoomConsumer' todo o context passando pela props (context={value})
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}
export {RoomProvider, RoomConsumer, RoomContext}
