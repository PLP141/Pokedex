const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {

    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

    if(searchPokemon <= 649 ){
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; 
    }if(searchPokemon >= 650 && searchPokemon <= 721) { //o site não tinha as imagens animadas dos pokemons acima de 650
        pokemonImage.src = data['sprites']['versions']['generation-vi']['omegaruby-alphasapphire']['front_default'];
    } else if(searchPokemon >= 722 ) { // site so tem imagens dos pokemons ate 898,Calyrex
      pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
    }

    input.value = '';
    searchPokemon = data.id;

  } else {

    pokemonImage.src = './favicons/missingno.png';
    pokemonName.innerHTML = 'missingno';
    pokemonNumber.innerHTML = '000';
    searchPokemon = 0;
    input.value = '';
    
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    input.value = '';
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
  input.value = '';
});

renderPokemon(searchPokemon);