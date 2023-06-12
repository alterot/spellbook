let spellList = [
  {
    name: "Detect Magic",
    level: 0,
    description: "For the duration, you sense the presence of magic within 30 feet of you."
  },

  {
    name: "Magic Missile",
    level: 1,
    description: "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range."
  },

  {
    name: "Invisibility",
    level: 2,
    description: "A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person."
  },

  {
    name: "Fireball",
    level: 3,
    description: "For when shit has hit the fan, but mostly for recreational purposes. Who doesn't enjoy blasting a large group of 'Bandit X', ey?"
  }

];

const savedSpellList = localStorage.getItem('spellList'); //check if there is a localStorage API

if (savedSpellList) {
  spellList = JSON.parse(savedSpellList);
}

function Spell(name, level, description) {
  this.name = name
  this.level = level
  this.description = description
};

const form = document.getElementById('addSpell');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const level = parseInt(document.getElementById('level').value);
  const description = document.getElementById('description').value;

  const newSpell = {name, level, description};

  spellList.push(newSpell);
  localStorage.setItem('spellList', JSON.stringify(spellList)); //update the API


  form.reset();
  addSpellForm.style.display = 'none';
  addSpell(newSpell);
});

const spells = document.querySelector('.spellList');

function addSpell(spell) {
  const spellItem = document.createElement('div');
  spellItem.classList.add('spell');

  const nameElement = document.createElement('span');
  nameElement.classList.add('spellName');
  nameElement.textContent = `${spell.name}`;

  const levelElement = document.createElement('span');
  levelElement.classList.add('spellName');
  levelElement.textContent = `, level ${spell.level}`;

  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('spellDescription');
  descriptionElement.textContent = `Description: ${spell.description}`;

  const removeButton = document.createElement('button');
  removeButton.classList.add('removeSpell');
  removeButton.textContent = 'Remove';
  removeButton.setAttribute('data-spell-id', spellList.indexOf(spell));
  removeButton.addEventListener('click', removeSpell);

  spellItem.appendChild(nameElement);
  spellItem.appendChild(levelElement);
  spellItem.appendChild(descriptionElement);
  spellItem.appendChild(removeButton);

  spells.appendChild(spellItem);

  console.log('data-spell-id:', spellList.indexOf(spell));
}

function removeSpell(event) {
  const button = event.target;
  const spellId = parseInt(button.getAttribute('data-spell-id'));
  
  if (!isNaN(spellId) && spellId >= 0 && spellId < spellList.length) { //not sure if this check is really necessary
    spellList.splice(spellId, 1);
    localStorage.setItem('spellList', JSON.stringify(spellList)); //update the API
    button.parentNode.remove(); 

    const removeButtons = document.querySelectorAll('.removeSpell');
    removeButtons.forEach((button, index) => {
      button.setAttribute('data-spell-id', index);
    });
  }
}

spellList.forEach(addSpell);

const addButton = document.querySelector('#addButton');
const addSpellForm = document.querySelector('#addSpell');

addButton.addEventListener('click', () => {
  addSpellForm.style.display = 'grid';
});

