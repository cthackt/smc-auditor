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
import { queryWebAppsTable } from './features/webapps/webAppsService';
import WebAppCard from './components/WebAppCard/WebAppCard';
import { urlsToIgnore } from './urlsToIgnoreArray';
import ToolTipModal from './components/ToolTipModal/ToolTipModal';
import searchIcon from "./assets/icons8-search-50.png"
import { getAllIds } from './features/stations/stationsService';
import { getSQL } from './features/modal/modalsService';
import { getAuth } from './features/auth/authService';

function App() {

   const dispatch = useDispatch()

   const displayMessage = 'Search for a station...'
   const [inputValue, setInputValue] = useState('SGUT502')
   const [unInput, setUnInput] = useState('smc')
   const [pwInput, setPwInput] = useState('')
   const [sampleYears, setSampleYears] = useState("")
   const [tableIsLoaded, setTableIsLoaded] = useState(false)
   const [sampleDates, setSampleDates] = useState([])
   const [processedErrorDates, setProcessedErrorDates] = useState([])
   const [displayType, setDisplayType] = useState(true)
   const [lastStatusUpdate, setLastStatusUpdate] = useState('')


   const stationResults = useSelector(state => state.station.data)
   const showModal = useSelector(state => state.modal.active)
   const showToolTipModal = useSelector(state => state.modal.tooltipActive)
   const selectedSampleYear = useSelector(state => state.sampleYear.sampleYear)
   const requestPending = useSelector(state => state.station.pending)
   const statusPending = useSelector(state => state.webapps.loading)
   const errorDates = useSelector(state => state.station.errorDates)
   const webAppsStatuses = useSelector(state => state.webapps.statuses)
   const authCheck = useSelector(state => state.auth.check)


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
      setSampleYears(allSampleDates)
   }

   const sampleDatesArray = [];
   const getSampleDates = (year) => {
      if (year) {
         const beginDate = new Date(year, 0, 1)
         const endDate = new Date(year, 11, 31, 23, 59)
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
            if (datatype !== 'conductivity') {
               Object.keys(stationResults[datatype]).forEach(sampledate => {
                  if (stationResults[datatype][sampledate]) {
                     let sampleDate = new Date(stationResults[datatype][sampledate]).toUTCString()
                     if (!sampleDatesArray.includes(sampleDate)) {
                        sampleDatesArray.push(sampleDate)
                     }
                  }
               })
            } else {
               Object.keys(stationResults[datatype]).forEach(sampledate => {
                  if (stationResults[datatype][sampledate]) {
                     let sampleDate = new Date(stationResults[datatype][sampledate])
                     sampleDate.setHours(0, 0, 0)
                     sampleDate = sampleDate.toUTCString()
                     if (!sampleDatesArray.includes(sampleDate)) {
                        sampleDatesArray.push(sampleDate)
                     }
                  }
               })
            }
         })
         console.log("sample dates array: ", sampleDatesArray)
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
      for (let variable in errorDates) {
         for (let index in errorDates[variable].sampledate) {
            dates.push(new Date(errorDates[variable].sampledate[index]).toUTCString())
         }
      }
      setProcessedErrorDates(dates)
   }

   const handleChange = (e) => {
      setInputValue(e.target.value)
   }

   const handleUnChange = (e) => {
      setUnInput(e.target.value)
   }
   const handlePwChange = (e) => {
      setPwInput(e.target.value)
   }

   const handleSearchClick = (inputValue) => {
      dispatch(getData(inputValue))
      dispatch(getAllIds(inputValue))
      dispatch(getSQL())
   }
   const handleCheckStatusClick = () => {
      dispatch(queryWebAppsTable())
   }
   const handleDisplayChangeClick = (display) => {
      setDisplayType(display)
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

   useEffect(() => {
      dispatch(queryWebAppsTable())
   }, [])

   const createLastUpdateTime = (date) => {
      const options = { hour12: true, hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
      const timeString = date.toLocaleTimeString('en-US', options);
      return timeString
   }

   const handleMasterIdClick = () => {
      dispatch(getAllIds(inputValue))
   }

   const handleAuthCheck = (un, pw) => {
      dispatch(getAuth({ un, pw }))
   }


   return (
      <div>
         {requestPending || statusPending ? <Loader /> : ""}
         {showModal ? <Modal /> : ""}
         {showToolTipModal ? <ToolTipModal /> : ""}

         {!authCheck ? (
            <>
               <div className="authContainer">
                  <input className='form-control search-input' value={unInput} onChange={handleUnChange} />
                  <input type='password' className='form-control search-input' value={pwInput} onChange={handlePwChange} />
                  <button className='btn btn-primary' onClick={() => { handleAuthCheck(unInput, pwInput) }}>Submit</button>
               </div>
            </>
         ) : (
            <div className="App">
               <div className="sidebar">
                  <div className="container">
                     <div className="row">
                        <div className="col-md-6">
                           <button className={displayType ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => handleDisplayChangeClick(true)}>Data</button>
                        </div>
                        <div className="col-md-6">
                           <button className={displayType ? 'btn btn-secondary' : 'btn btn-primary'} onClick={() => handleDisplayChangeClick(false)}>Apps</button>
                        </div>
                     </div>
                     {displayType ?
                        <>
                           <br />
                           <div className="row">
                              <div className="col-md-9">
                                 <input type="search" className='form-control search-input' value={inputValue} onChange={handleChange} />
                              </div>
                              <div className="col-md-3">
                                 <button className="btn btn-primary" onClick={() => handleSearchClick(inputValue)}><img src={searchIcon} alt="search" height="18px"></img></button>
                              </div>
                           </div>
                           <div className="row g-1">
                              {sampleYears !== "" ? <SampleYearButton year="View All" /> : ""}
                              {sampleYears !== "" ? sampleYears.map(sampleYear => { return <SampleYearButton year={sampleYear} /> }) : ""}
                           </div>
                           {/* <button className="btn btn-primary" onClick={() => handleGetWebAppsStatus()}>apps request</button> */}
                           <div className='displayTreeContainer'>
                              <TableDisplayTree />
                           </div>
                        </> :
                        <>
                           <div className="apps-sidebar">
                              <div className="row" style={{ 'margin-top': '30vh' }}>
                                 <h4>Last status check: {createLastUpdateTime(new Date(webAppsStatuses[0].date_checked))}</h4>
                              </div>
                              <button className="btn btn-light" onClick={() => handleCheckStatusClick()}>Check status now</button>
                           </div>
                        </>
                     }
                  </div>
               </div>
               <div className="display">
                  <div className="container">
                     {displayType ?
                        <>
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
                        </> :
                        <>
                           <div className="row g-3">
                              {webAppsStatuses.map(app => {
                                 if (!urlsToIgnore.includes(app['url'])) {
                                    return <WebAppCard title={app.application} status={app.status} statusCode={app.status_code} url={app.url} />
                                 }
                              })}
                           </div>
                        </>
                     }
                  </div>
               </div>
            </div>
         )}
      </div>

   );
}

export default App;
