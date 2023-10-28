<template>
  <header class="header">
    <label for="pokemonInput">
      Buscar Pokemon
      <input type="text" v-model="searchValue">
    </label>
  </header>

  <div class="row">
    <div class="column">
      <EasyDataTable :headers="headers" :items="filteredPokemons" :rows-per-page="rowsItems" :search-value="searchValue" @click-row="showRow"/>
    </div>

    <div class="column">
      <main class="main" v-if="Object.entries(pokemonData).length > 0">
        <section class="pokemonCard">
          <div class="nameImage">
            <h1 class="pokemonName">{{ pokemonData.name }}</h1>
            <img :src="pokemonData.sprites.front_default" :alt="pokemonData.name">
          </div>
          <ul class="type">
            <h2>Type:</h2>
            <li v-for="(type, key) in pokemonData.types" :key="key" :class="type.type.name">
              <span>{{ type.type.name }}</span>
            </li>
          </ul>
          <ul class="stats">
            <h2>Stats:</h2>
            <li v-for="(stat, key) in pokemonData.stats" :key="key">
              <span>{{ stat.stat.name}} -> {{stat.base_stat }}</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      headers: [{ text: "NOMBRE DEL POKEMON", value: "name" }],
      pokemons: [],
      pokemonData: {},
      searchValue: "",
      rowsItems: 10
    }
  },

  computed: {
    filteredPokemons() {
      this.pokemonData = {};
      const searchTerm = this.searchValue.toLowerCase();
      return this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    }
  },

  created() { this.getPokemonList(); },

  methods: {
    async getPokemonList(){
      this.$swal.showLoading()
      try{
        const pokemonsFetch = await axios.get('/pokemon/?limit=1000')
        this.pokemons = pokemonsFetch.data.results;
        this.$swal.close()
      }catch(e){
        this.$swal({icon: 'error', title: 'Error al cargar listado de pokemones.', text: '', allowOutsideClick: false});
      }
    },

    async showRow (item) {
      this.$swal.showLoading()
      try {
        const pokemonToFind = await axios.get(`${item.url}`)
        const pokemonx = await axios.get(`/pokemon/${pokemonToFind.data.id}`)
        console.log('sefef', pokemonx)
        this.pokemonData = pokemonx.data
        this.$swal.close()
        return pokemonToFind.data.id
      } catch (error) {
        this.$swal.close()
        this.$swal({icon: 'warning', title: 'Pokemon no encontrado.', text: '', allowOutsideClick: false});
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './pokemon_style_types.scss';
</style>
