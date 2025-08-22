import { hero } from './hero.js';
let heroInput = document.getElementById('character-name');
const welcomeForm = document.querySelector('.welcome');
const buttonInput = document.querySelector('.welcome-form-button');
const home = document.querySelector('.home');
const buttonHome = document.querySelector('.home-button');
const battle = document.querySelector('.battle');

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

checkStorageName();
