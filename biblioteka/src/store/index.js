import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    rentBooks: [],
    token: ''
  },

  mutations: {
    addBooks(state, allBooks) {
      state.books = allBooks;
    },

    addRentBooks(state, allRentBooks) {
      state.rentBooks = allRentBooks;
    },

    rentABook(state, obj){
      const rentbooks = state.rentBooks.filter(rentbook => rentbook.bookId == obj.id );
        for(var i in rentbooks){
            if(rentbooks[i].available==true){
              rentbooks[i].available = false;
              break;
            }
        }
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

    fetchBooks({ commit }) {
      fetch('http://127.0.0.1:8500/api/books/all')
        .then(obj => obj.json())
        .then(res => commit('addBooks', res));
    },

    fetchRentBooks({ commit }) {
      fetch('http://127.0.0.1:8500/api/rentbooks/all')
        .then(obj => obj.json())
        .then(res => commit('addRentBooks', res));
    },
    

    findBook({commit, state},id){

      return new Promise((resolve,reject) =>{

        const book = state.books.filter(book => book.id == id )[0];

        var data = {
          book: book,
          available: false
        }
        const rentbooks = state.rentBooks.filter(rentbook => rentbook.bookId == id );
        for(var i in rentbooks){
            if(rentbooks[i].available==true){
              data.available = true;
              break;
            }
        }

        resolve(data);

      });
    },

    register({ commit }, obj) {
      fetch('http://127.0.0.1:9000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then(res => res.json())
        .then(tkn => commit('setToken', tkn.token));
    },

    login({ commit }, obj) {
      fetch('http://127.0.0.1:9000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then(res => res.json())
        .then(tkn => {
          if (tkn.msg) {
            alert(tkn.msg);
          } else {
            commit('setToken', tkn.token)
          }
        });
    },

    socket_rent({ commit }, msg) {
      const book = JSON.parse(msg);
      commit('rentABook', book);
      
    }
  }
})
