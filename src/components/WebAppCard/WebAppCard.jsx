import React, { useState, useEffect } from 'react'
import "./WebAppCard.css"
import greenCircle from '../../assets/green-circle.png'
import redCircle from '../../assets/red-circle.png'

import asciPic from '../../assets/appScreenShots/ASCI.png'
import asciSitePic from '../../assets/appScreenShots/ASCI-site.png'
import rscaPic from '../../assets/appScreenShots/RSCA.png'
import sqiPic from '../../assets/appScreenShots/SQI.png'
import scapePic from '../../assets/appScreenShots/SCAPE.png'
import scapeKnbPic from '../../assets/appScreenShots/SCAPE-knb.png'
import empaPic from '../../assets/appScreenShots/EMPA.png'
import famPic from '../../assets/appScreenShots/family-index.png'
import sdamAwSitePic from '../../assets/appScreenShots/SDAM-AW-site.png'
import sdamAwToolPic from '../../assets/appScreenShots/SDAM-AW-tool.png'
import sdamWmSitePic from '../../assets/appScreenShots/SDAM-WM-site.png'
import sdamWmToolPic from '../../assets/appScreenShots/SDAM-WM-tool.png'
import brmtPic from '../../assets/appScreenShots/BRMT.png'
import sdamCheckerPic from '../../assets/appScreenShots/SDAM-checker.png'
import smcSitePic from '../../assets/appScreenShots/smc-site.png'
import santaPic from '../../assets/appScreenShots/ST-SAW.png'
import threshPic from '../../assets/appScreenShots/thresh-ID-mod-chan.png'
import eflowsSitePic from '../../assets/appScreenShots/LA-Eflows-site.png'
import eflowsToolPic from '../../assets/appScreenShots/LA-Eflows-tool.png'

export default function WebAppCard(props) {

   const title = props.title
   const status = props.status
   const url = props.url
   const code = props.statusCode
   const [pic, setPic] = useState('')
   const [appTitle, setAppTitle] = useState('')

   const urlObject = {
      'https://sccwrp.shinyapps.io/ascifigs/': {
         'name': 'ASCI dashboard',
         'pic': asciPic
      },
      'https://sites.google.com/view/asci/home': {
         'name': 'ASCI Site',
         'pic': asciSitePic
      },
      'https://rsca.sccwrp.org/sgrrmp': {
         'name': 'RSCA SGGRMP',
         'pic': rscaPic
      },
      'https://sccwrp.shinyapps.io/sqi_shiny_dynamic/': {
         'name': 'SQI',
         'pic': sqiPic
      },
      'https://sccwrp.shinyapps.io/scape/': {
         'name': 'SCAPE',
         'pic': scapePic
      },
      'https://knb.ecoinformatics.org/view/urn:uuid:75411f50-32ed-42a5-bbfd-26833c7a441f': {
         'name': 'SCAPE KNB',
         'pic': scapeKnbPic
      },
      'https://empa.sccwrp.org/': {
         'name': 'EMPA Hub Site',
         'pic': empaPic
      },
      'https://sccwrp.shinyapps.io/familyindex/': {
         'name': 'Family Level Index',
         'pic': famPic
      },
      'https://betasdamaw-sccwrp.hub.arcgis.com/': {
         'name': 'SDAM AW Hub Site',
         'pic': sdamAwSitePic
      },
      'https://sccwrp.shinyapps.io/beta_awsdam_report/': {
         'name': 'SDAM AW Tool',
         'pic': sdamAwToolPic
      },
      'https://sdam-for-western-mountains-sccwrp.hub.arcgis.com/': {
         'name': 'SDAM WM Hub Site',
         'pic': sdamWmSitePic
      },
      'https://sccwrp.shinyapps.io/beta_sdam_wm/': {
         'name': 'SDAM AW Tool',
         'pic': sdamWmToolPic
      },
      'https://sccwrp.shinyapps.io/biostim_thresh/': {
         'name': 'BRMT',
         'pic': brmtPic
      },
      'https://sdamchecker.sccwrp.org/checker': {
         'name': 'SDAM Checker',
         'pic': sdamCheckerPic
      },
      'https://smc.sccwrp.org/': {
         'name': 'SMC Data Portal',
         'pic': smcSitePic
      },
      'https://sccwrp.shinyapps.io/RB8_Threshold/': {
         'name': 'Santa Ana Sal. Thresholds',
         'pic': santaPic
      },
      'https://sccwrp.shinyapps.io/ModifiedChannelThresholds/': {
         'name': 'Thresholds for Mod Channels',
         'pic': threshPic
      },
      'https://la-river-eflows-study-2021-sccwrp.hub.arcgis.com/': {
         'name': 'LA River e-flows Site',
         'pic': eflowsSitePic
      },
      'https://sccwrp.shinyapps.io/lar_eflows_shinyapp/': {
         'name': 'LA River e-flows Dashboard',
         'pic': eflowsToolPic
      },
      
   }
   
   // setPic(urlObject[url])
   useEffect(() => {
      const thisURLObject = urlObject[url]
      if (thisURLObject) {
         setPic(thisURLObject['pic'])
         setAppTitle(thisURLObject['name'])
      }
   }, [])


   return (
      <div className="col-md-6">
         <div className='cardContainer container'>
            <div className='cardHeader'>
               <div className="row">
                  <div className="col-md-10">
                     <h4>{appTitle === '' ? title : appTitle}</h4>
                  </div>
                  <div className="col-md-2">
                     <img className='status-circle' src={status === 'up' ? greenCircle : redCircle} alt={'status indicator'}/>
                  </div>
               </div>
            </div>
            <div className="cardBody">
               <p>Status code: {code}</p>
               <img src={pic} alt={"screenshot of " + title} width={'100%'} height={'auto'} />
               <button className='btn btn-secondary' onClick={() => window.open(url, '_blank')}>View application</button>
            </div>
         </div>
      </div>
   )
}
