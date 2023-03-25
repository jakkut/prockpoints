// EXTERNAL DEPENDENCIES
import { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import * as converter from "number-to-words";

// INTERNAL MODULES OR OTHERS THAT LUCAS / JACK MADE
import WobbleText from "./wobble";

// CSS
import "./style.css";
import "./wobble.css";

// MISC
import Sam from "./sam.jpg";
const link = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQIlV6a8K6PXlrdHZ80_CzxAgdU3imRsD30mITMG-M7cHKl46i1y5adbZ8ht09rQ2TbBM_fJ8_Q-wky/pub?gid=0&single=true&output=csv";

// TO-DO:
// - Add routing lol
// - Change the loading screen to be Matt-related
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
            {!Object.keys(CSVData).length && <p>Loading...</p>}
            {Object.keys(CSVData).length > 0 && (
                <div className="content">
                    <div className="header">
                        <h1>Welcome to<br/>
                        <WobbleText textToWobble={"ProckPoints.Gay"}/>
                        </h1>
                    </div>
                    <p>
                    There are currently{" "}
                    <b>
                        {howMany} (
                        {converter.toWords(howMany)}) Prock
                        Points&trade;
                    </b>{" "}
                    in circulation.
                    </p>
                    <div className="table-div">
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
                    </div>
                </div>
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
