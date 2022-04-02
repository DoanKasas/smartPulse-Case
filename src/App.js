
import './App.css';
import { useState,useEffect } from 'react';
import { Container,Button } from 'reactstrap';
import axios from 'axios';
import DataTable from './dataTable'

const App = () => {

  const [data, setData] = useState();
  const [objectData, setObjectData] = useState();
  const [objectTime, setObjectTime] = useState();


  useEffect(() => {
    if(data){
      let dataObject = {};
      let dateTimeObject = {};
      let totalQuantity,totalPrice,average,dateTime;
      data.map(element => {
          if(dataObject[element.conract]){
            totalPrice = dataObject[element.conract].totalPrice + (element.price*element.quantity)/10;
            totalQuantity = dataObject[element.conract].totalQuantity + element.quantity/10;
            average = totalPrice/totalQuantity;
            dataObject[element.conract] = {'id':element.conract,'totalPrice' : totalPrice , 'totalQuantity' : totalQuantity ,'average' : average}
          }else{
            totalPrice = (element.price*element.quantity)/10;
            totalQuantity = element.quantity/10;
            average = totalPrice/totalQuantity;
            dateTime = new Date(2000+parseInt(element.conract.substr(2,2)), element.conract.substr(4,2), element.conract.substr(6,2), element.conract.substr(8,2), 0, 0, 0).toISOString().substr(0, 16).replace('T', ' ')
            dataObject[element.conract] = {'id':element.conract, 'totalPrice' : totalPrice , 'totalQuantity' : totalQuantity ,'average' : average}
            dateTimeObject[element.conract] = {'time' : dateTime}
          }
      })
      setObjectData(dataObject)
      setObjectTime(dateTimeObject)
    }
  }, [data]);

  const getData = async () => {
    let d = new Date(); 
    let startEnd = d.toLocaleDateString().split('.').reverse().join('-');

    try {
      const data = await axios
        .get(`/transparency/service/market/intra-day-trade-history?endDate=${startEnd}&startDate=${startEnd}`)
        .then(res => {
          setData(res.data.body.intraDayTradeHistoryList.filter(element => element.conract.match(/.{1,2}/g)[0] === 'PH'))
        })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <div>
        <Container fluid>
          <h1 className="display-3 text-center">smartPulse Case</h1>
        </Container>
      </div>

      <div>
        <Button style={{ width: '10%' }} color="primary" onClick={() => {  getData() }}>Get Data</Button>
      </div>

      <br></br>
      <div className="container" >
        <DataTable objectData={objectData} objectTime={objectTime}/>
      </div>
    </div>
  );
}

export default App;
