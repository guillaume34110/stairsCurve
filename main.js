

import {    Html} from "./Components/htmlContent.js"
import {    CapacitorsKnobs,    Knobs,    ResistorsKnobs} from "./Components/knob.js"
import {    Signal} from "./Components/signal.js"
import {    Stairs} from "./Components/Stairs.js"
import {    conversion} from "./Components/utilityFunctions.js"
import {Trade } from './Components/Trade.js'

let start = false
export let page
export let mainSignal
export let bufferSignalData = {}
export let stairsSignal
export let trading



const startSoft = () => {

    conversion(bufferSignalData)
    if (bufferSignalData.signal) {

        start = true
        console.log(bufferSignalData, 1)
        page = Object.create(Html) //create a new object
        mainSignal = Object.create(Signal)
        stairsSignal = Object.create(Stairs)
        trading = Object.create(Trade)
        mainLoop()

    } else setTimeout(startSoft, 100);

}
window.addEventListener('load', startSoft)

const mainLoop = async () => {
    if (start === true) {

        page.draw()
        mainSignal.trace()
        mainSignal.signalDataScale()
        mainSignal.draw()
        stairsSignal.trace(mainSignal.currentData[mainSignal.currentData.length - 1])
        stairsSignal.signalDataScale()
        stairsSignal.draw()
        trading.buy(stairsSignal.direction, mainSignal.currentData[mainSignal.currentData.length - 1],stairsSignal.level)
        trading.sell(stairsSignal.direction, mainSignal.currentData[mainSignal.currentData.length - 1])
        setTimeout(mainLoop, 5);
    }
}