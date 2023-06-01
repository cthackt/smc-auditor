import React from 'react'
import styles from './Loader.css'

export default function Loader() {
   return (
      <div className='myLoader'>
         <div className="loaderOverlay">
            <div className="loaderBody">
               <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
         </div>
      </div>
   )
}