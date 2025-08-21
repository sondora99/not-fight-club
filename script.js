import { hero } from './hero.js';
let heroInput = document.getElementById('character-name');
const welcomeForm = document.querySelector('.welcome-form');
const buttonInput = document.querySelector('.welcome-form-button');
const home = document.querySelector('.home');

//-- welcome form --//
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
  closeForm();
  show(home)
})

function getName() {
  hero.name = heroInput.value;
  localStorage.setItem('hero.name', heroInput.value);
  console.log(hero);
  return hero.name
}

function closeForm(){
  welcomeForm.classList.add('hide')
}

function show(section){
  section.classList.remove('hide');
}