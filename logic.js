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
let requestedLocation=[];

function walkHere() {
    //find out if you still need to move
    if(playerLocation[0]!=requestedLocation[0] || playerLocation[1]!=requestedLocation[1]){
        //get current location (variable set) and requested (variable)
        //get # of squares left or right
        let horizontalDiff = math.abs(playerLocation[0],row);
        //get direction
        let horizontalDirection = function(a,b){
            if(a>b) {
                return 'left';
            } else if (a<b){
                return 'right';
            } else {
                return '';
            }
        };
        //get # of square up or down
        let verticalDiff = math.abs(playerLocation[1],col);
        //get direction
        let verticalDirection = function(a,b){
            if(a>b) {
                return 'down';
            } else if (a<b){
                return 'up';
            } else {
                return '';
            }
        };
        //move one square every tick
        //check if need to move left/right or up/down
        //if both, randomly choose which to do
        //if one or the other, do one or the other, then
        //change current location array to the new one tile different location
    }    
}

//TICK LOOP
//#region

let ticks = setInterval(()=>{
    //run move function every tick, the function checks if it needs to run or not
    walkHere();

    //check if player is on the home tile
    playerLocation[0]=='3'&&playerLocation[1]=='3'?home.style.backgroundImage='url(./images/HomePlayer.png)':home.style.backgroundImage='url(./images/HomeTile.png)';
},600)

//#endregion