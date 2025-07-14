function init(){

const gridElem = document.querySelector('.grid')



const cells = []
const gridWidth = 5
const gridheight = 6
const numberCells =  gridWidth * gridheight

 function createGrid(){
     //For every cell create a div
    //Append this to our grid
    for (let i = 0; i < numberCells; i++){
    const cell = document.createElement('div')

    cell.textContent = i
    cells.push(cell)
    gridElem.appendChild(cell)
 }
console.log(cells)

}



createGrid()






















}
document.addEventListener('DOMContentLoaded',init);