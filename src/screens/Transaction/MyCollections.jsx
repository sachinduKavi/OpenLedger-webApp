import React, {useEffect, useState} from 'react'
import '../../styles/my-collections.css'
import CollectionModel from '../../dataModels/CollectionDataModel'
import MyBanner from './MyBanner'


export default function MyCollections(props) {

    const [collectionArray, setCollectionArray] = useState([])


    // Loading collection from the backend
    const loadCollections = async () => {
        const collectionArray = await CollectionModel.filterByUser(props.activeUser.getUserId())
        setCollectionArray(collectionArray)
    }


    useEffect(() => {
        loadCollections()
    }, [])

  return (
    <div className='collection-mini-border'>
        
        
        {
            collectionArray.map((element, index) => {
                return(<MyBanner collection={element} key={index} userID={props.activeUser.getUserId()}
                    setCurrentPayment={props.setCurrentPayment}
                />)
            })
        }
       
    </div>
  )
}
