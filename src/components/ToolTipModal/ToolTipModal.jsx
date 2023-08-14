import React from 'react'
import './ToolTipModal.css'
import { useDispatch, useSelector } from 'react-redux'
import { showToolTipModal } from '../../features/modal/modalsSlice'
import closeIcon from '../../assets/close-black.png'

export default function ToolTipModal() {

   const dispatch = useDispatch()

   const ttData = useSelector(state => state.modal.ttData)
   const allIDs = useSelector(state => state.station.allIDs)
   const sqlQueries = useSelector(state => state.modal.sqlQueries)

   const tableName = ttData.tableName;

   const handleCloseClick = () => {
      dispatch(showToolTipModal())
   }

   return (
      <div className='ttModal'>
         <div className="ttoverlay">
            <div className="ttmodalBody">
               <div className='ttcloseButton' onClick={handleCloseClick}><img src={closeIcon} alt="close modal"></img></div>
               <div className="ttmodalHeader">
                  <h1>{tableName}</h1>
                  <span>&nbsp;<b>Master ID:</b> {allIDs.masterid[0]}&nbsp;</span>
                  <span>&nbsp;<b>Station IDs:</b>&nbsp;</span>
                  {Object.keys(allIDs.stationid).map(i => {
                     return(
                        <span>{allIDs.stationid[i]}&nbsp;</span>
                     )
                  })}
               </div>
               <div className="ttmodalContent">
                  <table>
                     <thead>
                        <tr>
                           <th>Column name</th>
                           <th>SQL query</th>
                        </tr>
                     </thead>
                     <tbody>
                        {Object.keys(ttData).map(el => { return(
                           el == 'tableName' ? 
                              undefined : 
                              <tr>
                                 <td>{el}</td>
                                 <td>{sqlQueries[el] + '[ARRAY OF ALIASES]'}</td>
                              </tr>
                        )})}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   )
}
