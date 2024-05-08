import axios from "axios"

// https://openledgers.netlify.app/


const temp_domain = axios.create({
    baseURL: "http://127.0.0.1:3500"
})

const mainDomain = axios.create({
    baseURL: 'https://fair-blue-goose-toga.cyclic.app'
})

// const temp_domain = "http://192.168.8.167:3000/"

const header = {
    header: {'Content-Type':'application/json'}
}



export {temp_domain, header, mainDomain}