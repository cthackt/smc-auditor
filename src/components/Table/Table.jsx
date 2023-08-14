import React from 'react'
import { useState } from 'react'
import './Table.css'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../../features/modal/modalsSlice'
import { getErrors, getSampleInfo, getDbTableData, getColumnsData } from '../../features/modal/modalsService';
import { display, hide } from '../../features/tables/tablesSlice'
import closeIcon from '../../assets/close.png'
import resizeIcon from '../../assets/icons8-resize-32.png'
import minimizeIcon from '../../assets/icons8-minimize.png'
import tooltip from '../../assets/icons8-info-48.png'
import { showToolTipModal, setBigTableActive } from '../../features/modal/modalsSlice'

import metricsModules from '../../metricsModules';
import { keyToTables } from '../../keyToTables'


export default function Table(props) {

   const stationID = props.station
   const title = props.title
   const headers = props.headers
   const sampleDates = props.sampleDates
   const errDates = props.errDates

   const [bigTable, setBigTable] = useState(false)

   const stationResults = useSelector(state => state.station.data)
   const errorData = useSelector(state => state.station.errorDates)
   const displayTheTable = useSelector(state => state.tables[title])
   const tables = useSelector(state => state.tables)

   const [tableStateSave, setTableStateSave] = useState([])

   const dispatch = useDispatch();

   const handleStatusButtonClick = async (header, sampleDate) => {
      await dispatch(getSampleInfo([stationID, sampleDate, header]))
      await dispatch(getDbTableData([stationID, sampleDate, header]))
      await dispatch(getErrors([stationID, sampleDate, header]))
      dispatch(showModal())
   }

   const handleCloseClick = () => {
      dispatch(display(title))
   }
   
   const handleResizeClickBig = () => {
      let currentTables = []
      setTableStateSave([])
      for (let key in tables) {
         if (key !== title && tables[key] === true) {
            if (tables[key] == true) {
               currentTables.push(key)
            }
            dispatch(hide(key))
         }
      }
      setTableStateSave(currentTables)
      setBigTable(true)
      dispatch(setBigTableActive())
   }
   const handleResizeClickSmall = () => {
      tableStateSave.forEach(key => {
         dispatch(display(key))
      })
      setBigTable(false)
      dispatch(setBigTableActive())
   }

   const handleInfoClick = () => {
      for (let key in metricsModules[title]) {
         let column = metricsModules[title][key]
      }

      let columnData = {};

      for (let columnName in metricsModules[title]) {
         columnData['tableName'] = title;
         columnData[metricsModules[title][columnName]] = keyToTables[metricsModules[title][columnName]];
      }

      dispatch(getColumnsData(columnData))
      dispatch(showToolTipModal())
   }

   if (displayTheTable) {
      return (
         <div className={bigTable ? 'bigTableContainer' : 'tableContainer'}>
            <div className="tableHeader">
               <h4>{title.toUpperCase()}</h4>
               <img src={tooltip} alt="tooltip icon" height='25px' onClick={handleInfoClick} />
            </div>
            <div className={bigTable ? 'bigContainerBody' : 'containerBody'}>
               {bigTable ?
                  <div className='tableMinimizeButton' onClick={handleResizeClickSmall}><img src={minimizeIcon} alt="close table" height={'30px'}></img></div>
                  :
                  <>
                     <div className='tableCloseButton' onClick={handleCloseClick}><img src={closeIcon} alt="close table"></img></div>
                     <div className='tableResizeButton' onClick={handleResizeClickBig}><img src={resizeIcon} alt="close table" height={'25px'}></img></div>
                  </>
               }

               <table className="table">
                  <thead>
                     <tr>
                        <th scope="col">Sample Date</th>
                        {headers.map(header => {
                           return <th scope="col">{header}</th>
                        })}
                     </tr>
                  </thead>
                  <tbody>
                     {sampleDates.map(sampleDate => {
                        let dataExists = false;
                        headers.map(header => {
                           if (stationResults[header] && Object.values(stationResults[header]).includes(sampleDate)) {
                              dataExists = true;
                           }
                        })
                        if (dataExists || (errDates && errDates.includes(sampleDate))) {
                           return (
                              <tr>
                                 <td>{new Date(sampleDate).toUTCString().substring(5, 16)}</td>
                                 {headers.map(header => {
                                    if (stationResults[header] && Object.values(stationResults[header]).includes(sampleDate)) {
                                       return <td><button class="btn btn-success" onClick={() => handleStatusButtonClick(header, new Date(sampleDate).toUTCString())}>✓</button></td>
                                    } else {
                                       let errorExists = false
                                       if (errorData[header]) {
                                          for (let key in errorData[header]['sampledate']) {
                                             if (new Date(errorData[header]['sampledate'][key]).toUTCString() === sampleDate) {
                                                errorExists = true;
                                             }
                                          }
                                       }
                                       if (errorExists) {
                                          return <td><button class='btn btn-danger' onClick={() => handleStatusButtonClick(header, new Date(sampleDate).toUTCString())}>error</button></td>
                                       } else {
                                          return <td><button class='btn btn-secondary' onClick={() => handleStatusButtonClick(header, new Date(sampleDate).toUTCString())}>no data</button></td>
                                       }
                                    }
                                 })}
                              </tr>
                           )
                        }
                     })}
                  </tbody>
               </table>
            </div>
         </div>
      )
   }
}
