//DOM ELEMENTS
let actionText = document.getElementById('actionP');
let actionOption = document.getElementById('actionOption');
//inventory elements
let invFish = document.getElementById('invFish');
let invHerbs = document.getElementById('invHerbs');
let invBark = document.getElementById('invBark');
let invOre = document.getElementById('invOre');
let invFluff = document.getElementById('invFluff');
let invFrames = document.getElementById('invFrames');

//grid random generation
//24 tiles total
//#region 
let bosses = ['dragon','dark-beast','bear'];
let bossTiles = [];//only 3 possible, 1 for each demiboss and a dupe one

let resources = ['rats','rats','fluff','fluff','rats','scorpions','tree','fluff','tree','herbs','rock','tree','rock','rock','herbs','herbs'];
let resourceTiles = [];//16 possible, includes rats, scorpions, and armor stuff

let fishTiles = [];//5 possible

//array of all available un-generated/used tiles
let insideTiles = ['grid22','grid32','grid42','grid23','grid43','grid24','grid34','grid44'];
//outside ring
let outsideTiles = ['grid11','grid21','grid31','grid41','grid51','grid12','grid52','grid13','grid53','grid14','grid54','grid15','grid25','grid35','grid45','grid55'];
//array of empty tiles to be added to
let emptyTiles = [];

window.onload = function() {
    actionText.innerHTML='—';
    //loop 4 times to make boss tiles
    for(i=0; i<3; i++){
        //pick a random location from outside tiles
        let randomGrid=Math.floor(Math.random()*outsideTiles.length);
        //add it to the boss tile array
        bossTiles.push(outsideTiles[randomGrid]);
        //remove it from outside tiles
        outsideTiles.splice(randomGrid,1);
    }
    //loop through the boss array and add the specified boss class to the grid tiles
    for(i in bossTiles){
        //add the specific demiboss name
        document.querySelector(`.${bossTiles[i]}`).classList.add(bosses[i]);
        //add generic "boss" class
        document.querySelector(`.${bossTiles[i]}`).classList.add('demiboss');
    }

    //loop 14 times for resources
    for(i=0; i<16; i++){
        if(i%2==0 && i!=0){
            let randomGrid=Math.floor(Math.random()*insideTiles.length);
            resourceTiles.push(insideTiles[randomGrid]);
            insideTiles.splice(randomGrid,1);
        } else {
            let randomGrid=Math.floor(Math.random()*outsideTiles.length);
            resourceTiles.push(outsideTiles[randomGrid]);
            outsideTiles.splice(randomGrid,1);
        }
    }
    //loop through the resource array and add the specified resource class to the grid tiles
    for(i in resourceTiles){
        document.querySelector(`.${resourceTiles[i]}`).classList.add(resources[i]);
    }

    //add rest of tiles to fishies
    for(i in insideTiles){
        fishTiles.push(insideTiles[i]);
    }
    for(i in outsideTiles){
        fishTiles.push(outsideTiles[i]);
    }
    //loop through the fish array and add the fish class to the grid tiles
    for(i in fishTiles){
        document.querySelector(`.${fishTiles[i]}`).classList.add('fish');
    }

    //maybe just add a class to the dom element and check that when revealing a tile?
    //that's probably easier tbf
}
//#endregion

//function that changes the text in the action box
function changeActionText(text) {
    //arg is the text that appears
    actionText.innerHTML=text;
}
function changeActionOption(text) {
    actionOption.innerHTML=text;
}

let currentActionText="Home";
let currentActionOption="—";

