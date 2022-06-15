import axios from "../../utils/axios";

function initialState() {
    return {
        datos: {
            id:         '',
            nombre:     '',
            correo:     '',
        }
    };
}

export default {
    namespaced: true,
    state: initialState(),
    mutations: {
        setUser(state, payload) {
            state.datos.id              = payload.id;
            state.datos.nombre          = payload.nombre;
            state.datos.correo          = payload.correo;
            state.datos.color           = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        },
        RESET(state){
            Object.assign(state, initialState());
        },
    },
    actions: {
        SET_USER({ commit }, user){
            console.log(user)
        },
        GET_USER({ commit }) {
            axios.get('api/user').then((response) => {
                commit("setUser", response.data);
            }).catch((error) => {
                commit("swalAlert/show", {
                    color: "error",
                    text: "Ha ocurrido un error al cargar los datos del fiscal.",
                }, { root: true });
            });
        },
    }
};
