import styles from './TableDisplayTree.css'
import TableDisplayTreeLine from '../TableDisplayTreeLine/TableDisplayTreeLine';

export default function TableDisplayTree() {
  return (
    <div class="TableDisplayTree">
      <TableDisplayTreeLine tableTitle={"t1 parent"} checked={true}>
         <TableDisplayTreeLine tableTitle={"t2 child"}>
            <TableDisplayTreeLine tableTitle={"t3 grandchild"}>
               <li>d1</li>
               <li>d2</li>
               <li>d3</li>
               <li>d4</li>
               <li>d5</li>
               <li>d6</li>
               <li>d7</li>
               <li>d8</li>
               <li>d9</li>
               <li>d10</li>
            </TableDisplayTreeLine>
         </TableDisplayTreeLine>
      </TableDisplayTreeLine>
    </div>
  )
}
