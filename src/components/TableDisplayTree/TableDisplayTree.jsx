import './TableDisplayTree.css'
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
         <TableDisplayTreeLine tableTitle={"IPI"}>
            <TableDisplayTreeLine tableTitle={"XSlope"}>
               <li>Proportion</li>
               <li>Elevation Difference</li>
               <li>Segment Length</li>
               <li>Slope</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"XBKF_W"}>
               <li>Bankfull Height</li>
               <li>Bankfull Width</li>
               <li>StationWaterDepth</li>
               <li>Wetted Width</li>
            </TableDisplayTreeLine>
         </TableDisplayTreeLine>
         <TableDisplayTreeLine tableTitle={"W1_HALL_SWAMP"}>
               <li>Riparian Bridges/Abutments</li>
               <li>Riparian Buildings</li>
               <li>Riparian Landfill/Trash</li>
               <li>Riparian Logging</li>
               <li>Riparian Mining</li>
               <li>Riparian Orchards/Vineyards</li>
               <li>Riparian Park/Lawn</li>
               <li>Riparian Pasture/Range</li>
               <li>Riparian Pavement</li>
               <li>Riparian Pipes</li>
               <li>Riparian Road</li>
               <li>Riparian Crops</li>
               <li>Riparian Vegetation Management</li>
               <li>Riparian Wall/Dike</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"ev_flowhab"}>
               <li>Cascade/Falls</li>
               <li>Glide</li>
               <li>Pool</li>
               <li>Rapid</li>
               <li>Riffle</li>
               <li>Run</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"h_aqhab"}>
               <li>Fish Cover Boulders</li>
               <li>Fish Cover Filamentous Algae</li>
               <li>Fish Cover Live Trees/Roots</li>
               <li>Fish Cover Macrophytes</li>
               <li>Fish Cover Overhang.Veg</li>
               <li>Fish Cover Undercut Banks</li>
               <li>Fish Cover Woody Debris &lt;0.3 m</li>
               <li>Fish Cover Woody Debris &gt;0.3 m</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"h_subnat"}>
               <li>Substrate Size Class</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"pct_safn"}>
               <li>Substrate Size Class</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"pct_rc"}>
               <li>Substrate Size Class</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"pct_pool"}>
               <li>Pool</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"xcmg"}>
               <li>Riparian GroundCover NonWoody Plants</li>
               <li>Riparian GroundCover Woody Shrubs</li>
               <li>Riparian Upper Canopy All Trees</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"xc"}>
               <li>Riparian Upper Canopy All Trees</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"fl_d_m"}>
               <li>Discharge</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"fl_q_m"}>
               <li>Distance from Bank</li>
               <li>StationWaterDepth</li>
               <li>Velocity</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"fl_n_m"}>
               <li>StationWaterDepth</li>
            </TableDisplayTreeLine>
            <TableDisplayTreeLine tableTitle={"fl_t_m"}>
            </TableDisplayTreeLine>
      </div>
   )
}
