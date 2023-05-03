import React from 'react'
import styles from './SampleYearButton.css'
import { setSampleYear } from '../../features/sampleYear/sampleYearSlice'
import { useDispatch } from 'react-redux'

export default function SampleYearButton(props) {

   const dispatch = useDispatch()

   const year = props.year

   const handleSampleYearClick = (value) => {
      dispatch(setSampleYear(value))
   }

   return (
      <div className="col-md-3">
         <button className="btn btn-light button" onClick={(e) => handleSampleYearClick(e.target.value)} value={parseInt(year)}>{year}</button>
      </div>
   )
}
