import { useEffect } from "react";

function WobbleText(props) {
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
    }, []);

    return (
        <div className="wobble">{props.textToWobble}</div>
    )
}

export default WobbleText;