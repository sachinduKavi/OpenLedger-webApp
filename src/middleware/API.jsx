import axios from "axios"

// https://openledgers.netlify.app/


const temp_domain = axios.create({
    baseURL: "http://localhost:3500"
})

const mainDomain = axios.create({
    baseURL: 'https://fair-blue-goose-toga.cyclic.app'
})

// const temp_domain = "http://192.168.8.167:3000/"

const header = {
    header: {'Content-Type':'application/json'}
}

const newsDomain = axios.create({
    baseURL: 'https://api.thenewsapi.com/v1/news/headlines?locale=us&language=en&api_token=O1sbmmEfLxLyQuInCmIu6RbRSqazOpRftShmXOY0'
})



export {temp_domain, header, mainDomain, newsDomain}