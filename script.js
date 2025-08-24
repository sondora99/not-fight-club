import { hero, enemy } from './hero.js';
import { heroBody, enemyBody } from './hero.js';

let heroInput = document.getElementById('character-name');
const welcomeForm = document.querySelector('.welcome');
const buttonInput = document.querySelector('.welcome-form-button');
const home = document.querySelector('.home');
const buttonHome = document.querySelector('.home-button');
const battle = document.querySelector('.battle');
const gameName = document.querySelector('.game-name');

let attacksHero = [];
let defencesHero = [];
let attacksEnemy= [];
let defencesEnemy = [];
//-- welcome form --//

function checkStorageName() {
  if (localStorage.getItem('hero.name')) {
    //closeForm(welcomeForm);
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
  gameName.classList.add('hide');
  show(battle);
})

//--battle--//
window.onload = checkStorageName(); 

const heroContainer = document.createElement('div');
heroContainer.classList.add('hero-container');
battle.appendChild(heroContainer);

let heroName = document.createElement('p');
heroName.textContent = localStorage.getItem('hero.name');
let heroNameContent = heroName.textContent;
console.log(heroNameContent);
heroContainer.appendChild(heroName);

const heroImg = document.createElement('img');
heroImg.src = hero.picture;
heroImg.classList.add('image');
heroContainer.appendChild(heroImg);

const healthContainer = document.createElement('div');
healthContainer.classList.add('health-container');
heroContainer.appendChild(healthContainer);

const healthBarHero = document.createElement('progress');
healthBarHero.max = 100;
healthBarHero.value = 100;
healthContainer.appendChild(healthBarHero);

const healthValue = document.createElement('p');
healthValue.innerHTML = `${healthBarHero.value} / ${healthBarHero.max}`;
healthContainer.appendChild(healthValue);

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

function checkShots(){
  if (attacksHero.length == 1 && defencesHero.length == 2){
      fightbutton.disabled = false;
      fightbutton.classList.remove('disabled')
    } else {
      fightbutton.disabled = true;
      fightbutton.classList.add('disabled')
    }
}

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
      attacksHero.push(shot.value)
    } else (
      attacksHero = attacksHero.filter(el => el !== shot.value)
    )
    console.log('hero атакует', attacksHero);
    checkShots()
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
      defencesHero.push(shot.value)
    } else (
      defencesHero = defencesHero.filter(el => el !== shot.value)
    )
    /*if (defencesHero.length != 2 ){
      fightbutton.disabled = true;
      fightbutton.classList.add('disabled')
    } else {
      fightbutton.disabled = false;
      fightbutton.classList.remove('disabled')
    }*/
    checkShots()
    console.log('hero защищает', defencesHero);
  })
  
 })

const fightbutton = document.createElement('button');
fightbutton.classList.add('button');
fightField.appendChild(fightbutton);
fightbutton.classList.add('disabled');
fightbutton.disabled = true;
fightbutton.textContent = 'Attack!';

const enemyContainer = document.createElement('div');
enemyContainer.classList.add('hero-container');
battle.appendChild(enemyContainer);

let enemyName = document.createElement('p');
enemyName.textContent = enemy.name;
let enemyNameContent = enemyName.textContent;
enemyContainer.appendChild(enemyName);

const enemyImg = document.createElement('img');
enemyImg.src = enemy.picture;
enemyImg.classList.add('image');
enemyContainer.appendChild(enemyImg);

const healthContainerEnemy = document.createElement('div');
healthContainerEnemy.classList.add('health-container');
enemyContainer.appendChild(healthContainerEnemy);

const healthBarEnemy = document.createElement('progress');
healthBarEnemy.max = 100;
healthBarEnemy.value = 100;
healthContainerEnemy.appendChild(healthBarEnemy);

const healthValueEnemy = document.createElement('p');
healthValueEnemy.innerHTML = `${healthBarEnemy.value} / ${healthBarEnemy.max}`;
healthContainerEnemy.appendChild(healthValueEnemy);

const logArea = document.createElement('div');
logArea.classList.add('log-area');
battle.appendChild(logArea);
//--fight-logic--//

function randomAttack() {
  let ind = Math.floor(Math.random() * 5);
  if (defencesEnemy.includes(heroBody[ind])){
    return randomAttack()
  }
  return ind
}

function enemyAttack() {
  attacksEnemy = [];
  let temp = randomAttack();
  attacksEnemy.push(heroBody[temp]);
  console.log('enemy атаковал', attacksEnemy)
}

function enemyDefence() {
  defencesEnemy = [];
  while (defencesEnemy.length < 2) {
    let temp = randomAttack();
    defencesEnemy.push(heroBody[temp]);
  }
  console.log('enemy защищает', defencesEnemy)
}

function compareHeroAttack() {
  let defHero = null;
  let mes;
  let currentHealthEnemy =  healthBarEnemy.value;
  for (let i = 0; i < defencesEnemy.length; i++) {
    for (let j = 0; j < attacksHero.length; j++) {
      if (defencesEnemy[i] == attacksHero[j]) {
        defHero = defencesEnemy[i];
      }    
    }
  }
  if (defHero == null) {
    currentHealthEnemy -= 10;
    healthBarEnemy.value -= 10;
    healthValueEnemy.innerHTML = `${currentHealthEnemy} / ${healthBarEnemy.max}`;
    console.log('hero нанес урон 10HP');
    mes = `${heroNameContent} attack ${enemyNameContent} to ${attacksHero} and dealt 10 damage`;
    
  }
  else {
     console.log('enemy защитил', defHero);
     mes = `${heroNameContent} attack ${enemyNameContent} to ${defHero}, but ${enemyNameContent} defended`;

  }
  console.log('здоровье врага', currentHealthEnemy)
  makefightLog(mes);
  return currentHealthEnemy
}


function compareEnemyAttack() {
  let mes;
  let defEnemy = null;
  let currentHealthHero = healthBarHero.value
  for (let i = 0; i < defencesHero.length; i++){
    for (let j = 0; j < attacksEnemy.length; j++){
      if (defencesHero[i] == attacksEnemy[j]) {
        defEnemy = defencesHero[i];
      }
   }
  }
  
  if (defEnemy == null) {
    console.log('enemy нанес урон');
    currentHealthHero -= 10;
    healthBarHero.value -= 10;
    healthValue.innerHTML = `${currentHealthHero} / ${healthBarHero.max}`;
    mes = `${enemyNameContent} attack ${heroNameContent} to ${attacksEnemy}, and dealt 10 damage`;

  } else {
    console.log('hero защитил', defEnemy)
    mes = `${enemyNameContent} attack ${heroNameContent} to ${attacksEnemy}, but ${heroNameContent} defended`;

  }
  console.log('здоровье героя', currentHealthHero)
  makefightLog(mes);
  return currentHealthHero
};

function checkHealth(currentHealthEnemy, currentHealthHero) {
  if (currentHealthEnemy <= 0 ) {
    console.log ('Hero wins!');
    enemyImg.classList.add('image-loose');
  }
  else if (currentHealthHero <= 0) {
    console.log ('Enemy wins!')
  }
}

function makefightLog(message){
  let log = document.createElement('p');
  log.textContent = message;
  logArea.appendChild(log);
  logArea.prepend(log);
}

fightbutton.addEventListener('click', () => {
  enemyAttack();
  enemyDefence();
  let healthEnemy = compareHeroAttack();
  let healthHero = compareEnemyAttack();
  checkHealth(healthEnemy, healthHero);
})