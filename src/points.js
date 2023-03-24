import { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import "./style.css";
import "./wobble.css";
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

    useEffect(() => {
        // SOME CODE I FOUND AT https://codepen.io/queenadreena/pen/oKGyYq
        // eslint-disable-next-line
        {
            // Create array of any elements with "wobble" class
            const all = document.querySelectorAll('.wobble');

            // Iterate through each "wobble"
            all.forEach(el => {
            // Get the text content of the element
            let text = el.textContent;
            // Create an array of separate letters
            text = text.split("");
            // Iterate through each letter and give it its own span element and individual animation delay offset
            const textCode = text.map((x, idx) => {
                let delay = (idx + 1) * 50;
                return `<span style="animation-delay: ${delay}ms">${x}</span>`;
            })
            // replace the element's html with our dynamically created html
            el.innerHTML = textCode.join("");
            });
        }
    })
    
    return (
        <div className="App">
            {!Object.keys(CSVData).length && <p>Loading...</p>}
            {Object.keys(CSVData).length > 0 && (
                <div className="content">
                    <div className="header">
                        <h1>Welcome to <span className="wobble">ProckPoints.Gay</span></h1>
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
