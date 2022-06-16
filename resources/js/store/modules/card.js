import axios from "../../utils/axios";

function initialState() {
    return {
        cards: {
            buffer:         [],
            working:     [],
            done:     [],
        }
    };
}

export default {
    namespaced: true,
    state: initialState(),
    mutations: {
        setCards(state, payload) {
            state.cards.buffer              = payload.buffer;
            state.cards.working          = payload.working;
            state.cards.done          = payload.done;
        },
        RESET(state){
            Object.assign(state, initialState());
        }
    },
    actions: {
        GET_CARDS({ commit }) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
            axios.get('api/card').then((response) => {
                commit("setCards", response.data);
            }).catch((error) => {
                console.log(error)
            });
        },
        SAVE_CARD({ commit },card){
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
                axios.post('api/card',card).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                });
            })
        },
        EDIT_CARD({ commit },card){
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
                axios.put(`api/card/${card.id}`,card).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                });
            })
        },
    }
};
