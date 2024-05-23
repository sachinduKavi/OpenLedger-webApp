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
    baseURL: 'https://newsapi.org/v2/everything?q=tesla&from=2024-04-23&sortBy=publishedAt&apiKey=4fb3c55f28c24f0c916f31987ba93ecd'
})



export {temp_domain, header, mainDomain, newsDomain}