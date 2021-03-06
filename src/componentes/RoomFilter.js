import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../context'
import Title from '../componentes/Title'

// get all unique values
const getUnique = (items, value) => {
    // retornar um novo array(Set é um tipo de array) que só aceita valores unicos
    return [...new Set(items.map(item => item[value]))]
} 

export default function RoomFilter({rooms}) {

    // pegar o RoomContext via hook
    const context = useContext(RoomContext)
    const {handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets} = context

    // para todos os quartos pegar o valor unico do 'type' para colocar no select os valores unicos
    let types = getUnique(rooms, 'type')
    // incluir 'all' na lista, ou seja, quando nao tiver filtros 
    types = ['all', ...types]
    
    // map to jsx
    types = types.map((item,index) => {
        return <option key={index} value={item}>{item}</option>
    })
    

    // pelos quartos procurar peelas capacity
    let people = getUnique(rooms, 'capacity')
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    }) 

    return (
        <section className="filter-container">
            <Title title="Procurar quartos" />
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">Tipo</label>
                    <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                        {types}
                    </select>
                </div>
                {/* end select type */}
                {/* guests */}
                <div className="form-group">
                    <label htmlFor="capacity">Convidados</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                        {people}
                    </select>
                </div>
                {/* end select type */}

                {/* room price */}
                <div className="form-group">
                    <label htmlFor="price">Preço R${price}</label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control" />
                </div>

                {/* end of room price */}

                {/* size */}
                <div className="form-group">
                    <label htmlFor="size">Tamanho</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange} className="size-input"/>
                        <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} className="size-input"/>
                    </div>
                </div>
                {/* end of size */}
                {/* extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                        <label htmlFor="breakfast">Café da manhã</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                        <label htmlFor="pets">Animais</label>
                    </div>
                </div>
                {/* end of extras */}
            </form>
        </section>
    )
}
