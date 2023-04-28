import React, { useState } from 'react'
import { useSelector, useDispatch, useEffect } from 'react-redux';
import { display } from '../../features/tables/tablesSlice';
import styles from './TableDisplayTreeLine.css'
import expandArrow from '../../assets/expand-arrow.png'
import collapseArrow from '../../assets/collapse-arrow.png'


export default function TableDisplayTreeLine(props) {

   const title = props.tableTitle

   const [arrowIcon, setArrowIcon] = useState(collapseArrow);
   const [hidden, setHidden] = useState(true);

   const displayTable = useSelector(state => state.tables[title])

   const dispatch = useDispatch()

   const handleArrowClick = () => {
      if (hidden === true) {
         setHidden(false)
         setArrowIcon(expandArrow)
      } else {
         setHidden(true)
         setArrowIcon(collapseArrow)
      }
   }



   const handleCheckboxChange = () => {
      dispatch(display(title))
   }

   return (
      <div>
         <div className="line">
            <div className="arrow" onClick={handleArrowClick}><img src={arrowIcon}></img></div>
            <input type='checkbox' className='checkbox' onChange={handleCheckboxChange} checked={displayTable}></input>
            <span>{title}</span>
         </div>
         <div className={`children ${ hidden ? "hidden" : "" }`}>{props.children}</div>
      </div>
   )
}
