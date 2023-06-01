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


function App() {

   const dispatch = useDispatch()

   const displayMessage = 'Search for a station and select a sample year to display results...'
   const [inputValue, setInputValue] = useState('909SWCASR')
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
               if (!allSampleDates.includes(sampleYear) && newDateString != "Invalid Date") {
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
            // if (datatype === "analysis-view" || datatype === "raw-view") {
            //    for (let sample in stationResults[datatype]) {
            //       let newSampleDate;
            //       if (datatype === "analysis-view") {
            //          newSampleDate = stationResults[datatype][sample]["taxsampledate"]
            //       } else if (datatype === "raw-view") {
            //          newSampleDate = stationResults[datatype][sample]["sampledate"]
            //       }
            //       if (!sampleDatesArray.includes(newSampleDate) && newSampleDate >= beginDate && newSampleDate <= endDate) {
            //          sampleDatesArray.push(newSampleDate)
            //       }
            //    }
            // } else {
               Object.keys(stationResults[datatype]).forEach(sampledate => {
                  if (stationResults[datatype][sampledate]) {
                     const sampleDateString = stationResults[datatype][sampledate]
                     const sampleDate = new Date(stationResults[datatype][sampledate])
                     if (!sampleDatesArray.includes(sampleDateString) && sampleDate >= beginDate && sampleDate <= endDate) {
                        sampleDatesArray.push(sampleDateString)
                     }
                  }
               })
            // }
         })
      } else {
         Object.keys(stationResults).forEach(datatype => {
            // if (datatype === "analysis-view" || datatype === "raw-view") {
            //    for (let sample in stationResults[datatype]) {
            //       let newSampleDate;
            //       if (datatype === "analysis-view") {
            //          newSampleDate = new Date(stationResults[datatype][sample]["taxsampledate"])
            //       } else if (datatype === "raw-view") {
            //          newSampleDate = new Date(stationResults[datatype][sample]["sampledate"])
            //       }
            //       if (!sampleDatesArray.includes(newSampleDate)) {
            //          sampleDatesArray.push(newSampleDate)
            //       }
            //    }
            // } else {
               Object.keys(stationResults[datatype]).forEach(sampledate => {
                  if (stationResults[datatype][sampledate]) {
                     const sampleDate = new Date(stationResults[datatype][sampledate]).toUTCString()
                     if (!sampleDatesArray.includes(sampleDate)) {
                        sampleDatesArray.push(sampleDate)
                     }
                  }
               })
               
            // }
         })
         dispatch(getErrorDates(inputValue))
      }
      processedErrorDates.map(date => {
         if (!sampleDatesArray.includes(date)) {
            sampleDatesArray.push(date)
         }
      })
      sampleDatesArray.sort((date1, date2) => new Date(date1) - new Date(date2));
      setSampleDates(sampleDatesArray)
   }

   const handleGetErrorDates = () => {
      const sampleIDs = []
      const newErrorDates = []
      for (let variable in errorDates) {
         for (let index in errorDates[variable].sampleid) {
            sampleIDs.push(errorDates[variable].sampleid[index])
         }
      }
      sampleIDs.map(string => {
         let subString = string.substring(string.indexOf("_")+1)
         subString = subString.substring(0, subString.indexOf("_"))
         const newErrorDate = new Date(subString).toUTCString()
         newErrorDates.push(newErrorDate)
      })
      setProcessedErrorDates(newErrorDates)
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
   }, [stationResults])

   useEffect(() => {
      if (stationResults !== "") {
         getSampleDates(selectedSampleYear)
      }
   }, [selectedSampleYear])

   useEffect(() => {

     handleGetErrorDates()

   }, [errorDates])
   

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
                     {sampleYears != "" ? <SampleYearButton year="View All" /> : ""}
                     {sampleYears != "" ? sampleYears.map(sampleYear => { return <SampleYearButton year={sampleYear} /> }) : ""}
                  </div>
                  <TableDisplayTree />
               </div>
            </div>
            <div className="display">
               <div className="container">
                  {tableIsLoaded ?
                     <div className="row">
                        {/* <Table title={"All results"} sampleDates={sampleDates} headers={Object.keys(stationResults)}/> */}
                        <Table title={"Analysis Tables"} sampleDates={sampleDates} tableDataType="analysis" />
                        <Table title={"Raw Data"} sampleDates={sampleDates} tableDataType="raw" />
                        <Table title={"PHAB Metrics"} sampleDates={sampleDates} tableDataType="direct" headers={["H_SubNat", "H_AqHab", "PCT_SAFN", "Ev_FlowHab"]}/>
                        

                        <Table title={"SQI"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["csci", "asci-d", "chem"]} />
                        <Table title={"CSCI"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["bmi taxonomy", "gis metrics"]} />
                        <Table title={"ASCI-D"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["algae taxonomy", "gis metrics"]} />
                        <Table title={"RSCA"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["csci", "temp chemistry", "specicon chemistry"]} />
                        <Table title={"PHAB"} station={inputValue} sampleDates={sampleDates} errDates={processedErrorDates} tableDataType="direct" headers={["ipi", "ev_flowhab", "ev_flowhab_score", "h_aqhab", "h_aqhab_pred", "h_aqhab_score", "h_subnat", "h_subnat_score", "pct_safn", "pct_safn_pred", "pct_safn_score", "pct_rc", "xcmg", "xcmg_pred", "xcmg_score"]} />
                        <Table title={"CRAM"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["indexscore", "bioticstructure", "bufferandlandscapecontext", "hydrology", "physical structure"]} />
                        <Table title={"Chemistry"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["total p", "total n", "specicon chemistry"]} />
                        <Table title={"Eutrophication"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["total n", "total p", "dissolved oxygen chemistry", "benthic afdm", "benthic chl-a"]} />
                        <Table title={"Temperature"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["temp phab", "XCMG phab", "XCDENMID"]} />
                        <Table title={"Conductivity"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["specicon phab", "chloride", "sulfate", "tds"]} />
                        <Table title={"Habitat"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["H_SubNat", "H_AqHab", "PCT_SAFN", "Ev_FlowHab"]} />
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
