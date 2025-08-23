import { hero, enemy } from './hero.js';
import { heroBody, enemyBody } from './hero.js';

let heroInput = document.getElementById('character-name');
const welcomeForm = document.querySelector('.welcome');
const buttonInput = document.querySelector('.welcome-form-button');
const home = document.querySelector('.home');
const buttonHome = document.querySelector('.home-button');
const battle = document.querySelector('.battle');

let attacks = [];
let defences = [];
//-- welcome form --//

function checkStorageName() {
  if (localStorage.getItem('hero.name')) {
    //closeForm(welcomeForm);
    console.log('see name in storage');
    show(home)
  }
  else {
    console.log('no name in storage');
    show(welcomeForm)
  }
}

heroInput.addEventListener('input', () => {
  if (heroInput.value.trim() === ''){
    buttonInput.disabled = true;
  }  else {
    buttonInput.disabled = false;
  }
})

welcomeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  getName();
  closeForm(welcomeForm);
  show(home)
})

function getName() {
  hero.name = heroInput.value;
  localStorage.setItem('hero.name', heroInput.value);
  console.log('hero.name:', hero.name);
  return hero.name
}

function closeForm(section){
  section.classList.add('hide')
}

function show(section){
  section.classList.remove('hide');
}

//--home--//

buttonHome.addEventListener('click', () => {
  closeForm(home);
  show(battle);
})

//--battle--//

const heroContainer = document.createElement('div');
heroContainer.classList.add('hero-container');
battle.appendChild(heroContainer);

let heroName = document.createElement('p');
heroName.textContent = localStorage.getItem('hero.name');
heroContainer.appendChild(heroName);

const heroImg = document.createElement('img');
heroImg.src = hero.picture;
heroImg.classList.add('image');
heroContainer.appendChild(heroImg);

const healthContainer = document.createElement('div');
healthContainer.classList.add('health-container');
heroContainer.appendChild(healthContainer);

const healthBar = document.createElement('progress');
healthBar.max = '100';
healthBar.value = '100';
healthContainer.appendChild(healthBar);

const healthValue = document.createElement('p');
healthValue.innerHTML = `${healthBar.value} / ${healthBar.max}`;
healthContainer.appendChild(healthValue);

checkStorageName(); //on windows load?

//--fight-field--//

const fightField = document.createElement('div'); //все поле
fightField.classList.add('fight-field');
battle.appendChild(fightField);

const fightText = document.createElement('p');
fightText.textContent = 'Choose 1 zone for attack and 2 zones to defence';
fightField.appendChild(fightText);

const fightArea = document.createElement('div'); //там где чекбоксы
fightArea.classList.add('fight-area');
fightField.appendChild(fightArea);
const attackArea = document.createElement('div'); //чекбоксы атаки
attackArea.classList.add('attack-area');
fightArea.appendChild(attackArea);
const attackZoneName = document.createElement('p');
attackZoneName.textContent = "Attack zone";
attackArea.appendChild(attackZoneName);
const defenceArea = document.createElement('div');  //чекбоксы защиты
defenceArea.classList.add('defence-area');
fightArea.appendChild(defenceArea);
const defencekZoneName = document.createElement('p');
defencekZoneName.textContent = "Defence zone";
defenceArea.appendChild(defencekZoneName);

heroBody.map(el => {
  const checkboxContainer = document.createElement('div');
  checkboxContainer.classList.add('checkbox-container');
  attackArea.appendChild(checkboxContainer);
  const shot = document.createElement('input');
  shot.type = 'checkbox';
  shot.id = `${el}Hero`;
  shot.value = el;
  const shotArea = document.createElement('label');
  shotArea.textContent = el;
  shotArea.htmlFor = `${el}Hero`;
  checkboxContainer.appendChild(shot);
  checkboxContainer.appendChild(shotArea)

  shot.addEventListener('change', () => {
    if (shot.checked){
      attacks.push(shot.value)
    } else (
      attacks = attacks.filter(el => el !== shot.value)
    )
    console.log(attacks);

    if (attacks.length > 1){
      fightbutton.disabled = true;
    }
  })
})

//--enemy side--//
enemyBody.map(el => {
  const checkboxContainer = document.createElement('div');
  checkboxContainer.classList.add('checkbox-container', 'checkbox-container-defence');
  defenceArea.appendChild(checkboxContainer);
  const shot = document.createElement('input');
  shot.type = 'checkbox';
  shot.id = `${el}Enemy`;
  shot.value = el;
  const shotArea = document.createElement('label');
  shotArea.textContent = el;
  shotArea.htmlFor = `${el}Enemy`;
  checkboxContainer.appendChild(shot);
  checkboxContainer.appendChild(shotArea)

  shot.addEventListener('change', () => {
    if (shot.checked){
      defences.push(shot.value)
    } else (
      defences = defences.filter(el => el !== shot.value)
    )
    console.log(defences);

    if (defences.length > 2){
      fightbutton.disabled = true;
    }
  })
 })

const fightbutton = document.createElement('button');
fightbutton.classList.add('button');
fightField.appendChild(fightbutton);
fightbutton.textContent = 'Attack!';

const enemyContainer = document.createElement('div');
enemyContainer.classList.add('hero-container');
battle.appendChild(enemyContainer);

let enemyName = document.createElement('p');
enemyName.textContent = enemy.name;
enemyContainer.appendChild(enemyName);

const enemyImg = document.createElement('img');
enemyImg.src = enemy.picture;
enemyImg.classList.add('image');
enemyContainer.appendChild(enemyImg);

const healthContainerEnemy = document.createElement('div');
healthContainerEnemy.classList.add('health-container');
enemyContainer.appendChild(healthContainerEnemy);

const healthBarEnemy = document.createElement('progress');
healthBarEnemy.max = '100';
healthBarEnemy.value = '100';
healthContainerEnemy.appendChild(healthBarEnemy);

const healthValueEnemy = document.createElement('p');
healthValueEnemy.innerHTML = `${healthBarEnemy.value} / ${healthBarEnemy.max}`;
healthContainerEnemy.appendChild(healthValueEnemy);

//--fight-logic--//
