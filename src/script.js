// Função para mudar a imagem pelo ID e URL
function changeImage(id, url) {
  document.getElementById(id).src = url;
}

// Função para mudar o texto pelo ID e valor
function changeText(id, text) {
  document.getElementById(id).innerText = text;
}

// Variáveis globais
const totalPokemons = 1025; // limit de pokemons
let currentPokemonIndex = 1; // offset (início dos pokemons)

// Função para formatar tipos do Pokémon
function formatTypes(types) {
  return types.map(type => type.type.name.toUpperCase()).join(", ");
}

// Função para formatar habilidades do Pokémon
function formatAbilities(abilities) {
  return abilities.map(ability => ability.ability.name.replace("-", " ")).join(", ");
}


// Função para buscar um Pokémon pelo índice
async function fetchPokemon(index) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
    if (!response.ok) throw new Error("Pokémon não encontrado");

    const data = await response.json();

    // Atualiza o nome e a imagem do Pokémon
    changeText("name", data.name.toUpperCase());
    changeImage("img_sprite_front_default", data.sprites.front_default);

      // Atualiza outras informações
      changeText("height", `Altura: ${data.height / 10} m`);
      changeText("weight", `Peso: ${data.weight / 10} kg`);
      changeText("types", `Tipos: ${formatTypes(data.types)}`);
      changeText("abilities", `Habilidades: ${formatAbilities(data.abilities)}`);
  
      // Exibir estatísticas
      const statsList = document.getElementById("stats");
      statsList.innerHTML = ""; // Limpa antes de atualizar
      data.stats.forEach(stat => {
        const statItem = document.createElement("li");
        statItem.innerText = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
        statsList.appendChild(statItem);
      });
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error);
  }
}

// Função para buscar o Pokémon anterior
function previousPokemon() {
  currentPokemonIndex = currentPokemonIndex <= 1 ? totalPokemons : currentPokemonIndex - 1;
  fetchPokemon(currentPokemonIndex);
}

// Função para buscar o próximo Pokémon
function nextPokemon() {
  currentPokemonIndex = currentPokemonIndex >= totalPokemons ? 1 : currentPokemonIndex + 1;
  fetchPokemon(currentPokemonIndex);
}

// Buscar o primeiro Pokémon ao carregar a página
fetchPokemon(currentPokemonIndex);
