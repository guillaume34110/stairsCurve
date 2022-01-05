import { format2dArray } from "./utilityFunctions.js";

export const Stairs = {
    signal : [],
    dataScaled : [],
    currentData : [],
    position : 0,
    level : 0 ,
    height : 0.008,
    currentHeight : 0 ,
    direction : 0,

    trace(spotSignal){
        if (spotSignal) this.signal.push(spotSignal)
        if (this.position === 0 || this.position === undefined) this.position = spotSignal;
        this.currentHeight = (this.position * this.height)
        
        if (this.position+(this.currentHeight) < spotSignal){
            this.position  += this.currentHeight
            this.level ++
            this.direction = 1 
            console.log('++')
        } else if (this.position-(this.currentHeight) > spotSignal){
            this.position  -= this.currentHeight
            this.level --
            this.direction = -1 
            console.log('--')
        } 
        if (this.signal[this.signal.length - 1] )this.currentData.push(this.position)
            if (this.signalPosition < 3) this.trace()
            if (this.currentData.length > 500) this.currentData.shift()
    },
    draw(){
        if (this.dataScaled.length > 1) {
        const formatedData = format2dArray( this.dataScaled)
        let graph = document.querySelector('.signals')
        const newHtml = `<polyline points ="${formatedData}" style ="fill:none;stroke:#f66600;stroke-width:2" />`
        graph.insertAdjacentHTML('beforeend', newHtml)
        }
    },
    signalDataScale() {//scaling signals
        
        if (this.signal[this.signal.length - 1]) {
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
}