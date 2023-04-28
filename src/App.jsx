import React from 'react';
import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { getData } from './features/stations/stationsService';
import Table from './components/Table/Table';
import TableDisplayTree from './components/TableDisplayTree/TableDisplayTree';

import SampleYearButton from './components/SampleYearButton/SampleYearButton';
import Modal from './components/Modal/Modal';


function App() {

   const dispatch = useDispatch()
   const [inputValue, setInputValue] = useState('105PS0540')

   const [displayMessage, setDisplayMessage] = useState('Search for a station and select a sample year to display results...')
   const [tableTitles, setTableTitles] = useState("")

   const [tableIsLoaded, setTableIsLoaded] = useState(false)

   const stationResults = useSelector(state => state.station.data)
   const showModal = useSelector(state => state.modal.active)



   function handleChange(e) {
      setInputValue(e.target.value)
   }

   const handleClick = (inputValue) => {
      dispatch(getData(inputValue))

   }

   useEffect(() => {
      if (stationResults !== "") {
         setTableTitles(Object.keys(stationResults))
         setTableIsLoaded(true)
      }
   }, [stationResults])

   return (
      <div>
         {showModal ? <Modal /> : ""}
         <div className="App">
            <div className="sidebar">
               <div className="container">
                  <div className="row">
                     <div className="col-md-9">
                        <input type="search" className='form-control search-input' value={inputValue} onChange={handleChange} />
                     </div>
                     <div className="col-md-3">
                        <button className="btn btn-primary" onClick={() => handleClick(inputValue)}>Search</button>
                     </div>
                  </div>
                  <div className="row SampleYearButtonContainer g-1">
                     <SampleYearButton year={2022} />
                     <SampleYearButton year={2021} />
                     <SampleYearButton year={2020} />
                     <SampleYearButton year={2019} />
                     <SampleYearButton year={2018} />
                     <SampleYearButton year={2020} />
                  </div>
                  <TableDisplayTree></TableDisplayTree>
               </div>
            </div>
            <div className="display">
               <div className="container">
                  <div className="row">
                     {tableIsLoaded ?
                        tableTitles.map(tableTitle => {
                           const sampleDates = Object.keys(stationResults[tableTitle])
                           const headers = Object.keys(stationResults[tableTitle][sampleDates[0]])
                           return (
                              <Table title={tableTitle} sampleDates={sampleDates} headers={headers} />
                           )
                        })
                        : <p className='display-message'>{displayMessage}</p>
                     }
                  </div>
               </div>
            </div>
         </div>
      </div>

   );
}

export default App;
