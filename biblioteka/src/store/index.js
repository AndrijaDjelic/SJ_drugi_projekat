import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    token: ''
  },

  mutations: {
    setBooks(state, bks) {
      state.books = bks;
    },

    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },

  },

  actions: {

    fetchBooks({commit}){
      fetch('http://127.0.0.1:8500/api/books/all')
        .then( obj => obj.json() )
          .then( res => commit('setBooks', res) );
    },

    getItem({ commit, state }, id) {
      return new Promise( (resolve, reject) => {
        const item = state.items.filter( item => item.objectID == id )[0];
        
        if (item) {
          resolve(item);
        } else {
          fetch(`http://127.0.0.1:8500/api/books/findById/${id}`)
            .then( obj => obj.json())
            .then( res => {
              fetch(`http://127.0.0.1:8000/api/messages/${res.objectID}`, {
                headers: { 'Authorization': `Bearer ${state.token}` }
              }).then( resp => resp.json() )
                .then( comments => {
                  res['comments'] = comments;
                  commit('addItem', res);
                  resolve(res);
                });
            });
        }
      });
    },

    register({ commit }, obj) {
      fetch('http://127.0.0.1:9000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => commit('setToken', tkn.token) );
    },

    login({ commit }, obj) {
      fetch('http://127.0.0.1:9000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then( res => res.json() )
      .then( tkn => {
        if (tkn.msg) {
          alert(tkn.msg);
        } else {
          commit('setToken', tkn.token)
        }
      });
    },

    socket_comment({ commit }, msg) {
      const comment = JSON.parse(msg);
      commit('addComment', { artId: comment.artId, comment: comment });
    }
  }
})
