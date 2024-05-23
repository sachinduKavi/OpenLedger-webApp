import {newsDomain, header} from '../middleware/API'

const getNews = async () => {
    const response = await newsDomain.get()
    console.log(response)
}


export {getNews}