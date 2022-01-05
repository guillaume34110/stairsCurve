import {
    bufferSignalData
} from "../main.js";
import {
    cleanGraph,
    conversion,
    format2dArray
} from "./utilityFunctions.js"

export const Signal = {
    /*variables and constants*/
    signalData: undefined,
    signalPosition: 0,
    currentData: [],
    dataScaled: [],
    /*object function */
    signalDataScale() {//scaling signals
        if (this.signalData !== undefined) {
            this.dataScaled = []
            let min = Math.min(...this.currentData)
            let max = Math.max(...this.currentData)
            let delta = max - min
            this.currentData.forEach(data => {

                data = data - min
                this.dataScaled.push((1 - (data / delta)) * 500)
            });
        }
    },
    trace() { // determine new position and add to signalData

        if (this.signalData !== undefined) {
            this.signalPosition++
            this.currentData.push(this.signalData[this.signalPosition])
            if (this.signalPosition < 3) this.trace()
            if (this.currentData.length > 500) this.currentData.shift()
        } else if (bufferSignalData.signal !== undefined) {
            this.signalData = bufferSignalData.signal.array
        }
    },
    draw() { // draw signal svg
        if (this.signalData !== undefined) {
            cleanGraph()
            const formatedData = format2dArray(this.dataScaled)
            let newElement = document.createElement('div')
            const newHtml = `<svg class = "signals" height = "500" width = "500">
        <polyline points ="${formatedData}" style ="fill:none;stroke:#00f6c0;stroke-width:1" />
        </svg>`
            newElement.innerHTML = newHtml
            document.querySelector('.graph').appendChild(newElement)
        }
    }
}