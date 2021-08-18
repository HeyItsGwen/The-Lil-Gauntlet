//TODO
/*

boss fight simulation for v1

invy icons
instruction popup

actual boss fight if i come back for v2
    swap to boss fight grid
    hunllef ai
    prayer swapping
    weapon swapping

*/

//THINGS TO STOP THE LOOP FROM DESTORYING PEOPLES PC MEMORY!!!!
//#region
//get current game tick
let currentTick=0;
//set variable for last time user interacted with the page
let lastClickedTick=0;
//check for user interacting with the page
document.addEventListener('mousedown',e=>{
    //add last tick user interacted with the page to a variable
    lastClickedTick=0;
});
////#endregion

//DOM ELEMENTS
//#region
let actionText = document.getElementById('actionP');
let actionOption = document.getElementById('actionOption');
//tick counter
let tickCounterP = document.getElementById('tickCounterP');
//inventory elements
let invFish = document.getElementById('invFish');
let invCookedFish = document.getElementById('invCookedFish');
let invHerbs = document.getElementById('invHerbs');
let invPotions = document.getElementById('invPotions');
let invBark = document.getElementById('invBark');
let invOre = document.getElementById('invOre');
let invFluff = document.getElementById('invFluff');
let invFrames = document.getElementById('invFrames');
let invOrbs = document.getElementById('invOrbs');
let invBowstring = document.getElementById('invBowstring');
let invSpikes = document.getElementById('invSpikes');
let invBow = document.getElementById('invBow');
let invHalberd = document.getElementById('invHalberd');
let invStaff = document.getElementById('invStaff');
let invBow2 = document.getElementById('invBow2');
let invHalberd2 = document.getElementById('invHalberd2');
let invStaff2 = document.getElementById('invStaff2');

let bossTile = document.getElementById('boss');

let resetButton = document.getElementById('resetButton');
//#endregion

resetButton.addEventListener('click', e=>{
    let resetConfirm = confirm('Really reset the board?');
    if(resetConfirm){
        location.reload();
    }
});

//grid random generation
//24 tiles total
//#region 
let bosses = ['dragon','darkbeast','bear'];
let bossTiles = [];//only 3 possible, 1 for each demiboss and a dupe one

let resources = ['rats','scorpions','fluff','fluff','rats','scorpions','tree','fluff','tree','herbs','rock','tree','rock','rock','herbs','herbs'];
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
        grid.classList[grid.classList.length-1]=='bossRoom'?changeActionText(`Fight the hunllef? (${bossKillChance()}% chance of success)`):'';
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

//player variables
let ticksUsed = 0;

//inventory variables
let fish = 0;
let cookedFish = 0;
let herbs = 0;
let potions = 0;
let fluff = 0;
let ore = 0;
let bark = 0;
let frame = 0;
let bow = false; //basic
let bowstring = false;
let bow2 = false; //upgraded
let staff = false;
let orb = false;
let staff2 = false;
let halberd = false;
let spike = false;
let halberd2 = false;
let armor = false;
let perfectArmor = false;

let bossKillChance = () => {
    killChance = 0;
    let numOfWeapons=0;
    let numOfPerfectWeapons=0;
    if(bow){
        numOfWeapons+=1;
    } if (staff){
        numOfWeapons+=1;
    } if (halberd){
        numOfWeapons+=1;
    }

    if(bow2){
        numOfPerfectWeapons+=1;
    } if (staff2){
        numOfPerfectWeapons+=1;
    } if (halberd2){
        numOfPerfectWeapons+=1;
    }

    if(numOfWeapons == 1 && numOfPerfectWeapons == 0){
        killChance += 5
    }
    if (numOfWeapons == 2 && numOfPerfectWeapons == 0){
        killChance += 10;
    }
    if (numOfPerfectWeapons == 1 && numOfWeapons>0){
        killChance += 20;
    }
    if (numOfPerfectWeapons >=2){
        killChance += 30;
    }
    if (armor){
        killChance += 10;
    }
    if (perfectArmor){
        killChance += 20;
    }
    if(numOfWeapons > 2&&numOfPerfectWeapons==0){
        killChance += 10;
    }
    if(numOfPerfectWeapons > 2){
        killChance += 20;
    }

    killChance += cookedFish * 2;
    killChance += potions * 4;
    killChance>95?killChance=95:'';
    return killChance;
}

