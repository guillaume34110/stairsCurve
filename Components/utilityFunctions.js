
export const cleanGraph = () => {
    const graph = document.querySelector('.graph')
    graph.replaceChildren()
}

export const format2dArray = (signalData) => {
    const array2d = [] //generate 2d array and format it for svg draw
    for (let i = 0; i < signalData.length; i++) {
        array2d.push([i, signalData[i]])
    }
    return array2d.join(' ')
}

let conversionToken = 0
export const conversion = async (data) => {
    if (conversionToken === 0 ){
        conversionToken ++
    fetch('../datas/BTC.txt')
    .then(r => r.text())
    .then(text => {
      let bufferText = JSON.parse(text)
      console.log(bufferText)
      data.signal = bufferText
      console.log(data,'data')
    })
 }
}