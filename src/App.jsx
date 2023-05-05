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

   const displayMessage ='Search for a station and select a sample year to display results...'
   const [tableTitles, setTableTitles] = useState("")
   const [inputValue, setInputValue] = useState('105PS0540')
   const [sampleYears, setSampleYears] = useState("")
   const [tableIsLoaded, setTableIsLoaded] = useState(false)
   const [sampleDates, setSampleDates] = useState([])

   const stationResults = useSelector(state => state.station.data)
   const showModal = useSelector(state => state.modal.active)
   const selectedSampleYear = useSelector(state => state.sampleYear.sampleYear)

   const createSampleYearButtons = () => {
      const allSampleDates = [];
      const datatypes = Object.keys(stationResults)
      datatypes.forEach(datatype => {
         const sampleDates = stationResults[datatype]
         if (sampleDates[0]) {
            sampleDates.forEach(sampleDate => {
               const sampleYear = sampleDate.substring(11, 16)
               if (!allSampleDates.includes(sampleYear)) {
                  allSampleDates.push(sampleYear)
               }
            })
         }
      })
      allSampleDates.sort(function(a, b){return b-a})
      console.log(allSampleDates);
      setSampleYears(allSampleDates)
   }

   const handleChange = (e) => {
      setInputValue(e.target.value)
   }

   const handleSearchClick = (inputValue) => {
      dispatch(getData(inputValue))
   }

   useEffect(() => {
      if (stationResults !== "") {
         createSampleYearButtons()
         getSampleDates()
         setTableTitles(Object.keys(stationResults))
         setTableIsLoaded(true)
      }
   }, [stationResults])

   const sampleDatesArray = [];

   const getSampleDates = () => {
      Object.keys(stationResults).forEach(datatype => {
         Object.keys(stationResults[datatype]).forEach(sampledate => {
            if (stationResults[datatype][sampledate]) {
               const sampleDate = stationResults[datatype][sampledate]
               if (!sampleDatesArray.includes(sampleDate)) {
                  sampleDatesArray.push(sampleDate)
               }
            }
         })
      });
      sampleDatesArray.sort((date1, date2) => new Date(date1).setHours(0, 0, 0, 0) - new Date(date2).setHours(0, 0, 0, 0));
      setSampleDates(sampleDatesArray)
      console.log(sampleDatesArray);
   }

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
                        <button className="btn btn-primary" onClick={() => handleSearchClick(inputValue)}>Search</button>
                     </div>
                  </div>
                  <div className="row SampleYearButtonContainer g-1">
                     {sampleYears != "" ? sampleYears.map(sampleYear => {return <SampleYearButton year={sampleYear} />}) : ""}
                  </div>
                  <TableDisplayTree />
               </div>
            </div>
            <div className="display">
               <div className="container">
                  
                  <div className="row">
                     {tableIsLoaded ?
                        <Table title={"All results"} sampleDates={sampleDates} headers={Object.keys(stationResults)}/>
                        // tableTitles.map(tableTitle => {
                        //    const allSampleDates = Object.keys(stationResults[tableTitle])
                        //    let selectedSampleDates = []
                        //    allSampleDates.forEach(date => {
                        //       if (date.substring(0,4) == selectedSampleYear) {
                        //          selectedSampleDates.push(date)
                        //       }
                        //    })
                        //    const headers = Object.keys(stationResults[tableTitle][allSampleDates[0]])
                        //    return (
                        //       <Table title={tableTitle} sampleDates={selectedSampleDates} headers={headers} />
                        //    )
                        // })
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
