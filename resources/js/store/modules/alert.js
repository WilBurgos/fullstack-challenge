import Swal from "sweetalert2";

function initialState() {
    return {
        show: false,
        icon:'',
        text: '',
    };
}

export default {
    namespaced: true,
    state: initialState(),
    mutations: {
        show(state, alerta) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: alerta.icon, //success,error,warning,info,question
                title: alerta.text
            })
        },
        close(state) {
            state.show = false;
        },
        RESET(state){
            Object.assign(state, initialState());
        },
    },
    actions:{

    }
};