//query selectors to give all grid squares their proper mouseover text
document.querySelectorAll('.gameGrid').forEach(grid=>{
    grid.addEventListener('mouseover', e => {
        grid.classList[grid.classList.length-1]!='grid33'?changeActionText('Walk here'):'';
        grid.classList[grid.classList.length-1]=='grid33'?changeActionText('Walk home'):'';
        grid.classList[grid.classList.length-1]=='bossRoom'?changeActionText('Fight the hunllef?'):'';
    });
    grid.addEventListener('mouseout', e => {changeActionText(currentActionText)});
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
//return a playerLocation [3.3] as my grid class tile format grid33
function playerLocationClassTile(){
    let a = playerLocation[0];
    let b = playerLocation[1];
    return(`.grid${a}${b}`);
}

//inventory variables
let fish = 0;
let herbs = 0;
let fluff = 0;
let ore = 0;
let bark = 0;
let frame = 0;
let bow = 0; //basic
let bowstring = 0;
let bow2 = 0; //upgraded
let staff = 0;
let orb = 0;
let staff2 = 0;
let halberd = 0;
let spike = 0;
let halberd2 = 0;

//TICK LOOP
//#region

let lastTickTile = '.grid33';

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
            //check current tile query selector classList for bosses, resources, etc.
            //change background to that
            if(document.querySelector(playerLocationClassTile()).classList.contains('fish')){
                document.querySelector(playerLocationClassTile()).style.backgroundImage='url(./images/fishVisited.png)';
            } else if(document.querySelector(playerLocationClassTile()).classList.contains('dragon')){
                document.querySelector(playerLocationClassTile()).style.backgroundImage='url(./images/dragonVisited.png)';
            } else if(document.querySelector(playerLocationClassTile()).classList.contains('dark-beast')){
                document.querySelector(playerLocationClassTile()).style.backgroundImage='url(./images/darkbeastVisited.png)';
            } else if(document.querySelector(playerLocationClassTile()).classList.contains('bear')){
                document.querySelector(playerLocationClassTile()).style.backgroundImage='url(./images/bearVisited.png)';
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('herbs')) {
                document.querySelector(playerLocationClassTile()).style.backgroundImage='url(./images/herbVisited.png)';
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('fluff')) {
                document.querySelector(playerLocationClassTile()).style.backgroundImage='url(./images/fluffVisited.png)';
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('tree')) {
                document.querySelector(playerLocationClassTile()).style.backgroundImage='url(./images/treeVisited.png)';
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('rock')) {
                document.querySelector(playerLocationClassTile()).style.backgroundImage='url(./images/rocksVisited.png)';
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('rats')) {
                document.querySelector(playerLocationClassTile()).style.backgroundImage='url(./images/ratsVisited.png)';
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('scorpions')) {
                document.querySelector(playerLocationClassTile()).style.backgroundImage='url(./images/scorpionsVisited.png)';
            }
        }

        show(playerLocationClassImg());
    }
    
    //change action text/player options based on current tile
    let currentTileClasslist=document.querySelector(playerLocationClassTile()).classList; //gets classlist for the name of the boss
    if (playerLocationClassTile()!=lastTickTile){
        if (document.querySelector(playerLocationClassTile()).classList.contains('empty')){
            currentActionText='Empty';
            changeActionText(currentActionText);
            currentActionOption='—';
            changeActionOption(currentActionOption);
        } else if(document.querySelector(playerLocationClassTile()).classList.contains('fish')){
            currentActionText='Resource: Fish';
            //change action text
            changeActionText(currentActionText);
            currentActionOption='Fish the Fish';
            changeActionOption(currentActionOption);
            //handle the option being clicked
        } else if(document.querySelector(playerLocationClassTile()).classList.contains('demiboss')){
            currentActionText=`Demiboss: ${currentTileClasslist[currentTileClasslist.length-2]}!`;
            changeActionText(currentActionText);
            currentActionOption=`Fight the ${currentTileClasslist[currentTileClasslist.length-2]}!`;
            changeActionOption(currentActionOption);
        } else if (document.querySelector(playerLocationClassTile()).classList.contains('herbs')) {
            currentActionText='Resource: Herbs';
            changeActionText(currentActionText);
            currentActionOption='Pick the herbs';
            changeActionOption(currentActionOption);
        } else if (document.querySelector(playerLocationClassTile()).classList.contains('fluff')) {
            currentActionText='Resource: Fluff';
            changeActionText(currentActionText);
            currentActionOption='Pick the fluff';
            changeActionOption(currentActionOption);
            //handle the option being clicked
        } else if (document.querySelector(playerLocationClassTile()).classList.contains('tree')) {
            currentActionText='Resource: Tree';
            changeActionText(currentActionText);
            currentActionOption='Chop the tree';
            changeActionOption(currentActionOption);
            //handle the option being clicked
        } else if (document.querySelector(playerLocationClassTile()).classList.contains('rock')) {
            currentActionText='Resource: Ores';
            changeActionText(currentActionText);
            currentActionOption='Mine the ore';
            changeActionOption(currentActionOption);
            //handle the option being clicked
        } else if (document.querySelector(playerLocationClassTile()).classList.contains('rats')) {
            currentActionText='Enemy: Rat';
            changeActionText(currentActionText);
            currentActionOption='Fight the Rat';
            changeActionOption(currentActionOption);
            //handle the option being clicked
        } else if (document.querySelector(playerLocationClassTile()).classList.contains('scorpions')) {
            currentActionText='Enemy: Scorpion'
            changeActionText(currentActionText);
            currentActionOption='Fight the Scorpion';
            changeActionOption(currentActionOption);
            //handle the option being clicked
        } else if (document.querySelector(playerLocationClassTile()).classList.contains('home')) {
            currentActionText='Home';
            changeActionText(currentActionText);
            //check if have fish to cook, or armor or weapons to make, and give options accordingly
            //otherwise make it blank
            currentActionOption='—';
            changeActionOption(currentActionOption);
        }
        lastTickTile=playerLocationClassTile();
    }

    actionOption.addEventListener('click',e=>{
        if(!emptyTiles.includes(playerLocationClassTile())){
            document.querySelector(playerLocationClassTile()).classList.add('empty');
            if(document.querySelector(playerLocationClassTile()).classList.contains('fish')){
                fish+=4;
                emptyTiles.push(playerLocationClassTile());
                currentActionText='Empty';
                changeActionText(currentActionText);
                currentActionOption='—';
                changeActionOption(currentActionOption);
                invFish.innerHTML=`raw fish: ${fish}`;
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('herbs')) {
                herbs++;
                emptyTiles.push(playerLocationClassTile());
                currentActionText='Empty';
                changeActionText(currentActionText);
                currentActionOption='—';
                changeActionOption(currentActionOption);
                invHerbs.innerHTML=`herbs: ${herbs}`;
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('fluff')) {
                fluff++;
                emptyTiles.push(playerLocationClassTile());
                currentActionText='Empty';
                changeActionText(currentActionText);
                currentActionOption='—';
                changeActionOption(currentActionOption);
                invFluff.innerHTML=`fluff: ${fluff}`
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('tree')) {
                bark++;
                emptyTiles.push(playerLocationClassTile());
                currentActionText='Empty';
                changeActionText(currentActionText);
                currentActionOption='—';
                changeActionOption(currentActionOption);
                invBark.innerHTML=`bark: ${bark}`;
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('rock')) {
                ore++;
                emptyTiles.push(playerLocationClassTile());
                currentActionText='Empty';
                changeActionText(currentActionText);
                currentActionOption='—';
                changeActionOption(currentActionOption);
                invOre.innerHTML=`ore: ${ore}`;
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('scorpions')) {
                frame++;
                emptyTiles.push(playerLocationClassTile());
                currentActionText='Empty';
                changeActionText(currentActionText);
                currentActionOption='—';
                changeActionOption(currentActionOption);
                invFrames.innerHTML=`weapon frames: ${frame}`;
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('rats')) {
                Math.floor(Math.random()*4)===0?frame++:"";
                emptyTiles.push(playerLocationClassTile());
                currentActionText='Empty';
                changeActionText(currentActionText);
                currentActionOption='—';
                changeActionOption(currentActionOption);
                invFrames.innerHTML=`weapon frames: ${frame}`;
            }
        }
    });

    document.querySelectorAll('.empty').forEach(empty => {
        empty.style.backgroundImage='url(./images/blankVisited.png)';
    })
},600)

//#endregion