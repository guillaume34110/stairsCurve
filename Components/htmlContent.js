import { trading } from "../main.js"


export const Html = {
    staticToken: false,
    htmlContent: `
    <div class = "title">
        <h1>Data Curve Stairs</h1>
    </div>
    <section>
        <div class = "graph"></div>
        <div class = "left-section">
            <div class = "controls">
                <div class = "controls-knobs"></div>
                <div class = "schema">
                    <div class = "dynamic"></div>
                    
                </div>
            
            </div>
        <p>demo</p>
        </div>
    </section>`,
    
    draw() {
        if (!this.staticToken) {//first draw for static html
            this.staticToken = true
            const root = document.querySelector('.root')
            let newElement = document.createElement('main')
            newElement.innerHTML = this.htmlContent
            root.appendChild(newElement)
           
            
        }
        let dynamic = document.querySelector('.dynamic')
        dynamic.replaceChildren()
        let dynamicHtml = `
            <p>${trading.wallet}$ </p>
            <p>${trading.crypto}BTC </p>
            `
        dynamic.insertAdjacentHTML('beforeend', dynamicHtml)
    },
    
    
    
}