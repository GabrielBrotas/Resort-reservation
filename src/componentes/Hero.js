import React from 'react'

//Hero é a imagem principal, por padrao vai ser a imagem 'defaultHero' caso nao passe a props pelo 'pai'
export default function Hero({children, hero}) {
    return (
        <div>
            <header className={hero}>
                {children}
            </header>
        </div>
    )
}

Hero.defaultProps = {
    hero: "defaultHero"
}
