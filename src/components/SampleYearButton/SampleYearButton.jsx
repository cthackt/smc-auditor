import React from 'react'
import styles from './SampleYearButton.css'

export default function SampleYearButton(props) {

   const year = props.year

   return (
      <div className="col-md-3">
         <button className="btn btn-light button">{year}</button>
      </div>
   )
}
