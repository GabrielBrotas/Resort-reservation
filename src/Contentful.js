import {createClient} from 'contentful'

console.log(process.env)

// criar client do Contentful para ter acesso aos dados
export default createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
})