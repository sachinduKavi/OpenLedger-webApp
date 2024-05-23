import {newsDomain, header} from '../middleware/API'

const getNews = async () => {
    return await newsDomain.get()
   
}


export {getNews}