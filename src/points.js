import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./style.css";
import * as converter from "number-to-words";

var link =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQIlV6a8K6PXlrdHZ80_CzxAgdU3imRsD30mITMG-M7cHKl46i1y5adbZ8ht09rQ2TbBM_fJ8_Q-wky/pub?gid=0&single=true&output=csv";

function App() {
  const [CSVData, setCSVData] = useState({});

  function PointRow(props) {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.num}</td>
      </tr>
    );
  }

  const [pointRows, setPointRows] = useState([]);

  useEffect(() => {
    const commonConfig = { delimiter: "," };

    Papa.parse(link, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (result) => {
        setCSVData(result.data);
      },
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < Object.keys(CSVData).length; ++i) {
      setPointRows((oldArray) => [
        ...oldArray,
        <PointRow
          key={i}
          name={CSVData[i]["PERSON"]}
          num={CSVData[i]["BALANCE"]}
        />,
      ]);
    }
  }, [CSVData]);

  return (
    <div className="App">
      {Object.keys(CSVData).length > 0 && (
        <p>
          There are currently{" "}
          <b>
            {Object.keys(CSVData).length} (
            {converter.toWords(Object.keys(CSVData).length)}) Prock
            Points&trade;
          </b>{" "}
          in circulation.
        </p>
      )}
      {!Object.keys(CSVData).length && <p>Loading...</p>}
      {Object.keys(CSVData).length > 0 && (
        <table>
          <thead>
            <tr>
              <th>PEOPLE:</th>
              <th>BALANCE:</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(CSVData).map((i) => (
              <PointRow
                key={i}
                name={CSVData[i]["PERSON"]}
                num={CSVData[i]["BALANCE"]}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
