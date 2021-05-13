//DOM ELEMENTS
//#region

let actionText = document.getElementById('actionP');

//grid elements
let home = document.querySelector('.home');

//#endregion

//LOGIC PLAN
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

//grid random generation
//24 tiles total
let bossTiles = [];//only 4 possible, 1 for each demiboss and a dupe one
let demibosses = [];
let resourceTiles = [];//13 possible, includes rats, scorpions, and armor stuff
let fishTiles = [];//6 possible

//array of all available un-generated/used tiles
let insideTiles = ['grid22','grid32','grid42','grid23','grid43','grid24','grid34','grid44'];
//outside ring
let outsideTiles = ['grid11','grid21','grid31','grid41','grid51','grid12','grid52','grid13','grid53','grid14','grid54','grid15','grid25','grid35','grid45','grid55'];

window.onload = function() {
    //loop 4 times to make boss tiles
    //loop 13 times for resources
    //loop 6 times for fishies
}

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

//default home location of the player
let playerLocation=[3,3];
//default requested location to be checked against in the walkHere function below
let requestedLocation=[3,3];

//array of visited tiles to change visuals on the page once a player has crossed a tile
let visitedTiles=['.grid33']

function walkHere(row,col) {
    //set requested location to where the player clicked
    requestedLocation=[row,col];
};

//functions to swap d-flex and d-none to show/hide things on the board
//args are input as string i.e. show('DOMclass') hide('DOMclass')
function show (classname) {
    classSwap = document.querySelector(`.${classname}`);

    if (classSwap.classList.contains('d-none')) {
        classSwap.classList.remove('d-none');
        classSwap.classList.add('d-flex');
    }
}
function hide (classname) {
    classSwap = document.querySelector(`.${classname}`);

    if (classSwap.classList.contains('d-flex')) {
        classSwap.classList.remove('d-flex');
        classSwap.classList.add('d-none');
    }
}
//return a playerLocation [3,3] as my grid class image format grid3-3
function playerLocationClassImg(){
    let a = playerLocation[0];
    let b = playerLocation[1];
    return(`grid${a}-${b}`);
}
//return a playerLocation [3.3] as my grind class tile format grid33
function playerLocationClassTile(){
    let a = playerLocation[0];
    let b = playerLocation[1];
    return(`.grid${a}${b}`);
}
//get and hide all tiles player isn't on
function hideNotLocated(){
    let tiles = document.querySelectorAll('.playerImg');
    tiles.forEach(tile => {
    if(!tile.classList.contains(playerLocationClassImg)){
        console.log(tile.classList[tile.classList.length-1]);
    }
})
}

//TICK LOOP
//#region

let ticks = setInterval(()=>{
    //run move function every tick, the function checks if it needs to run or not
    walkHere(requestedLocation[0],requestedLocation[1]);
    //find out if you still need to move (if requestedLocation is different to playerLocation)
    //then do the moving
    if(playerLocation[0]!=requestedLocation[0] || playerLocation[1]!=requestedLocation[1]){
        //reveal the tile the player is on if it hasn't been revealed
        //get current location (variable set) and requested (variable)
        //get # of squares left or right
        let horizontalDiff = Math.abs(playerLocation[0]-requestedLocation[0]);
        //get direction
        let horizontalDirection = 'stay'; //default to 'stay'
        //if current row is less than requested, move right, if greater, move left
        if(playerLocation[0] < requestedLocation[0]) {
            horizontalDirection = 'right';
        } else if (playerLocation[0] > requestedLocation[0]){
            horizontalDirection = 'left';
        } else { //otherwise stay still
            horizontalDirection = 'stay';
        }
        //get # of square up or down
        let verticalDiff = Math.abs(playerLocation[1]-requestedLocation[1]);
        //get direction
        let verticalDirection = 'stay';
        //if current col is less than requested,
        if(playerLocation[1] < requestedLocation[1]) {
            verticalDirection = 'down';
        } else if (playerLocation[1] > requestedLocation[1]){
            verticalDirection = 'up';
        } else {
            verticalDirection = 'stay';
        }

        console.log('horizontal move: ' + horizontalDiff + ' ' + horizontalDirection + ' vertical move: ' + verticalDiff + ' ' + verticalDirection);

        hide(playerLocationClassImg());
    
        if (horizontalDiff != 0) { //if need to move horizontally
            //change playerLocation to one closer horizontally (i.e. [1,1] to [2,1])
            if (horizontalDirection == 'left'){
                playerLocation[0] = playerLocation[0]-1; //move one left
            } else if (horizontalDirection == 'right'){
                playerLocation[0] = playerLocation[0]+1; //move one right
            }
        } else if (verticalDiff != 0) { //if we don't need to move horizontally, but do need to move vertically
            //change playerLocation to one closer vertically (i.e. [1,1] to [1,2]
            if (verticalDirection == 'up'){
                playerLocation[1] = playerLocation[1]-1;
            } else if(verticalDirection == 'down'){
                playerLocation[1] = playerLocation[1]+1;
            }
        }
        //tile revealing and action changing logic
        if(!visitedTiles.includes(playerLocationClassTile(playerLocation))){
            visitedTiles.push(playerLocationClassTile(playerLocation));
            //check boss array to see if tile should be a boss tile
            //check fish array to see if tile should be fish
            //check armour resource array to see if tile should be armour resource
            //etc.

            //this is just for testing
            document.querySelector(playerLocationClassTile()).style.backgroundImage='url(./images/blankVisited.png)';
        }
        show(playerLocationClassImg());
    }
},600)

//#endregion