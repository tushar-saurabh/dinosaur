// Create Human Object
let human = {};

document.getElementById('btn').addEventListener('click', () => {
    // Use IIFE to get human data from form
    (function getData() {
        let name = document.getElementById('name').value;
        let height = document.getElementById('cms').value;
        let weight = document.getElementById('weight').value;
        let continent = document.getElementById('continent').value;
        let diet = document.getElementById('diet').value;
        return human = {name, height, weight, continent, diet};
    })();

    // Remove form upon submission and desplay the grid
    document.getElementById('dino-compare').remove();
    document.getElementById('btn').remove();

    // Create 9 * 9 Grid Tiles
    createGrid(3,3);
});

// Dinosaur's construction function
function Dinosaur(species, weight, height, diet, where, when, fact, imageurl){
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.imageurl = imageurl;
};

// Dinosaur's objects
const dino1 = new Dinosaur("Triceratops", "13000", "114", "herbavor", "North America", "Late Cretaceous", "First discovered in 1889 by Othniel Charles Marsh","images/triceratops.png");
const dino2 = new Dinosaur("Tyrannosaurus Rex", "11905", "144", "carnivor", "North America", "Late Cretaceous", "The largest known skull measures in at 5 feet long.","images/tyrannosaurus rex.png");
const dino3 = new Dinosaur("Anklyosaurus", "10500", "55", "herbavor", "North America", "Late Cretaceous", "Survived for approximately 135 million years.","images/anklyosaurus.png");
const dino4 = new Dinosaur("Brachiosaurus", "70000", "372", "herbavor", "North America", "Late Jurasic", "An asteroid was named 9954 Brachiosaurus in 1991.","images/brachiosaurus.png");
const dino6 = new Dinosaur("Stegosaurus", "11600", "79", "herbavor", "North America, Europe, Asia", "Late Jurasic to Early Cretaceous", "The Stegosaurus had between 17 and 22 seperate places and flat spines.","images/stegosaurus.png");
const dino7 = new Dinosaur("Elasmosaurus", "16000", "59", "carnivor", "North America", "Late Cretaceous", "A marine reptile first discovered in Kansas.","images/elasmosaurus.png");
const dino8 = new Dinosaur("Pteranodon", "44", "20", "carnivor", "North America", "Late Cretaceous", "Actually a flying reptile, not a dinosaur.","images/pteranodon.png");
const dino9 = new Dinosaur("Pigeon", ".5", "9", "herbavor", "Worldwide", "Holocene", "All birds are living dinosaurs.","images/pigeon.png");

let dino = [dino1, dino2, dino3, dino4, dino6, dino7, dino8, dino9];

// Randomize dinos and facts for the tiles
dino = dino.sort( () => (Math.random() - Math.random()));

// Exclude an index for inserting data from form
dino.splice(4,0,'');

/*
    * @description Represents a grid creation
    * @constructor
    * @param {number} row - Grid rows
    * @param {number} column - Grid columns
*/

function createGrid(row, columns){
    let grid = document.getElementById('grid');
    let tile = document.createElement('div');
    let cell;
    let dinoTile;
    let name;
    let specie;
    let info;
    let randomizedfacts;
    let flag = true;

    tile.setAttribute('class', 'grid')
    grid.appendChild(tile);

    // Loop for each tile for a dinosaur
    for(i = 0; i < (row * columns); i++){

        // A randomized facts for the dinosaur for this tile
        randomizedfacts = [ dino[i].where, dino[i].when, dino[i].fact];
        randomizedfacts = randomizedfacts.sort( () => (Math.random() - Math.random()));

        createTag('dinotile','div', 'grid-item', ('grid-item' +(i+1)));
        tile.appendChild(cell);

        // Human Tile at the center of the grid
        if(i === 4){
            
            // Add human image to the human tile
            createImgTag('Human','images/human.png');
            cell.appendChild(dinoTile);

            // Add span for the texts for user data
            createTag('human', 'span', '', 'username');
            cell.appendChild(name);
            document.getElementById("username").innerHTML = human.name;
        }
        // Dinosaurs Tile at other grids
        else { 

            if(flag){
                // Add span for the texts for dino data
                createTag('dino', 'span', '', ('species' + (i+1)));
                cell.appendChild(specie);
                if(dino[i].species  === 'Pigeon'){
                    document.getElementById('species' + (i +1)).innerHTML = dino[i].species + ' :- A fact is "    ' + dino[i].fact + '"';
                }else{
                    document.getElementById('species' + (i +1)).innerHTML = dino[i].species + ' :- Few random fact are 1. ' + randomizedfacts[0] + ' 2. ' + compareHeight.message(dino[i].species , dino[i].height) ;
                }

                // Add dino image to the dino tile
                createImgTag(dino[i].species,dino[i].imageurl);
                cell.appendChild(dinoTile);
                flag = false;
            }else{

                // Add dino image to the dino tile
                createImgTag(dino[i].species,dino[i].imageurl);
                cell.appendChild(dinoTile);

                // Add span for the texts for dino data
                createTag('dino', 'span', '', ('species' + (i+1)));
                cell.appendChild(specie);
                if(dino[i].species  === 'Pigeon'){
                    document.getElementById('species' + (i +1)).innerHTML = dino[i].species + ' :- A fact is "    ' + dino[i].fact + '"';
                }else{
                    document.getElementById('species' + (i +1)).innerHTML = dino[i].species + ' :- Few random fact are 1. ' + randomizedfacts[1] + '" 2. ' + compareWeight.message(dino[i].species , (dino[i].weight * 0.453592)) ;
                }
                
                flag = true;
            }

            // HTML tag for displaying additional information as tooltips
            info = document.createElement('span');
            info.setAttribute('id', 'addinfo' + (i+1));
            info.setAttribute('class', 'addinfo');
            cell.appendChild(info);
            document.getElementById('addinfo'+ (i+1)).innerHTML = dino[i].species  + ' approximately weighs  ' + Math.floor(dino[i].weight* 0.453592) + ' kgs can grow upto a height of ' 
            + (dino[i].height * 2.54) + ' cms  and were found in  ' + dino[i].where + " . It's a " + dino[i].diet + '.';
        }
    };

    // Data comparision between user and rnadom dino
    const location = compareWhere.message(dino[0].species , dino[0].where);
    comparison('location',location);
    const food = compareDiet.message(dino[0].species , dino[0].diet);
    comparison('food',food);

    /*
        * @description Represents an HTML Tag creation
        * @constructor
        * @param {string} tilename - Tilename of the "Dino"
        * @param {string} tag - HTML tag name
        * @param {string} classname - HTML tag class name
        * @param {string} idname - HTML tag id name
    */
    function createTag(tilename, tag, classname,idname){
        
        if (tilename === 'dinotile'){               // Dino grid tiles
            cell = document.createElement(tag);
            cell.setAttribute('id', idname);
            cell.setAttribute('class', classname);
        } else if( tilename === 'human'){           // Human grid tile
            name = document.createElement(tag);
            name.setAttribute('id', idname)
        } else {                                    // Each dino grid tile
            specie = document.createElement(tag);
            specie.setAttribute('id', idname);
        }
    };

    /*
        * @description Represents an HTML Image tag creation
        * @constructor
        * @param {string} imgsrc - Image src name
    */
    function createImgTag(alttext,imgsrc){
        dinoTile = document.createElement('img');
        dinoTile.setAttribute('src', imgsrc);
        dinoTile.setAttribute('alt', alttext);
    };

    function comparison(idname,data){
        let dinohead = document.getElementById('dino-head')
        let dinoheaddata = document.createElement('span');
        dinoheaddata.setAttribute('id', idname);
        dinohead.appendChild(dinoheaddata);
        document.getElementById(idname).innerHTML = data + ". ";
    };
}

