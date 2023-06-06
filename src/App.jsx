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
      const sampleIDs = []
      const newErrorDates = []
      for (let variable in errorDates) {
         for (let index in errorDates[variable].sampleid) {
            sampleIDs.push(errorDates[variable].sampleid[index])
         }
      }
      sampleIDs.forEach(string => {
         let subString = string.substring(string.indexOf("_") + 1)
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
                        {/* <Table title={"All results"} sampleDates={sampleDates} headers={Object.keys(stationResults)}/> */}
                        <Table title={"Analysis Tables"} sampleDates={sampleDates} tableDataType="analysis" />
                        <Table title={"Raw Data"} sampleDates={sampleDates} tableDataType="raw" />
                        <Table title={"PHAB Metrics"} sampleDates={sampleDates} tableDataType="direct" headers={["H_SubNat", "H_AqHab", "PCT_SAFN", "Ev_FlowHab"]} />


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
                        <Table title={"XSlope"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={['Proportion', 'Elevation Difference', 'Length, Segment', 'Slope']} />
                        <Table title={"XBKF_W"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={['Bankfull Height', 'Bankfull Width', 'StationWaterDepth', 'Wetted Width']} />
                        <Table title={"IPI"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["XSLOPE", "h_aqhab", "pct_safn", "xcmg", "ev_flowhab", "xc", "PCT_POOL", "pct_rc"]} />
                        <Table title={"W1_HALL_SWAMP"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["Riparian Bridges/Abutments", "Riparian Buildings", "Riparian Landfill/Trash", "Riparian Logging", "Riparian Mining", "Riparian Orchards/Vineyards", "Riparian Park/Lawn", "Riparian Pasture/Range", "Riparian Pavement", "Riparian Pipes", "Riparian Road", "Riparian Crops", "Riparian Vegetation Management", "Riparian Wall/Dike"]} />
                        <Table title={"ev_flowhab"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["Cascade/Falls", "Glide", "Pool", "Rapid", "Riffle", "Run"]} />
                        <Table title={"h_aqhab"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["Fish Cover Boulders", "Fish Cover Filamentous Algae", "Fish Cover Live Trees/Roots", "Fish Cover Macrophytes", "Fish Cover Overhang.Veg", "Fish Cover Undercut Banks", "Fish Cover Woody Debris <0.3 m", "Fish Cover Woody Debris >0.3 m"]} />
                        <Table title={"h_subnat"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["Substrate Size Class"]} />
                        <Table title={"pct_safn"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["Substrate Size Class"]} />
                        <Table title={"pct_rc"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["Substrate Size Class"]} />
                        <Table title={"pct_pool"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["Pool"]} />
                        <Table title={"xcmg"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["Riparian GroundCover NonWoody Plants", "Riparian GroundCover Woody Shrubs", "Riparian Upper Canopy All Trees"]} />
                        <Table title={"xc"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["Riparian Upper Canopy All Trees"]} />
                        <Table title={"fl_q_m"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["Distance from Bank", "StationWaterDepth fl_q_m", "Velocity"]} />
                        <Table title={"fl_n_m"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={["StationWaterDepth fl_d_m"]} />
                        <Table title={"fl_d_m"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={[""]} />
                        <Table title={"fl_t_m"} station={inputValue} sampleDates={sampleDates} tableDataType="direct" headers={[""]} />

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
