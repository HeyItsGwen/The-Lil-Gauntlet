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
let home = document.querySelector('.home');

//#endregion


//function that changes the text in the action box
function changeActionText(text) {
    //arg is the text that appears
    actionText.innerHTML=text;
}

//query selectors to give all grid squares their proper mouseover text
document.querySelectorAll('.gameGrid').forEach(grid=>{
    grid.addEventListener('mouseenter', e => {
        grid.classList[grid.classList.length-1]!='grid13'?changeActionText('Walk Here'):'';
        grid.classList[grid.classList.length-1]=='grid13'?changeActionText('Walk Home'):'';
        grid.classList[grid.classList.length-1]=='bossRoom'?changeActionText('Fight the hunllef?'):'';
    });
    grid.addEventListener('mouseleave', e => {changeActionText('—')});
});

//walk function grid

let playerLocation=[3,3];

function walkHere(row,gridLocation) {
    console.log('walking to row ' + row + ", grid " + gridLocation);
    playerLocation=[row,gridLocation];
    //5 arrays for 5 rows of rooms
    //get current location and requested location
    //get # of squares left or right (compare array locations)
    //get # of square up or down (compare which array)
    //move rooms along the path every maybe 2 ticks until you get there
}

//TICK LOOP
//#region

let ticks = setInterval(()=>{
    //check if player is on the home tile
    playerLocation[0]=='3'&&playerLocation[1]=='3'?home.style.backgroundImage='url(./images/HomePlayer.png)':home.style.backgroundImage='url(./images/HomeTile.png)';
},600)

//#endregion