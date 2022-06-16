<template>
    <div class="container mt-5">
        <div class="row mt-5 text-center">
            <div class="col-6">
                <div class="p-2 alert alert-secondary">
                    <h3>Doing</h3>
                </div>
            </div>
            <div class="col-3">
                <div class="p-2 alert alert-success">
                    <h3>Done</h3>
                    <span>{{done.length}}</span>
                </div>
            </div>
        </div>
        <div class="row text-center">
            <div class="col-3">
                <div class="p-2 alert alert-secondary">
                    <h3>Buffer</h3>
                    <span>{{buffer.length}}</span>
                </div>
            </div>
            <div class="col-3">
                <div class="p-2 alert alert-primary">
                    <h3>Working</h3>
                    <span>{{working.length}}</span>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-3">
                <div class="p-2 alert alert-secondary">
                    <span class="add-task" @click="add('buffer')">+ add task</span>
                    <draggable class="list-group kanban-column" :list="buffer" group="tasks" @change="moveBuffer">
                        <div :class="'list-group-item '+( compareDates(formatDate(new Date()),element.estimation_at) ? 'card-expired' : '')" v-for="element in buffer" :key="element.description" @click="edit(element)">
                            {{ element.description }}
                        </div>
                    </draggable>
                </div>
            </div>
            <div class="col-3">
                <div class="p-2 alert alert-primary">
                    <span class="add-task" @click="add('working')">+ add task</span>
                    <draggable class="list-group kanban-column" :list="working" group="tasks" @change="moveWorking">
                        <div :class="'list-group-item '+( compareDates(formatDate(new Date()),element.estimation_at) ? 'card-expired' : '')" v-for="element in working" :key="element.description" @click="edit(element)">
                            {{ element.description }}
                        </div>
                    </draggable>
                </div>
            </div>
            <div class="col-3">
                <div class="p-2 alert alert-success">
                    <span class="add-task" @click="add('done')">+ add task</span>
                    <draggable class="list-group kanban-column" :list="done" group="tasks" @change="moveDone">
                        <div :class="'list-group-item'" v-for="element in done" :key="element.description" @click="edit(element)">
                            {{ element.description }}
                        </div>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import Swal from 'sweetalert2';
import { mapState } from "vuex";

export default {
    description: "kanban-board",
    components: {
        draggable
    },
    data() {
        return {

        };
    },
    computed: {
        ...mapState({
            buffer: (state) => state.card.cards.buffer,
            working: (state) => state.card.cards.working,
            done: (state) => state.card.cards.done,
        }),
    },
    created(){
        this.$store.dispatch("card/GET_CARDS");
    },
    methods: {
        async add(type) {
            const { value: formValues } = await Swal.fire({
                title: 'Multiple inputs',
                html:
                `
                    <label>Description</label>
                    <input id="swal-input1" class="swal2-input">
                    <label>Estimation</label>
                    <input type="date" id="swal-input2" class="swal2-input">
                `,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value
                    ]
                }
            })

            if (formValues) {
                this.$store.dispatch('card/SAVE_CARD',{
                    description: formValues[0],
                    stage: type,
                    estimation_at: formValues[1]
                })
                .then(response => {
                    this.$store.dispatch("card/GET_CARDS");
                    if(type === 'done'){
                        this.displayToast()
                    }
                })
            }
        },
        async edit(element){
            const { value: formValues } = await Swal.fire({
                title: 'Multiple inputs',
                html:
                `
                    <label>Description</label>
                    <input id="swal-input1" class="swal2-input" value="${element.description}">
                    <label>Estimation</label>
                    <input type="date" id="swal-input2" class="swal2-input" value="${element.estimation_at}">
                `,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value
                    ]
                }
            })

            if (formValues) {
                this.$store.dispatch('card/EDIT_CARD',{
                    id: element.id,
                    description: formValues[0],
                    stage: element.stage,
                    estimation_at: formValues[1]
                })
                .then(response => {
                    this.$store.dispatch("card/GET_CARDS");
                })
            }
        },
        moveBuffer: function(evt){
            if(evt.added){
                this.$store.dispatch('card/EDIT_CARD',{
                    id: evt.added.element.id,
                    description: evt.added.element.description,
                    stage: 'buffer',
                    estimation_at: evt.added.element.estimation_at
                })
                .then(response => {
                })
            }
        },
        moveWorking: function(evt){
            if(evt.added){
                this.$store.dispatch('card/EDIT_CARD',{
                    id: evt.added.element.id,
                    description: evt.added.element.description,
                    stage: 'working',
                    estimation_at: evt.added.element.estimation_at
                })
                .then(response => {
                })
            }
        },
        moveDone: function(evt){
            console.log(evt)
            if(evt.added){
                this.$store.dispatch('card/EDIT_CARD',{
                    id: evt.added.element.id,
                    description: evt.added.element.description,
                    stage: 'done',
                    estimation_at: evt.added.element.estimation_at
                })
                .then(response => {
                    this.displayToast()
                })

            }
        },
        padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        },
        formatDate(date) {
            return [
                date.getFullYear(),
                this.padTo2Digits(date.getMonth() + 1),
                this.padTo2Digits(date.getDate()),
            ].join('/');
        },
        compareDates(today,day){
            return new Date(day) < new Date(`${today.split('/')[0]}-${today.split('/')[1]}-${today.split('/')[2]}`)
        },
        displayToast(){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Felicitaciones por lograrlo!'
            })

            return
        }
    }
};
</script>

<style>
.kanban-column {
    min-height: 300px;
}
.add-task{
    text-align: right;
    display: block;
    cursor: pointer;
}
.card-expired{
    color: red;
}
</style>
