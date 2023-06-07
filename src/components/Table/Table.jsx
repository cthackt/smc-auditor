import React from 'react'
import './Table.css'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../../features/modal/modalsSlice'
import { getErrors, getSampleInfo } from '../../features/modal/modalsService';
import { display } from '../../features/tables/tablesSlice'
import closeIcon from '../../assets/close.png'

export default function Table(props) {

   const stationID = props.station
   const title = props.title
   const headers = props.headers
   const sampleDates = props.sampleDates
   const errDates = props.errDates

   const stationResults = useSelector(state => state.station.data)
   const errorData = useSelector(state => state.station.errorDates)
   const displayTheTable = useSelector(state => state.tables[title])

   const dispatch = useDispatch();

   const handleStatusButtonClick = async (header, sampleDate) => {
      await dispatch(getSampleInfo([stationID, sampleDate, header]))
      await dispatch(getErrors([stationID, sampleDate, header]))
      await dispatch(showModal())
   }

   const handleCloseClick = () => {
      dispatch(display(title))
   }

   if (displayTheTable) {
      return (
         <div className='tableContainer'>
            <h4>{title.toUpperCase()}</h4>
            <div className='containerBody'>
               <div className='tableCloseButton' onClick={handleCloseClick}><img src={closeIcon} alt="close table"></img></div>
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
                        if (dataExists || (errDates && errDates.includes(sampleDate)) /*true*/) {
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
