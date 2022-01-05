/*https://dev.to/ndesmic/how-to-make-a-rotational-knob-input-with-web-components-43e3*/

export const Knobs = {
    id : 0,
    deg : 0,
    isManipulating : false,
    isPresent : false,
    centerX : 0 ,
    centerY : 0 ,
    knobElement : null,
    component : null,
    onPointerDown(e){
        
        this.isManipulating = true
        
    },
    onPointerUp(){
        this.isManipulating = false
    },
    onPointerMove(e){
        
        if (this.isManipulating ){
            this.foundCenter()
            const offsetX = e.clientX - this.centerX;
            const offsetY = this.centerY - e.clientY; //y-coords flipped
            let rad;
            if (offsetX >= 0 && offsetY >= 0){ rad = Math.atan(offsetY / offsetX); }
            else if (offsetX < 0 && offsetY >= 0) { rad = (Math.PI / 2) + Math.atan(-offsetX / offsetY); }
            else if (offsetX < 0 && offsetY < 0) { rad = Math.PI + Math.atan(offsetY / offsetX); }
            else { rad = (3 * Math.PI / 2) + Math.atan(offsetX / -offsetY); }
            this.deg = (180 / Math.PI) * rad;
            
            this.knobElement.style = `transform: rotateZ(-${this.deg+270}deg)`;
            this.updateValue(this.component);
    }
    },
    foundCenter(){
       
       let topPosition =  this.knobElement.offsetTop
       let leftPosition = this.knobElement.offsetLeft
       this.centerY = topPosition + (this.knobElement.offsetHeight/2)
       this.centerX = leftPosition + (this.knobElement.offsetWidth/2) 

    },
    draw(){
        if (!this.isPresent){
            this.isPresent = true
            let htmlContent = `
            <div class = " knob knob-${this.id}">
                <div class='knob-point'> </div>
            </div>`
            let knobContenair = document.querySelector('.controls-knobs')
            knobContenair.insertAdjacentHTML('beforeend', htmlContent)  
            this.eventListeners()
        }   
    },
    eventListeners(){
        this.knobElement = document.querySelector(`.knob-${this.id}`)
        this.knobElement.addEventListener('pointerdown',this.onPointerDown.bind(this)) // binding this to keep context 
        document.addEventListener('pointerup',this.onPointerUp.bind(this))
        document.addEventListener('pointermove',this.onPointerMove.bind(this))
 
    }

}
export const ResistorsKnobs = {
    value : 0 ,
    type: 'resistor',
    oldPosition : 90 ,
    updateValue(R){
       
        if ((this.deg >= this.oldPosition + 36  && this.oldPosition -this.deg > -300  ) || (this.oldPosition - this.deg>300)){
           R.ohm -= Math.floor(R.ohm/2)
           if (R.ohm < 10) R.ohm = 10
           this.oldPosition = this.deg
        }else if ((this.deg <= this.oldPosition - 36 && this.oldPosition - this.deg<300) || (this.oldPosition -this.deg < -300)){
            R.ohm += Math.ceil(R.ohm)
            if (R.ohm > 10000) R.ohm = 10000
            this.oldPosition = this.deg
         }
       
    }
}
export const CapacitorsKnobs = {
    value : 0 ,
    type : 'capacitor',
    oldPosition : 90 ,
    updateValue(C){
        if ((this.deg >= this.oldPosition + 36  && this.oldPosition -this.deg > -300  ) || (this.oldPosition - this.deg>300)){
            C.capacity -= C.capacity/2
            C.capacity = this.formatValue(C.capacity)
            if (C.capacity < 0.00001) C.capacity = 0.00001
            this.oldPosition = this.deg
         }else if ((this.deg <= this.oldPosition - 36 && this.oldPosition - this.deg<300) || (this.oldPosition -this.deg < -300)){
             C.capacity += C.capacity
             C.capacity = this.formatValue(C.capacity)
             if (C.capacity > 1) C.capacity = 1
             this.oldPosition = this.deg
          }
    },
    formatValue(value){
       return (Math.round(value * 10000))/10000
    }
}