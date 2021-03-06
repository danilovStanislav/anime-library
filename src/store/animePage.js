import axios from 'axios'

export const animePage = {
  namespaced: true,

  state: () => ({
    currentAnime: {},
    animeInfo: {
      animeImage: null,
      animeImageAlt: null,
      categories: [],
    },
    trailer: {},
    charactersArray: [],
    reviewsArray: [],
  }),

  mutations: {
    SET_CURRENT_ANIME(state, payload) {
      state.currentAnime = payload
    },

    SET_ANIME_INFO(state) {
      state.animeInfo.animeImage = state.currentAnime.images.jpg.large_image_url
      state.animeInfo.animeImageAlt = state.currentAnime.title
      state.animeInfo.categories = [
        { key: 'Type', value: state.currentAnime.type },
        {
          key: 'Episodes',
          value: state.currentAnime.episodes,
        },
        {
          key: 'Status',
          value: state.currentAnime.status,
        },
        {
          key: 'Premiered',
          value: state.currentAnime.aired.string,
        },
        {
          key: 'Genres',
          value: `${state.currentAnime.genres[0].name}, ${state.currentAnime.genres[1]?.name}`,
        },
        {
          key: 'Duration',
          value: state.currentAnime.duration,
        },
      ]
    },

    SET_TRAILER(state) {
      state.trailer.url = state.currentAnime.trailer.url
      state.trailer.embed_url = state.currentAnime.trailer.embed_url
      state.trailer.image = state.currentAnime.trailer.image
    },

    SET_CHARACTERS_ARRAY(state, payload) {
      state.charactersArray = payload
    },

    SET_REVIEWS_ARRAY(state, payload) {
      state.reviewsArray = payload
    },
  },

  actions: {
    async getAnimeById({ commit, dispatch }, id) {
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`)
        commit('SET_CURRENT_ANIME', res.data.data)
        commit('SET_ANIME_INFO')
        commit('SET_TRAILER')
        window.scrollTo(0, 0)
      } catch (err) {
        console.error(err)
      }
    },

    async getCharacters({ state, commit }, id) {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/characters`
        )
        commit('SET_CHARACTERS_ARRAY', res.data.data)
      } catch (err) {
        state.charactersArray = []
        console.error(err)
      }
    },

    async getReviews({ state, commit }, id) {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/reviews`
        )
        commit('SET_REVIEWS_ARRAY', res.data.data)
      } catch (err) {
        state.reviewsArray = []
        console.error(err)
      }
    },
  },
}
