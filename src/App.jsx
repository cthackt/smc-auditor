import React from 'react';
import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { getData, getErrorDates } from './features/stations/stationsService';
import Table from './components/Table/Table';
import TableDisplayTree from './components/TableDisplayTree/TableDisplayTree';
import SampleYearButton from './components/SampleYearButton/SampleYearButton';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';
import metricsModules from './metricsModules';

function App() {

   const dispatch = useDispatch()

   const displayMessage = 'Search for a station and select a sample year to display results...'
   const [inputValue, setInputValue] = useState('SGUT502')
   const [sampleYears, setSampleYears] = useState("")
   const [tableIsLoaded, setTableIsLoaded] = useState(false)
   const [sampleDates, setSampleDates] = useState([])
   const [processedErrorDates, setProcessedErrorDates] = useState([])

   const stationResults = useSelector(state => state.station.data)
   const showModal = useSelector(state => state.modal.active)
   const selectedSampleYear = useSelector(state => state.sampleYear.sampleYear)
   const requestPending = useSelector(state => state.station.pending)
   const errorDates = useSelector(state => state.station.errorDates)

   const createSampleYearButtons = () => {
      const allSampleDates = [];
      const datatypes = Object.keys(stationResults)
      datatypes.forEach(datatype => {
         const sampleDates = stationResults[datatype]
         if (sampleDates[0]) {
            sampleDates.forEach(sampleDate => {
               const newDateString = new Date(sampleDate).toDateString()
               const sampleYear = newDateString.substring(11, 15)
               if (!allSampleDates.includes(sampleYear) && newDateString !== "Invalid Date") {
                  allSampleDates.push(sampleYear)
               }
            })
         }
      })
      allSampleDates.sort(function (a, b) { return b - a })
      console.log(allSampleDates)
      setSampleYears(allSampleDates)
   }

   const sampleDatesArray = [];
   const getSampleDates = (year) => {
      if (year) {
         const beginDate = new Date(year, 0, 1)
         const endDate = new Date(year, 11, 31, 23, 59)
         console.log("begin date: ", beginDate, " end date: ", endDate)
         Object.keys(stationResults).forEach(datatype => {
            Object.keys(stationResults[datatype]).forEach(sampledate => {
               if (stationResults[datatype][sampledate]) {
                  const sampleDateString = stationResults[datatype][sampledate]
                  const sampleDate = new Date(stationResults[datatype][sampledate])
                  if (!sampleDatesArray.includes(sampleDateString) && sampleDate >= beginDate && sampleDate <= endDate) {
                     sampleDatesArray.push(sampleDateString)
                  }
               }
            })
         })
         dispatch(getErrorDates(inputValue))
         processedErrorDates.forEach(date => {
            if (!sampleDatesArray.includes(date) && date >= beginDate && date <= endDate) {
               sampleDatesArray.push(date)
            }
         })
      } else {
         Object.keys(stationResults).forEach(datatype => {
            Object.keys(stationResults[datatype]).forEach(sampledate => {
               if (stationResults[datatype][sampledate]) {
                  const sampleDate = new Date(stationResults[datatype][sampledate]).toUTCString()
                  if (!sampleDatesArray.includes(sampleDate)) {
                     sampleDatesArray.push(sampleDate)
                  }
               }
            })
         })
         dispatch(getErrorDates(inputValue))
         processedErrorDates.forEach(date => {
            if (!sampleDatesArray.includes(date)) {
               sampleDatesArray.push(date)
            }
         })
      }
      sampleDatesArray.sort((date1, date2) => new Date(date1) - new Date(date2));
      setSampleDates(sampleDatesArray)
   }

   const handleGetErrorDates = () => {
      const dates = []
      const newErrorDates = []
      for (let variable in errorDates) {
         for (let index in errorDates[variable].sampledate) {
            dates.push(new Date(errorDates[variable].sampledate[index]).toUTCString())
         }
      }
      console.log('dates: ', dates)
      setProcessedErrorDates(dates)
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
         setTableIsLoaded(true)
         
      }
   }, [stationResults]) // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      if (stationResults !== "") {
         getSampleDates(selectedSampleYear)
      }
   }, [selectedSampleYear]) // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {

      handleGetErrorDates()

   }, [errorDates]) // eslint-disable-line react-hooks/exhaustive-deps


   return (
      <div>
         {requestPending ? <Loader /> : ""}
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
                     {sampleYears !== "" ? <SampleYearButton year="View All" /> : ""}
                     {sampleYears !== "" ? sampleYears.map(sampleYear => { return <SampleYearButton year={sampleYear} /> }) : ""}
                  </div>
                  <TableDisplayTree />
               </div>
            </div>
            <div className="display">
               <div className="container">
                  {tableIsLoaded ?
                     <div className="row">
                        {Object.keys(metricsModules).map(key => {
                           const hasErrorHandling = ['SQI', 'PHAB', 'ASCI-D', '']
                           if (hasErrorHandling.includes(key)) {
                              return <Table title={key} station={inputValue} sampleDates={sampleDates} errDates={processedErrorDates} headers={metricsModules[key]} />
                           } else {
                              return <Table title={key} station={inputValue} sampleDates={sampleDates} headers={metricsModules[key]} />
                           }
                        })}
                     </div>
                     : <div className="row"><p className='display-message'>{displayMessage}</p></div>
                  }
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
