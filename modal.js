import { show } from "./script.js";
import { closeForm } from "./script.js";
const body = document.body;

function openModal(winner) {
  const overlay = document.createElement('div');
  const endGameWindow = document.createElement('div');
  overlay.classList.add('overlay');
  body.appendChild(overlay);
  overlay.appendChild(endGameWindow);
  endGameWindow.classList.add('end-game');
  let modalText = document.createElement('p');
  endGameWindow.appendChild(modalText);
  body.classList.add('stop-scroll');

  if (winner == 'hero'){
    modalText.textContent = 'Congratulations! You win!'
  }
  else (
    modalText.textContent = 'You fought bravely but lost...'
  )

  let modalButton = document.createElement('button');
  modalButton.classList.add('button');
  modalButton.textContent = 'home';
  endGameWindow.appendChild(modalButton);

  modalButton.addEventListener('click', () => {
    closeForm(endGameWindow);
    closeForm(battle);
    show(home)
  })
}




