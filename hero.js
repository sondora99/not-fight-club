export let hero = {
  name: '',
  health: 100,
  hits: {
      head: 20,
      chest: 20,
      arms: 20,
      belly: 20,
      legs: 20,
  },
  defense: {
      head: 20,
      chest: 20,
      arms: 20,
      belly: 20,
      legs: 20,
  },
  picture: './assets/heroes/hero1.png'
};

export let heroBody = ['head', 'chest', 'arms', 'belly', 'legs'];

export let enemy = {
  name: 'Nurgle',
  health: 100,
  hits: {
      head: 20,
      chest: 20,
      arms: 20,
      belly: 20,
      legs: 20
  },
  defense: {
      head: 20,
      chest: 20,
      arms: 20,
      belly: 20,
      legs: 20,
  },
  picture: './assets/enemies/egg.png'
};

export let enemyBody = ['head', 'chest', 'arms', 'belly', 'legs'];