// Create Dino Compare Method 1
const compareWeight = {
    message : function(specie,dinoweight){

        if(human.weight === '' || human.weigh === null){
            return " You forgot to provide your weight. Now Dino's are infintely heavier then you. Tchhh .. Tchhh..";
        }else if ((Number(dinoweight)/Number(human.weight)) >= 1 && (Number(dinoweight)/Number(human.weight)) <= 250){
            return "It would taken almost " + Math.ceil((Number(dinoweight)/Number(human.weight))) + " '" + human.name + "' to qualify for wrestling. Ha Ha";
        } else if((Number(dinoweight)/Number(human.weight)) < 1){
            return 'I challange you to wrestle me.'
        } else if((Number(dinoweight)/Number(human.weight)) > 250){
            return "Love to watch you from a very far";
        }else {
            return "Love to watch you from a very far";
        }
    }
};
    
// Create Dino Compare Method 2
const compareHeight = {
    message : function(specie,dinoheight){
        if(human.height === '' || human.heigh === null){
            return " You forgot to provide your height. Now Dino's are infintely longer then you. Tchhh .. Tchhh..";
        }else if ((Number(dinoheight)/Number(human.height)) >= 1 && (Number(dinoheight)/Number(human.height)) <= 2){
            return "Love to watch you from down here. I would need elevator to look into your eyes.";
        } else if((Number(dinoheight)/Number(human.height)) < 1){
            return 'Please look up, I want to talk to you.'
        }else {
            return "Love to watch you from down here. I am down to earth.";
        }
    }
};

// Create Dino Compare Method 3
const compareDiet = {
    message : function(specie,dinodiet){
        if(dinodiet === 'herbavor' && human.diet === 'Herbavor'){
            return "Give me high five !! You and I have same taste buds. We are anatomically and physiologically adapted to eating plant material.";
        } else if(dinodiet === 'carnivor' && human.diet === 'Carnivor'){
            return "Give me high five !! You and I have same taste buds. Our food and energy requirements derive solely from animal tissue or meat, whether through hunting or scavenging.";
        }else if(dinodiet === 'carnivor' && human.diet === 'Herbavor'){
            return  human.name + " likes crunchy veggies, but not " + specie;
        }else if(dinodiet === 'herbavor' && human.diet === 'Carnivor'){
            return "Oh " + specie + " likes crunchy veggies, I love chicken legs.";
        }else if(dinodiet === 'herbavor' && human.diet === 'Omnivor'){
            return  specie + " likes crunchy veggies but my food and energy requirments comes from animal, bird meat and plant materials";
        }else if(dinodiet === 'carnivor' && human.diet === 'Omnivor'){
            return  specie + " likes animal meats but my food and energy requirments comes from animal, bird meat and plant materials";
        }else{
            return "Oops!! Let's figure out our food habits."
        }
    }
};

// Create Dino Compare Method 4
const compareWhere = {
    message : function(specie,dinowhere){
        return "A '" + specie + "' were found in  " + dinowhere + " where '" + human.name + "' live's in " + human.continent;
    }
};
