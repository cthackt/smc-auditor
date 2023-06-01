import styles from './TableDisplayTree.css'
import TableDisplayTreeLine from '../TableDisplayTreeLine/TableDisplayTreeLine';

export default function TableDisplayTree() {
  return (
    <div class="TableDisplayTree">
      <TableDisplayTreeLine tableTitle={"SQI"}>
         <TableDisplayTreeLine tableTitle={"CSCI"}>
            <li>BMI Taxonomy</li>
            <TableDisplayTreeLine tableTitle={"GIS Metrics"}>
               <li>Catchment shapefile</li>
               <li>Point shapefile</li>
            </TableDisplayTreeLine>
         </TableDisplayTreeLine>
         <TableDisplayTreeLine tableTitle={"ASCI-D"}>
            <li>Algae taxonomy</li>
            <TableDisplayTreeLine tableTitle={"GIS Metrics"}>
               <li>Catchment shapefile</li>
               <li>Point shapefile</li>
            </TableDisplayTreeLine>
         </TableDisplayTreeLine>
         <TableDisplayTreeLine tableTitle={"Habitat"}>
            <TableDisplayTreeLine tableTitle={"PHAB"}>
               <li>IPI</li>
               <li>ev_flowhab</li>
               <li>ev_flowhab_score</li>
               <li>h_aghab</li>
               <li>h_aghab_pred</li>
               <li>h_aghab_score</li>
               <li>h subnat</li>
               <li>h_subnat_score</li>
               <li>pct_safn</li>
               <li>pct_safn_pred</li>
               <li>pct_safn_score</li>
               <li>pct_rc</li>
               <li>xcmg</li>
               <li>xcmg_pred</li>
               <li>xcmg_score</li>
               <li>oct_pool</li>
               <li>xc</li>
               <li>xfc_alg</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"CRAM"}>
               <li>indexscore</li>
               <li>bioticsctructure</li>
               <li>bufferandlandscapecontext</li>
               <li>hydrology</li>
               <li>physicalstructure</li>
            </TableDisplayTreeLine>
         </TableDisplayTreeLine>
         <TableDisplayTreeLine tableTitle={"Chemistry"}>
               <li>Total N</li>
               <li>Total P</li>
               <li>Specific conductivity</li>
            </TableDisplayTreeLine>
      </TableDisplayTreeLine>
      
         
      <TableDisplayTreeLine tableTitle={"RSCA"}>
         <TableDisplayTreeLine tableTitle={"CSCI"}>
            <li>BMI Taxonomy</li>
            <TableDisplayTreeLine tableTitle={"GIS Metrics"}>
               <li>Catchment shapefile</li>
               <li>Point shapefile</li>
            </TableDisplayTreeLine>
            <li>CSCI capture probabilities</li>
         </TableDisplayTreeLine>
         <TableDisplayTreeLine tableTitle={"Eutrophication"}>
            <li>Total N</li>
            <li>Total P</li>
            <li>Dissolved oxygen</li>
            <li>Benthic AFDM</li>
            <li>Benthic chl-a</li>
         </TableDisplayTreeLine>
         <TableDisplayTreeLine tableTitle={"Temperature"}>
            <li>Temperature</li>
            <li>XCMG PHAB Metric</li>
            <li>XCDENMID PHAB Metric</li>
         </TableDisplayTreeLine>
         <TableDisplayTreeLine tableTitle={"Conductivity"}>
            <li>Specific conductivity</li>
            <li>Chloride</li>
            <li>Sulfate</li>
            <li>Total Dissolved Solids</li>
         </TableDisplayTreeLine>
         <TableDisplayTreeLine tableTitle={"Habitat"}>
            <li>H_SubNat</li>
            <li>H_AqHab</li>
            <li>PCT_SAFN</li>
            <li>Ev_FlowHab</li>
         </TableDisplayTreeLine>
         <TableDisplayTreeLine tableTitle={"PHAB Metrics"}>
            <li>H_SubNat</li>
            <li>H_AqHab</li>
            <li>PCT_SAFN</li>
            <li>Ev_FlowHab</li>
         </TableDisplayTreeLine>
      </TableDisplayTreeLine>
      {/* <TableDisplayTreeLine tableTitle={"Analysis Tables"}></TableDisplayTreeLine>
      <TableDisplayTreeLine tableTitle={"Raw Data"}></TableDisplayTreeLine> */}
    </div>
  )
}
