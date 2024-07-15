import axios from "axios"
import { linkWithCredential } from "firebase/auth"

// https://openledgers.netlify.app/


// const temp_domain = axios.create({
//     baseURL: "http://localhost:3500"
// })

const temp_domain = axios.create({
    baseURL: "https://openledger-backend.onrender.com"
})

const mainDomain = axios.create({
    baseURL: 'https://fair-blue-goose-toga.cyclic.app'
})

// const temp_domain = "http://192.168.8.167:3000/"

const header = {
    header: {'Content-Type':'application/json'},
    withCredentials: true
}

const newsDomain = axios.create({
    baseURL: 'https://newsdata.io/api/1/news?apikey=pub_448216a127f4ad53970cf4faa51c75ef600c1&q=finance&language=en&category=business'
})



export {temp_domain, header, mainDomain, newsDomain}