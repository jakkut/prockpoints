import { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import "./style.css";
import * as converter from "number-to-words";
import Sam from "./sam.jpg";

const link = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQIlV6a8K6PXlrdHZ80_CzxAgdU3imRsD30mITMG-M7cHKl46i1y5adbZ8ht09rQ2TbBM_fJ8_Q-wky/pub?gid=0&single=true&output=csv";


function App() {
    const [CSVData, setCSVData] = useState({});
    const [samImage, setSamImage] = useState(false);
    
    const howMany = useMemo(() => {
        return Object.values(CSVData).reduce((result, item) => {
            return result + Number(item.BALANCE)
        }, 0);
    }, [CSVData]);

    function PointRow(props) {
        return(
            <tr>
                <td 
                    onClick={() => {
                        if (props.name === "Sam") {
                            setSamImage(!samImage);
                        }
                    }}
                >{props.name}</td>
                <td>{props.num}</td>
            </tr>
        )
    }
    
    const [pointRows, setPointRows] = useState([]);

    useEffect(() => {
        const commonConfig = { delimiter: "," };

        Papa.parse(
            link,
            {
                ...commonConfig,
                header: true,
                download: true,
                complete: (result) => {
                    setCSVData(result.data);
                }
            }
        );
    }, []);
    
    return (
        <div className="App">
            {Object.keys(CSVData).length > 0 && (
                <p>
                There are currently{" "}
                <b>
                    {howMany} (
                    {converter.toWords(howMany)}) Prock
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
            {samImage && (
                <div className="sam-div">
                    <img alt="Sam flipping the bird." src={Sam}/>
                </div>
            )}
        </div>
    );
}

export default App;
