import React, { useState } from 'react'
import styles from './Table.css'
import { useDispatch, useSelector } from 'react-redux'
import trueIcon from '../../assets/green-circle.png'
import { showModal } from '../../features/modal/modalsSlice'
import { getMetaData } from '../../features/modal/modalsService';


export default function Table(props) {

   const title = props.title
   const headers = props.headers
   const sampleDates = props.sampleDates

   const stationResults = useSelector(state => state.station.data)
   const displayTheTable = useSelector(state => state.tables[title])

   const placeHolder = "placeholder"

   const dispatch = useDispatch();

   const handleStatusButtonClick = (header, sampleDate) => {
      dispatch(getMetaData(["SAMPSTAT42", sampleDate, header]))
      dispatch(showModal())
      console.log(header, sampleDate)
   }

   const insertStatusIcon = (header, sampleDate) => {
      if (stationResults[title][sampleDate][header] === true) {
         return (
            <button class="btn btn-success" onClick={ () => handleStatusButtonClick(header, sampleDate) }>✓</button>
         )
      } else {
         return(
            <button class='btn btn-danger' onClick={ () => handleStatusButtonClick(header, sampleDate) }>error</button>
         )
      }
   }

   if (displayTheTable) {
      return (
         <div className='tableContainer'>
            <h4>{title.toUpperCase()}</h4>
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
                  {sampleDates.map((sampleDate) => {
                     return (
                        <tr>
                           <td>{sampleDate.substring(3)}</td>
                           {/* {headers.map(header => {
                              return <td>{ insertStatusIcon( header, sampleDate ) }</td>
                           })} */}
                        </tr>
                     )
                  })}
               </tbody>
            </table>
         </div>
      )
   }
}