bossTile.addEventListener('click', e=>{
    let conf = confirm(`Really fight the hunllef?\nYou have a ${bossKillChance()}% chance of winning!`);
    if(conf) {
        let rand = Math.random()*100;
        if(rand>bossKillChance()) {
            let confLose = confirm('Oh dear, you are dead!\nReset?');
            if(confLose){
                location.reload();
            }
        } else {
            let confWin = confirm(`You beat the hunllef in ${ticksUsed} ticks!!!\nReset?`);
            if(confWin){
                location.reload();
            }
        }
    }
});

//inventory/crafting functions
let cookFish = () => {
    ticksUsed += fish;
    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
    cookedFish += fish;
    fish = 0;
    invCookedFish.innerHTML=`cooked fish: ${cookedFish}`;
    hide('fishAction');
}

let makePotions = () => {
    ticksUsed += herbs*2;
    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
    potions += herbs;
    herbs = 0;
    invPotions.innerHTML=`potions: ${potions}`;
    hide('potionAction');
}

let makeBasicWeapon = weapon => {
    ticksUsed+=3;
    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
    //function takes a text string as an arg to determine what weapon to make
    if(weapon==='bow'){
        bow=true;
        hide('bowLink');
    } else if (weapon==='halberd') {
        halberd=true;
        hide('halberdLink');
    } else if (weapon==='staff') {
        staff=true;
        hide('staffLink');
    }
    frame-=1;
    if(frame===0){
        hide('bowLink');
        hide('halberdLink');
        hide('staffLink');
    } else{
        invFrames.innerHTML=`weapons frames: ${frame}`;
    }
}

let makePerfectWeapon = weapon => {
    ticksUsed +=3;
    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
    if(weapon==='bow'){
        bowstring=false;
        bow=false;
        bow2=true;
        hide('perfectBowLink');
    } else if (weapon==='halberd'){
        spike=false;
        halberd=false;
        halberd2=true;
        hide('perfectHalberdLink');
    } else if (weapon==='staff'){
        orb=false;
        staff=false;
        staff2=true;
        hide('perfectStaffLink');
    }
    canMakePerfected=false;
}

let makeBasicArmor = () => {
    if(!armor&&!perfectArmor){
        ticksUsed+=3;
        tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
        fluff=fluff-1;
        bark=bark-1;
        ore=ore-1;
        armor = true;
        hide('armorLink');
    }
}

let makePerfectArmor = () => {
    if(!perfectArmor){
        ticksUsed+=3;
        tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
        fluff=fluff-2;
        bark=bark-2;
        ore=ore-2;
        armor = false;
        perfectArmor = true;
        hide('perfectArmorLink');
    }
}

//TICK LOOP
//#region

let lastTickTile = '.grid33';

