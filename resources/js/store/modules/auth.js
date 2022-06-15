import { reject } from "lodash";
import axios from "../../utils/axios";

function initialState() {
    return {
        user: {
            id:         '',
            nombre:     '',
            correo:     '',
        },
        token: localStorage.getItem('token') || null
    };
}

export default {
    namespaced: true,
    state: initialState(),
    mutations: {
        setUser(state, payload) {
            state.user.id              = payload.id;
            state.user.nombre          = payload.name;
            state.user.correo          = payload.email;
            state.user.color           = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        },
        setToken(state,token){
            state.token = token
        },
        destroyToken(state){
            state.token = null
        },
        RESET(state){
            Object.assign(state, initialState());
        },
    },
    actions: {
        LOGIN({ commit, dispatch },credentials) {
            return new Promise((resolve, reject) => {
                // console.log(credentials)
                axios.post('api/login',credentials).then((response) => {
                    // console.log(response.data)
                    localStorage.setItem('token',response.data.token)
                    commit("setToken", response.data.token);
                    commit("setUser", response.data.user);
                    resolve(response);
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                    // commit("swalAlert/show", {
                    //     color: "error",
                    //     text: "Ha ocurrido un error al cargar los user del fiscal.",
                    // }, { root: true });
                });
            })
        },
        LOGOUT({ commit,state }){
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
                axios.post('api/logout').then((response) => {
                    localStorage.removeItem('token')
                    commit("destroyToken");
                    resolve(response);
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                    // commit("swalAlert/show", {
                    //     color: "error",
                    //     text: "Ha ocurrido un error al cargar los user del fiscal.",
                    // }, { root: true });
                });
            })
        }
    },
    getters:{
        loggedIn(state){
            return state.token !== null
        }
    }
};
