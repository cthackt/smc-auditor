import React from 'react'
import './Modal.css'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../../features/modal/modalsSlice';
import closeIcon from '../../assets/close-black.png'

export default function Modal() {

   const dispatch = useDispatch();

   const errors = useSelector(state => state.modal.errors)
   const stationID = useSelector(state => state.modal.sampleInfo.station)
   const sampleDate = useSelector(state => state.modal.sampleInfo.sample_date)
   const datatype = useSelector(state => state.modal.sampleInfo.variable)
   const dbTableData = useSelector(state => state.modal.dbTableData)

   let error; 
   
   if (errors !== "" && errors !== 'no data') {
      Object.keys(errors).forEach(i => {
         if (sampleDate == errors[i].sampledate) {
            error = errors[i].errmsg
         }
      })
   } 

   const handleCloseClick = () => {
      dispatch(showModal())
   }

   return (
      <div className='myModal'>
         <div className="overlay">
            <div className="modalBody">
               <div className="modalHeader">
                  <h1>{datatype.toUpperCase()}</h1>
                  <div>
                     <h6>{stationID}</h6>
                     <h6>{sampleDate}</h6>
                  </div>
                  <div className='closeButton' onClick={handleCloseClick}><img src={closeIcon} alt="close modal"></img></div>
               </div>
               <div className="modalContent">
                  <div className="errorBox">
                     <p>{error ? error : 'any errors will display here...'}</p>
                  </div>
                  <div className="modalTableContainer">
                     {Object.keys(dbTableData).map(index => {
                        return (
                           <>
                              <br/><p><b>Row {parseInt(index) + 1} of {dbTableData.length}</b></p>
                              <table>
                                 <thead>
                                    <tr>
                                       <th>Field</th>
                                       <th>Value</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {Object.keys(dbTableData[index]).map(field => {
                                       return(
                                          <tr>
                                             <td>{ field }</td>
                                             <td>{ dbTableData[index][field] }</td>
                                          </tr>
                                       )
                                    })}
                                 </tbody>
                              </table>
                           </>
                        )
                     })}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
