import React from 'react'
import styles from './SampleYearButton.css'
import { setSampleYear, reset } from '../../features/sampleYear/sampleYearSlice'
import { useDispatch } from 'react-redux'

export default function SampleYearButton(props) {

   const dispatch = useDispatch()

   const year = props.year

   const handleSampleYearClick = (value) => {
      if (value !== "View All") {
         value = parseInt(value)
         dispatch(setSampleYear(value))
      } else {
         dispatch(reset())
      }
   }

   return (
      <div className="col-md-3">
         <button className="btn btn-light button" onClick={(e) => handleSampleYearClick(e.target.value)} value={year}>{year}</button>
      </div>
   )
}
