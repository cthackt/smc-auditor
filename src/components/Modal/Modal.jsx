import React from 'react'
import style from './Modal.css'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../../features/modal/modalsSlice';
import closeIcon from '../../assets/close.png'

export default function Modal(props) {

   const dispatch = useDispatch();

   const metadata = useSelector(state => state.modal.metadata)
   const stationID = metadata[0]
   const sampleDate = metadata[1]
   const datatype = metadata[2]

   const handleCloseClick = () => {
      dispatch(showModal())
   }

   return (
      <div className='myModal'>
         <div className="overlay">
            <div className="modalBody">
               <div className='closeButton' onClick={handleCloseClick}><img src={closeIcon}></img></div>
               <div className="modalHeader">
                  <h1>{datatype}</h1>
                  <div>
                     <h6>{stationID}</h6>
                     <h6>{sampleDate}</h6>
                  </div>
               </div>
               <div className="modalContent">
                  <div className="metaDataBox">

                  </div>
                  <div className="errorBox">
                     <p>Sample error message</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
