

import React, { useEffect } from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import Display from './Components/Display.js'
import Card from 'react-bootstrap/Card'


function App() {

  const [ BarData, setBarData ] = React.useState('');
  const [quantityData, setQuantityData]  = React.useState('')

   return (
     <>

     <div class="container">
        <div class="left-element">
                 <BarcodeScannerComponent
                   width={500}
                   height={500}
                   onUpdate={(err, result) => {

                     if (result){
                       setBarData(result.text)
                     }

                   }}
                 />
         </div>
   <div class="right-element">


  <Card style={{ width: '18rem'}}>
      <Card.Body>
          <Display
          mydata={BarData}/>

                <div> {quantityData && quantityData.map((item) => <p> {item} </p>) }</div>
             </Card.Body>
         </Card>

     </div>
</div>
     </>
   )
}



export default App;
