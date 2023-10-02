//REVIEW NAMING CONVENTIONS

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

const savedSpellList = localStorage.getItem('spellList');
if (savedSpellList) {
  spellList = JSON.parse(savedSpellList);
}

class Spell {
  constructor(name, level, description) {
    this.name = name;
    this.level = level;
    this.description = description;
  }
}

function sortSpells() {
  spellList.sort((spellA, spellB) => spellA.level - spellB.level);
  }
  
function refreshSpellList() {
  spells.innerHTML = '';
  spellList.forEach(addSpell);
  sortSpells();
}

const form = document.getElementById('addSpell');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const level = parseInt(document.getElementById('level').value);
  const description = document.getElementById('description').value;

  if (form.getAttribute('data-edit-mode') === 'true') {
    const spellId = parseInt(form.getAttribute('data-spell-id'));
    if (!isNaN(spellId) && spellId >= 0 && spellId < spellList.length) {
      spellList[spellId] = new Spell(name, level, description);
      localStorage.setItem('spellList', JSON.stringify(spellList));

      refreshSpellList();

      form.reset();
      form.removeAttribute('data-edit-mode'); 
      addSpellForm.style.display = 'none';
    }
  } else {
    const newSpell = new Spell(name, level, description);
    spellList.push(newSpell);
    localStorage.setItem('spellList', JSON.stringify(spellList));
    addSpell(newSpell);
  }

  form.reset();
  form.removeAttribute('data-edit-mode');
  addSpellForm.style.display = 'none';
  blurElements.forEach((element) => element.classList.remove('blur'));
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

  const editButton = document.createElement('button');
  editButton.classList.add('removeSpell');
  editButton.classList.add('editButton')
  editButton.textContent = 'Update';
  editButton.setAttribute('data-spell-id', spellList.indexOf(spell));
  editButton.addEventListener('click', editSpell);

  const removeButton = document.createElement('button');
  removeButton.classList.add('removeSpell');
  removeButton.textContent = 'Remove';
  removeButton.setAttribute('data-spell-id', spellList.indexOf(spell));
  removeButton.addEventListener('click', removeSpell);

  spellItem.appendChild(nameElement);
  spellItem.appendChild(levelElement);
  spellItem.appendChild(descriptionElement);
  spellItem.appendChild(editButton);
  spellItem.appendChild(removeButton);

  spells.appendChild(spellItem);

  sortSpells();

  console.log('data-spell-id:', spellList.indexOf(spell));
}

function editSpell(event) {
  const button = event.target;
  const spellId = parseInt(button.getAttribute('data-spell-id'));

  if (!isNaN(spellId) && spellId >= 0 && spellId < spellList.length) {
    const spell = spellList[spellId];

    document.getElementById('name').value = spell.name;
    document.getElementById('level').value = spell.level;
    document.getElementById('description').value = spell.description;

    form.setAttribute('data-edit-mode', 'true');
    form.setAttribute('data-spell-id', spellId);
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = 'Update Spell';

    addSpellForm.style.display = 'grid';
    applyBlurEffect();
  }
}

function removeSpell(event) {
  const button = event.target;
  const spellId = parseInt(button.getAttribute('data-spell-id'));
  
  if (!isNaN(spellId) && spellId >= 0 && spellId < spellList.length) { 
    spellList.splice(spellId, 1);
    localStorage.setItem('spellList', JSON.stringify(spellList)); 
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
const cancelButton = document.querySelector('#cancel');
const spellListDiv = document.querySelector('.spellList'); 
const blurElements = [
  document.querySelector('header'),
  document.querySelector('blockquote'),  
  addButton,
  spellListDiv
];

function applyBlurEffect() {
  blurElements.forEach(element => element.classList.add('blur'));
}

addButton.addEventListener('click', () => {
  addSpellForm.style.display = 'grid';
  applyBlurEffect();
});

cancelButton.addEventListener('click', () => {
  form.reset();
  blurElements.forEach(element => element.classList.remove('blur'));
  addSpellForm.style.display = 'none';
});