import React,  {useState, useEffect} from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import 'bootstrap/dist/css/bootstrap.min.css';




function Display(props){
  const [pName, setPName] = useState('NoproductName');
  const [quantity, setQuantity] = useState(0);



  const submitProduct = () => {
    Axios.post('http://localhost:5000/api/lookTheItem',
     {nameP:pName,
      quantityP: quantity,
      barcodeP:props.mydata
     }).then(()=> {
       alert('Sucessful insert');
     });
  };



  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const getInfoViri = () => {
    Axios.get('http://localhost:5000/holav2', {
   params:  {
      barcodeP: props.mydata


    }
  })
    .then((response) => {
      console.log(response.data[2], "acer")
      setQuantity(response.data)
    })
  }



  return (
    <>
   <div>
     <p>{props.mydata}</p>

     <InputGroup>
      <InputGroup.Text style={{backgroundColor: '#adadde'}}  >Product Name</InputGroup.Text>
      <FormControl as="textarea" aria-label="Product-Name"
      type = "text" name="productName" onChange={(e) => {
        setPName(e.target.value)
      }}/>
    </InputGroup>


  <InputGroup>
   <InputGroup.Text style={{backgroundColor: '#d9d9ff'}}>Quantity</InputGroup.Text>
   <FormControl as="textarea" aria-label="Quantity"
    type = "text" name="quantity" onChange={(e) => {
     setQuantity(e.target.value)
   }}/>
 </InputGroup>


<div>
  <Button variant="outline-primary" onClick={submitProduct}>Update Quantity</Button>
</div>
<div>
   <Button variant="outline-dark" onClick={getInfoViri}>Check Quantity</Button>
</div>

    <Card.Title>Current Quantity</Card.Title>
    <p>{quantity} </p>
</div>




  </>
  )
}

export default Display;