let ticks = setInterval(()=>{
    currentTick+=1;
    lastClickedTick+=1;
    //check how recently the user interacted with the page so the loop doesn't run forever
    if(lastClickedTick<=150) {
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
                } else if(document.querySelector(playerLocationClassTile()).classList.contains('darkbeast')){
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
            //add a tick for moving
            ticksUsed+=1;
            tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
            if (document.querySelector(playerLocationClassTile()).classList.contains('empty')){
                //and show the appropriate actions
                show('awayAction');
                currentActionText='Empty';
                changeActionText(currentActionText);
                currentActionOption='—';
                changeActionOption(currentActionOption);
            } else if(document.querySelector(playerLocationClassTile()).classList.contains('fish')){
                //and show the appropriate actions
                show('awayAction');
                currentActionText='Resource: Fish';
                //change action text
                changeActionText(currentActionText);
                currentActionOption='Fish the Fish (4 ticks)';
                changeActionOption(currentActionOption);
                //handle the option being clicked
            } else if(document.querySelector(playerLocationClassTile()).classList.contains('demiboss')){
                //and show the appropriate actions
                show('awayAction');
                currentActionText=`Demiboss: ${currentTileClasslist[currentTileClasslist.length-2]}!`;
                changeActionText(currentActionText);
                currentActionOption=`Fight the ${currentTileClasslist[currentTileClasslist.length-2]}! (6 ticks)`;
                changeActionOption(currentActionOption);
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('herbs')) {
                //and show the appropriate actions
                show('awayAction');
                currentActionText='Resource: Herbs';
                changeActionText(currentActionText);
                currentActionOption='Pick the herbs (2 ticks)';
                changeActionOption(currentActionOption);
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('fluff')) {
                //and show the appropriate actions
                show('awayAction');
                currentActionText='Resource: Fluff';
                changeActionText(currentActionText);
                currentActionOption='Pick the fluff (2 ticks)';
                changeActionOption(currentActionOption);
                //handle the option being clicked
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('tree')) {
                //and show the appropriate actions
                show('awayAction');
                currentActionText='Resource: Tree';
                changeActionText(currentActionText);
                currentActionOption='Chop the tree (2 ticks)';
                changeActionOption(currentActionOption);
                //handle the option being clicked
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('rock')) {
                //and show the appropriate actions
                show('awayAction');
                currentActionText='Resource: Ores';
                changeActionText(currentActionText);
                currentActionOption='Mine the ore (2 ticks)';
                changeActionOption(currentActionOption);
                //handle the option being clicked
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('rats')) {
                //and show the appropriate actions
                show('awayAction');
                currentActionText='Enemy: Rat';
                changeActionText(currentActionText);
                currentActionOption='Fight the Rat (2 ticks)';
                changeActionOption(currentActionOption);
                //handle the option being clicked
            } else if (document.querySelector(playerLocationClassTile()).classList.contains('scorpions')) {
                //and show the appropriate actions
                show('awayAction');
                currentActionText='Enemy: Scorpion'
                changeActionText(currentActionText);
                currentActionOption='Fight the Scorpion (2 ticks)';
                changeActionOption(currentActionOption);
                //handle the option being clicked
            } 

            lastTickTile=playerLocationClassTile();
        }

        if (document.querySelector(playerLocationClassTile()).classList.contains('home')) {
            currentActionText='Home';
            changeActionText(currentActionText);
            //check if have fish to cook, or armor or weapons to make, and give options accordingly
            //otherwise make it blank
            let canMakePerfected = false;
            if(fish>0){
                //hide the away actions
                hide('awayAction');
                document.querySelector('.fishAction').innerHTML=`Cook your Fish (${fish} ticks)`;
                //show the correct 'crafting' link
                show('fishAction');
                document.querySelector('.fishAction').addEventListener('click',e=>{
                    cookFish();
                });
            }
            if(frame!=0){
                hide('awayAction');
                //check if player already has a weapon, if not show the link
                !bow?show('bowLink'):'';
                $('.bowLink').unbind().click(()=>{
                    makeBasicWeapon('bow');
                });
                !staff?show('staffLink'):'';
                $('.staffLink').unbind().click(()=>{
                    makeBasicWeapon('staff');
                });
                !halberd?show('halberdLink'):'';
                $('.halberdLink').unbind().click(()=>{
                    makeBasicWeapon('halberd');
                });
                //if player has a frame but has all 3 weapons, don't show any link and show awayAction
                bow&&staff&&halberd?show('awayAction'):'';
            }
            if(bow&&bowstring){
                canMakePerfected=true;
                hide('awayAction');
                show('perfectBowLink');
                $('.perfectBowLink').unbind().click(()=>{
                    makePerfectWeapon('bow');
                });
            }
            if(staff&&orb){
                canMakePerfected=true;
                hide('awayAction');
                show('perfectStaffLink');
                $('.perfectStaffLink').unbind().click(()=>{
                    makePerfectWeapon('staff');
                });
            }
            if(halberd&&spike){
                canMakePerfected=true;
                hide('awayAction');
                show('perfectHalberdLink');
                $('.perfectHalberdLink').unbind().click(()=>{
                    makePerfectWeapon('halberd');
                });
            }
            if(herbs>0) {
                hide('awayAction');
                document.querySelector('.potionAction').innerHTML=`Make Potions (${herbs*2} ticks)`
                show('potionAction')
                document.querySelector('.potionAction').addEventListener('click',e=>{
                    makePotions();
                    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
                });
            }
            if(ore>0&&fluff>0&&bark>0){
                if(!armor) {
                    hide('awayAction');
                    show('armorLink');
                    $(this).one('click',e=>{
                        makeBasicArmor();
                    })
                }
            }
            if(armor&&ore>=1&&fluff>=2&&bark>=2){
                hide('awayAction');
                show('perfectArmorLink');
                document.querySelector('.perfectArmorLink').addEventListener('click',e=>{
                    makePerfectArmor();
                })
            }
            if(fish===0&&frame===0&&herbs===0&&!canMakePerfected) {
                show('awayAction');
                currentActionOption='—';
                changeActionOption(currentActionOption);
            }
        } else {
            hide('bowLink');
            hide('staffLink');
            hide('halberdLink');
            hide('perfectBowLink');
            hide('perfectStaffLink');
            hide('perfectHalberdLink');
            hide('armorLink');
            hide('perfectArmorLink');
            hide('homeAction');
        }

        actionOption.addEventListener('click',e=>{
            if(!emptyTiles.includes(playerLocationClassTile())&&!document.querySelector(playerLocationClassTile()).classList.contains('home')){
                document.querySelector(playerLocationClassTile()).classList.add('empty');
                if(document.querySelector(playerLocationClassTile()).classList.contains('fish')){
                    fish+=4;
                    ticksUsed+=4;
                    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
                    emptyTiles.push(playerLocationClassTile());
                    currentActionText='Empty';
                    changeActionText(currentActionText);
                    currentActionOption='—';
                    changeActionOption(currentActionOption);
                    invFish.innerHTML=`Raw fish: ${fish}`;
                } else if (document.querySelector(playerLocationClassTile()).classList.contains('herbs')) {
                    herbs++;
                    ticksUsed+=2;
                    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
                    emptyTiles.push(playerLocationClassTile());
                    currentActionText='Empty';
                    changeActionText(currentActionText);
                    currentActionOption='—';
                    changeActionOption(currentActionOption);
                    invHerbs.innerHTML=`Herbs: ${herbs}`;
                } else if (document.querySelector(playerLocationClassTile()).classList.contains('fluff')) {
                    fluff++;
                    ticksUsed+=2;
                    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
                    emptyTiles.push(playerLocationClassTile());
                    currentActionText='Empty';
                    changeActionText(currentActionText);
                    currentActionOption='—';
                    changeActionOption(currentActionOption);
                    invFluff.innerHTML=`Fluff: ${fluff}`
                } else if (document.querySelector(playerLocationClassTile()).classList.contains('tree')) {
                    bark++;
                    ticksUsed+=2;
                    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
                    emptyTiles.push(playerLocationClassTile());
                    currentActionText='Empty';
                    changeActionText(currentActionText);
                    currentActionOption='—';
                    changeActionOption(currentActionOption);
                    invBark.innerHTML=`Bark: ${bark}`;
                } else if (document.querySelector(playerLocationClassTile()).classList.contains('rock')) {
                    ore++;
                    ticksUsed+=2;
                    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
                    emptyTiles.push(playerLocationClassTile());
                    currentActionText='Empty';
                    changeActionText(currentActionText);
                    currentActionOption='—';
                    changeActionOption(currentActionOption);
                    invOre.innerHTML=`Ore: ${ore}`;
                } else if (document.querySelector(playerLocationClassTile()).classList.contains('scorpions')) {
                    frame++;
                    ticksUsed+=2;
                    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
                    emptyTiles.push(playerLocationClassTile());
                    currentActionText='Empty';
                    changeActionText(currentActionText);
                    currentActionOption='—';
                    changeActionOption(currentActionOption);
                    invFrames.innerHTML=`Frames: ${frame}`;
                } else if (document.querySelector(playerLocationClassTile()).classList.contains('rats')) {
                    ticksUsed+=2;
                    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
                    Math.floor(Math.random()*4)===0?frame++:"";
                    emptyTiles.push(playerLocationClassTile());
                    currentActionText='Empty';
                    changeActionText(currentActionText);
                    currentActionOption='—';
                    changeActionOption(currentActionOption);
                    invFrames.innerHTML=`Frames: ${frame}`;
                } else if (document.querySelector(playerLocationClassTile()).classList.contains('dragon')) {
                    orb=true;
                    frame+=1;
                    ticksUsed+=6;
                    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
                    document.querySelector('#invFrames').innerHTML=`Frames: ${frame}`;
                    emptyTiles.push(playerLocationClassTile());
                    currentActionText='Empty';
                    changeActionText(currentActionText);
                    currentActionOption='—';
                    changeActionOption(currentActionOption);
                } else if (document.querySelector(playerLocationClassTile()).classList.contains('darkbeast')) {
                    bowstring=true;
                    frame+=1;
                    ticksUsed+=6;
                    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
                    document.querySelector('#invFrames').innerHTML=`Frames: ${frame}`;
                    emptyTiles.push(playerLocationClassTile());
                    currentActionText='Empty';
                    changeActionText(currentActionText);
                    currentActionOption='—';
                    changeActionOption(currentActionOption);
                } else if (document.querySelector(playerLocationClassTile()).classList.contains('bear')) {
                    spike=true;
                    frame+=1;
                    ticksUsed+=6;
                    tickCounterP.innerHTML=`ticks used: ${ticksUsed}`;
                    document.querySelector('#invFrames').innerHTML=`Frames: ${frame}`;
                    emptyTiles.push(playerLocationClassTile());
                    currentActionText='Empty';
                    changeActionText(currentActionText);
                    currentActionOption='—';
                    changeActionOption(currentActionOption);
                }
            }
        });

        document.querySelectorAll('.empty').forEach(empty => {
            empty.style.backgroundImage='url(./images/blankVisited.png)';
        })

        //inventory item visibility management
        //#region 
        fish===0?hide('fishInv'):show('fishInv');
        cookedFish===0?hide('cookedFishInv'):show('cookedFishInv');
        herbs===0?hide('herbInv'):show('herbInv');
        potions===0?hide('potionsInv'):show('potionsInv');
        bark===0?hide('barkInv'):show('barkInv');
        ore===0?hide('oreInv'):show('oreInv');
        fluff===0?hide('fluffInv'):show('fluffInv');
        frame===0?hide('framesInv'):show('framesInv');
        !bow?hide('bowInv'):show('bowInv');
        !bowstring?hide('bowstringInv'):show('bowstringInv');
        !bow2?hide('bow2Inv'):show('bow2Inv');
        !staff?hide('staffInv'):show('staffInv');
        !orb?hide('orbsInv'):show('orbsInv');
        !staff2?hide('staff2Inv'):show('staff2Inv');
        !halberd?hide('halberdInv'):show('halberdInv');
        !spike?hide('spikesInv'):show('spikesInv');
        !halberd2?hide('halberd2Inv'):show('halberd2Inv');
        !armor?hide('armorInv'):show('armorInv');
        !perfectArmor?hide('perfectArmorInv'):show('perfectArmorInv');

        //#endregion
    } else {
        console.log('paused');
    }
},600);

//#endregion