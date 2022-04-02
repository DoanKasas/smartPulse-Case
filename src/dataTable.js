import { Table } from "reactstrap";

const DataTable = ({objectData,objectTime}) => {

  return objectData ? (
      <Table className="text-center" hover bordered>
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Toplam İşlem Miktarı (MWh)</th>
            <th>Toplam İşlem Tutarı</th>
            <th>Ağırlık Ortalama Fiyat</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(objectData).map((element) => (
            <tr key={element.id}>
              <td>{objectTime[element.id].time}</td>
              <td>{element.totalQuantity.toFixed(2)}</td>
              <td>{element.totalPrice.toFixed(2)}</td>
              <td>{element.average.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
  ) : (
    <div className=" text-center" hover bordered ></div>
  );
};

export default DataTable;
