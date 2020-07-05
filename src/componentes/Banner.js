import React from 'react'

// banner que vai ficar em cima da imagem principal
export default function Banner({children, title, subtitle}) {
    return (
        <div className="banner">
            <h1>{title}</h1>
            <div />
            <p>{subtitle}</p>
            {/* renderizar o que tiver dentro do 'pai' */}
            {children}
        </div>
    )
}
