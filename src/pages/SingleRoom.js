import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Banner from '../componentes/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from '../context'
import StyledHero from '../componentes/StyledHero'

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

        // tirar a imagem principal do array
        const [mainImg, ...defaultImg] = images
     
        return ( 
            <>
            <StyledHero img={images[0] || this.state.defaultBcg}>
                <Banner title={`${name} room`}>
                    <Link to="/rooms" className="btn-primary">
                        Back to rooms
                    </Link>
                </Banner>
            </StyledHero>

            <section className="single-room">
                <div className="single-room-images">
                {defaultImg.map((item, index) => {
                    return <img key={index} src={item} alt={name} />
                })}
                </div>
                
            </section>
            </>
        )
    }
}
