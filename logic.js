//LOGIC PLAN
//#region 
/*

when generating the game, add classes to the grid squares that say what's in them
the last class in the classList array will be the type of room that grid square is

LOGIC FOR ROOM GENERATION
variables that store the number of x item that has to be in the game
let neededOre=3
let neededFluff=3
let neededDragons=2
etc.
do a foreach through an array containing each grid square
check what's needed, add it to x room, fill empty ones with rats or whatever.
let BOSSES = [] (possible boss rooms to randomize through and add)
let RESOURCES = [] (possible resource rooms to randomize through and add)
let RATS = [] (rat rooms)
let SCORPIONS = [] (you get the idea)

LOGIC FOR FINDING WHAT ACTIONS TO DO IN A ROOM
let roomType = room.classList[room.classList.length-1];
--> returns 'fish' or 'dragon' or 'miningAndFluff' etc.


*/
//#endregion

//DOM ELEMENTS
//#region

let actionText = document.getElementById('actionP');

//grid elements
let home = document.getElementById('home');

//#endregion


//FUNCTIONS
//#region

//function that changes the text in the action box
function changeActionText(text) {
    //arg is the text that appears
    actionText.innerHTML=text;
}

//walk function grid
let gameGrid = [[],
                [],
                [],
                [],
                []];

function walkHere(grid) {
    console.log('walking to '+grid);
    //5 arrays for 5 rows of rooms
    //get current location and requested location
    //get # of squares left or right (compare array locations)
    //get # of square up or down (compare which array)
    //random chance to move left or right first or up or down first
    //move rooms along the path until you get there
}

//#endregion

//EVENT LISTENERS
//#region 

document.querySelectorAll('.gameGrid').forEach(grid=>{
    grid.addEventListener('mouseenter', e => {changeActionText('Walk Here')});
    grid.addEventListener('mouseleave', e => {changeActionText('—')});
    grid.addEventListener('click', e => {walkHere(grid.classList[grid.classList.length-1])});
})

//#endregion


//TICK LOOP
//#region 

//#endregion