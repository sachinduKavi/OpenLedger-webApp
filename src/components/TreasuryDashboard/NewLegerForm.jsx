import React, {useState, useContext, useEffect} from 'react'
import {ConfigProvider, Input, InputNumber, Switch} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'
import PlusIcon from '../../assets/icons/plus.png'
import {motion, AnimatePresence} from 'framer-motion'
import Evidence from '../../dataModels/Evidence'
import EvidenceTitle from './EvidenceTitle'
import LedgerRecordModel from '../../dataModels/LedgerRecordModel'
import { SessionContext } from '../../Session'
import {generateCurrentDateTime} from '../../middleware/GenerateCurrentDateTime'
import {createLedgerRecord, getLegerCategories} from '../../query/ledgerQuery'
import SearchResult from '../Treaasury/SearchResult'
import SingleLedger from './SingleLedger'
import {capitalize} from '../../middleware/auth'

export default function NewLegerForm(props) {
  // Include global session data
  let [ledgerCategoriesAll, setLedgerCategoriesAll] = useState([])
  const sessionContext = useContext(SessionContext)
  const changeSessionData = sessionContext.changeSessionData
  // Evidence state of the window
  const [evidenceState, toggleEvidenceState] = useState(false)
  const [positiveRecord, changePositiveRecord] = useState(true)

  // error State of the input boxes 
  const [inputErrorState, setInputState] = useState({
    title: false,
    description: false,
    amount: false
  })

  // User entered values 
  const [newRecord, setNewRecord] = useState({
    title: '',
    description: '',
    category: '',
    amount: 0
  })

  // Search results visibility 
  const [searchResultsState, setSearchResultState] = useState(false)

  // Leger record categories
  const [ledgerCategoriesFilter, setCategories] = useState(ledgerCategoriesAll)
  
  // Fetch type of categories from the database 
  const loadCategories = async () => {
    const response = await getLegerCategories()
    if(response.status === 200 && response.data.procedure) {
      // Successful response
      const content = response.data.content
      setLedgerCategoriesAll(content)
      setCategories(content)
    }
  }

  // Filtering ledger categories
  const filterLedgerCategories = (inputValue) => {
    console.log('filter', ledgerCategoriesAll)
    let tempArray = []
    if(inputValue !== "") {

      ledgerCategoriesAll.forEach(element => {
        if(element.toUpperCase().includes(inputValue.toUpperCase())) {
          tempArray.push(element)
        }
      })
      setCategories(tempArray)
    } else {
      setCategories(ledgerCategoriesAll)
    }
    console.log('input value', inputValue)
    
  }

  // Component did mount ?
  useEffect(() => {
    loadCategories()
  }, [])

  // Evidence array 
  const [evidenceArray, changeEvidenceArray] = useState([])
  // Add new evidence to the evidence array and display the evidence prompt function
  const createNewEvidence = (evidenceObj) => {
    // console.log('return object ', evidenceObj)
    if(evidenceObj.getDescription() !== "" || evidenceObj.getImageFile() !== null) {
      // Incrementing evidence array
      changeEvidenceArray([...evidenceArray, evidenceObj])
    }
    
    toggleEvidenceState(false) // Closing evidence pop up window

  }


  // Check whether all the input fields are filled 
  const checkInputValidity = () => {
    let state = false
    if (newRecord.title === "") setInputState({...inputErrorState, title: true}) 
      else {
        setInputState({...inputErrorState, title: false}) 
        state = true
      }
    if (newRecord.description === "") setInputState({...inputErrorState, description: true})
      else {
        setInputState({...inputErrorState, description: false}) 
        state = true
      }

    if (newRecord.amount === "") setInputState({...inputErrorState, amount: true})
      else {
        setInputState({...inputErrorState, amount: false}) 
        state = true
      }

    return state
  }


  // User clicks on the create record button 
  const onSubmission = async () => {
    changeSessionData({processing: true}) // Processing effect
    if(checkInputValidity()) { 
      // Creating new LedgerRecord instant
      let signAmount
      if (positiveRecord) // Change the sign of the ledger amount 
        signAmount = newRecord.amount/1
      else 
        signAmount = newRecord.amount/-1

      
      // Creating Ledger Record instant  
      const ledgerRecord = new LedgerRecordModel({...newRecord, evidenceArray: evidenceArray, treasuryID: props.treasury.getTreasuryID(), amount: signAmount, createdDate: generateCurrentDateTime()}) 
      await ledgerRecord.uploadEvidenceImages() // Trigger to upload images to the firebase
      // Send post request to the backend with the ledger record data
      const response = await createLedgerRecord(ledgerRecord.extractJSON())
      console.log('Response ', response)
      if(response.data.procedure) {
        // Record created successfully

        
      } else {
        // Error ocurred Record is not created

      }

    } else {
      // All user inputs are not filled to proceed the process
      console.log('Invalid input')
    }
    props.loadLedgers() // Refresh ledger 

    // updating treasury object 
    await props.treasury.refreshTreasuryDetails()
    console.log('treasury update before')

    changeSessionData({processing: false}) // Switch off global processing
    props.closeForm(false) // close the form
  }


  return (
    <div className='ledger-form-overlay'>
      <div className="background-blur"></div>

      <motion.div className="form-content"
        initial={{scale: 0}}
        animate={{scale: 1}}
        exit={{scale: 0}}
      >
          <div className="new-form-ledger">

            <div className='title-row'>
              <h2>CREATE NEW LEDGER RECORD</h2>

      
            </div>


            <div className="ledger-content-new">
              <label>Title: </label>
              <PrimaryBorder borderRadius='6px' width='50%'>
                <Input status={inputErrorState.title? 'error' : ''} onChange={(e) => {setNewRecord({...newRecord, title: capitalize(e.target.value)})}} value={newRecord.title}/>
              </PrimaryBorder>
              
            </div>

            <div className="ledger-content-new">
              <label>Description: </label>
              <PrimaryBorder borderRadius='6px' width='100%'>
                <Input status={inputErrorState.description? 'error' : ''} onChange={(e) => {setNewRecord({...newRecord, description: capitalize(e.target.value)})}}/>
              </PrimaryBorder>
              
            </div>

            <div className="ledger-content-new">

              <label htmlFor="">Category</label>



            {/* Search bar which will display all the ledger categories as suggestions  */}
            <div className="category-search-box" style={{width: '250px'}}>
              <PrimaryBorder borderRadius='6px'>
                <Input id='category-input' value={newRecord.category}
                autoComplete='off'
                onChange={(e) => {
                  setNewRecord({...newRecord, category: capitalize(e.target.value)})
                  filterLedgerCategories(e.target.value.trim())
                }}
                onFocus={() => {
                  setSearchResultState(true)
                }}
                  onBlur={async () => {
                    setTimeout(() => {
                      setSearchResultState(false)
                    }, 500)
                  }}
                />
              </PrimaryBorder>
              
              {searchResultsState && <div className="category-search-results">
                {ledgerCategoriesFilter.map((element, index) => <SearchResult key={index} setNewRecord={setNewRecord} newRecord={newRecord}>{element}</SearchResult>)}
              </div>}





                </div>
            </div>
            
            <div className="ledger-content-new">
            <label>Amount: </label>
              <div className="amount-container">
                <PrimaryBorder borderRadius='6px' width='140px'>
                  <Input status={inputErrorState.amount? 'error' : ''} onChange={(e) => {setNewRecord({...newRecord, amount: e.target.value})}} />
                </PrimaryBorder>

                <ConfigProvider theme={{
                  token: {
                    handleSize: 20,
                    colorPrimary: positiveRecord ? '#6CDB9A' : 'red'
                  }
                }}>
                  <Switch value={positiveRecord} onChange={() => {changePositiveRecord(!positiveRecord)}}/>

                  {positiveRecord ? <h3 style={{color: '#6CDB9A'}}>DEBIT RECORD</h3>
                                  : <h3 style={{color: 'red'}}>CREDIT RECORD</h3>}
                </ConfigProvider>
                
              </div>
              
            </div>



            {/* Add evidence to the ledger record */}
            <label>Add Evidence:</label>
            
            <div className="evidence-container">

                {/* Here user can see the evidence listed by them  */}
                {evidenceArray.map((element, index) => {
                  return(<div className="add-btn" key={index} style={{overflow: 'hidden'}}>
                  {(element.getImageFile() !== null) && <img src={URL.createObjectURL(element.getImageFile())} alt="Loading" height='120%'/>}
                </div>)
                })}
      
                <motion.div className="add-btn"
                  whileTap={{scale: 0.8, transition: {duration: 0.1}}}
                  onClick={() => {toggleEvidenceState(!evidenceState)}}
                >
                  <img src={PlusIcon} alt="plus-icon" width='70%'/>
                </motion.div>
              
            </div>



              <div className="submission">
                <button style={{flexGrow: 1, margin: '5px'}} onClick={onSubmission}>CREATE</button>
                <button style={{border: '2px solid red', flexGrow: 1, margin: '5px'}}
                onClick={() => {props.closeForm(false)}}
                >CANCEL</button>
              </div>

            <AnimatePresence>
              {evidenceState && <EvidenceTitle createNew={createNewEvidence} toggleClose={toggleEvidenceState}/>}
            </AnimatePresence>
            
          </div>
      </motion.div>
    </div>
  )
}
