export const Trade = {
    wallet : 1000,
    crypto : 0 ,
    fee :0.00004,
    counter : 0,
    oldLevel : 0,
    buy (direction,spotPrice ,level) {
        if (this.oldLevel > level ) this.oldLevel = level
        if (direction === 1 && this.wallet > 0) {
           this.counter = level - this.oldLevel 
            if ( this.counter > 0 ){
                this.oldLevel  = level 
            this.wallet -=  this.wallet * this.fee
            this.crypto = this.wallet / spotPrice
            this.wallet = 0
        }
    }
    },
    sell (direction,spotPrice) {
        if (direction === -1 && this.crypto > 0) {
            this.wallet = this.crypto * spotPrice 
            this.wallet -=  this.wallet * this.fee
            this.crypto = 0
        }
    }

}