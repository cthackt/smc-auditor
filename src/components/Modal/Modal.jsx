import React from 'react'
import style from './Modal.css'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../../features/modal/modalsSlice';
import closeIcon from '../../assets/close.png'

export default function Modal(props) {

   const dispatch = useDispatch();

   const errors = useSelector(state => state.modal.errors)
   const metadata = useSelector(state => state.modal.metadata)

   const error = errors !== "" && errors !== 'no data' && errors[0] ? errors[0].errmsg : ''

   const handleCloseClick = () => {
      dispatch(showModal())
   }

   return (
      <div className='myModal'>
         <div className="overlay">
            <div className="modalBody">
               <div className='closeButton' onClick={handleCloseClick}><img src={closeIcon}></img></div>
               {/* <div className="modalHeader">
                  <h1>{datatype}</h1>
                  <div>
                     <h6>{stationID}</h6>
                     <h6>{sampleDate}</h6>
                  </div>
               </div> */}
               <div className="modalContent">
                  <div className="metaDataBox">

                  </div>
                  <div className="errorBox">
                     <p>{error}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
