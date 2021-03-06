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

    // disponibilizar os dados da Context para essa pagina
    static contextType = RoomContext

    render() {
        // acessar os dados da context
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
                <div className="single-room-info">
                    <article className="desc">
                        <h3>Detalhes</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info"> 
                        <h3>informações</h3>
                        <h6>preço: R${price}</h6>
                        <h6>tamanho: ${size}</h6>
                        <h6>
                            capacidade maxima: {
                                capacity > 1 ? `${capacity} pessoa` :
                                `${capacity} pessoas` 
                            }
                        </h6>
                        <h6>
                            {pets ? "Animais permitidos" : "Animais não permitido"}
                        </h6>
                        <h6>{breakfast && "free breakfast included"}</h6>
                    </article>
                </div>
            </section>
            <section className="room-extras">
                <h6>extras</h6>
                <ul className="extras">
                    {extras.map((item,index) => {
                        return <li key={index}>
                            - {item}
                        </li>
                    })}
                </ul>
            </section>
            </>
        )
    }
}
