<template>
    <div class="container mt-5">
        <div class="row mt-5 text-center">
            <div class="col-6">
                <div class="p-2 alert alert-warning">
                    <h3>Doing</h3>
                </div>
            </div>

        </div>
        <div class="row text-center">
            <div class="col-3">
                <div class="p-2 alert alert-warning">
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
            <div class="col-3">
                <div class="p-2 alert alert-success">
                    <h3>Done</h3>
                    <span>{{done.length}}</span>
                </div>
            </div>
            <div class="col-3" v-if="showArchived">
                <div class="p-2 alert alert-secondary">
                    <h3>Archived</h3>
                    <span>{{archived.length}}</span>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-3">
                <div class="p-2 alert alert-warning">
                    <span class="add-task" @click="add('buffer')">+ add task</span>
                    <draggable class="list-group kanban-column" :list="buffer" group="tasks" @change="moveBuffer">
                        <div :class="'card '+( compareDates(formatDate(new Date()),element.estimation_at) ? 'card-expired' : '')" v-for="element in buffer" :key="element.description">
                            <div class="card-header">
                                <font-awesome-icon icon="fa-solid fa-trash-can" class="icon-delete" @click="eliminate(element.id)"/>
                            </div>
                            <div class="card-body" @click="edit(element)">
                                <p>
                                    {{ element.description }}<br>
                                    <span class="estimation-task">Estimación: {{ element.estimation_at }}</span>
                                </p>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>
            <div class="col-3">
                <div class="p-2 alert alert-primary">
                    <span class="add-task" @click="add('working')">+ add task</span>
                    <draggable class="list-group kanban-column" :list="working" group="tasks" @change="moveWorking">
                        <div :class="'card '+( compareDates(formatDate(new Date()),element.estimation_at) ? 'card-expired' : '')" v-for="element in working" :key="element.description">
                            <div class="card-header">
                                <font-awesome-icon icon="fa-solid fa-trash-can" class="icon-delete" @click="eliminate(element.id)"/>
                            </div>
                            <div class="card-body" @click="edit(element)">
                                <p>
                                    {{ element.description }}<br>
                                    <span class="estimation-task">Estimación: {{ element.estimation_at }}</span>
                                </p>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>
            <div class="col-3">
                <div class="p-2 alert alert-success">
                    <div class="row">
                        <div class="col-6" @click="showArchived=!showArchived">
                            <span class="archived-task">{{`+ ${archived.length} archived tasks`}}</span>
                        </div>
                        <div class="col-6">
                            <span class="add-task" @click="add('done')">+ add task</span>
                        </div>
                    </div>

                    <draggable class="list-group kanban-column" :list="done" group="tasks" @change="moveDone">
                        <div :class="'card'" v-for="element in done" :key="element.description" >
                            <div class="card-header">
                                <span class="archived-task">
                                    Finalizada:
                                </span>
                                {{ element.delivery_at }}
                                <font-awesome-icon icon="fa-solid fa-trash-can" class="icon-delete" @click="eliminate(element.id)"/>
                            </div>
                            <div class="card-body" @click="edit(element)">
                                <p>
                                    {{ element.description }}<br>
                                    <span class="estimation-task">Estimación: {{ element.estimation_at }}</span>
                                </p>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>
            <div class="col-3" v-if="showArchived">
                <div class="p-2 alert alert-secondary">
                    <draggable class="list-group kanban-column" :list="archived" group="tasks">
                        <div :class="'card'" v-for="element in archived" :key="element.description">
                            <div class="card-header">
                                <span class="archived-task">
                                    Finalizada:
                                </span>
                                {{ element.delivery_at }}
                            </div>
                            <div class="card-body">
                                <p>
                                    {{ element.description }}<br>
                                    <span class="estimation-task">Estimación: {{ element.estimation_at }}</span>
                                </p>
                            </div>
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
            showArchived:false,
            errors:{}
        };
    },
    computed: {
        ...mapState({
            buffer: (state) => state.card.cards.buffer,
            working: (state) => state.card.cards.working,
            done: (state) => state.card.cards.done,
            archived: (state) => state.card.cards.archived,
        }),
    },
    created(){
        this.$store.dispatch("card/GET_CARDS");
    },
    methods: {
        async add(type) {
            const { value: formValues } = await Swal.fire({
                title: 'Edit task',
                html:
                `
                    <label>Descripción</label>
                    <input id="swal-input1" class="swal2-input">
                    <label>Estimación</label>
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
                }).catch(error => {
                    this.errors = error.response.data.errors
                    this.$store.commit("alert/show", {
                        icon: "error",
                        text: error.response.data.message,
                    });
                })
            }
        },
        async edit(element){
            const { value: formValues } = await Swal.fire({
                title: 'Edit card',
                html:
                `
                    <label>Descripción</label>
                    <input id="swal-input1" class="swal2-input" value="${element.description}">
                    <label>Estimación</label>
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
                }).catch(error => {
                    this.errors = error.response.data.errors
                    this.$store.commit("alert/show", {
                        icon: "error",
                        text: error.response.data.message,
                    });
                })
            }
        },
        eliminate(id){
            this.$store.dispatch('card/DELETE_CARD', id)
            .then(response => {
                this.$store.dispatch("card/GET_CARDS");
            })
        },
        moveBuffer: function(evt){
            if(evt.added){
                this.$store.dispatch('card/EDIT_CARD',{
                    id: evt.added.element.id,
                    description: evt.added.element.description,
                    stage: 'buffer',
                    estimation_at: evt.added.element.estimation_at,
                    delivery_at: null
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
                    estimation_at: evt.added.element.estimation_at,
                    delivery_at: null
                })
                .then(response => {
                })
            }
        },
        moveDone: function(evt){
            if(evt.added){
                this.$store.dispatch('card/EDIT_CARD',{
                    id: evt.added.element.id,
                    description: evt.added.element.description,
                    stage: 'done',
                    estimation_at: evt.added.element.estimation_at,
                    delivery_at: this.formatDate(new Date())
                })
                .then(response => {
                    this.$store.dispatch("card/GET_CARDS");
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
            ].join('-');
        },
        compareDates(today,day){
            return new Date(day) < new Date(`${today}`)
        },
        displayToast(){
            this.$store.commit("alert/show", {
                icon: "success",
                text: "Felicitaciones por lograrlo!",
            });

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
.archived-task{
    text-align: left;
    display: block;
    cursor: pointer;
    font-size: x-small;
}
.estimation-task{
    text-align: right;
    display: block;
    font-size: x-small;
}
.card-expired{
    color: red;
}
.card{
    cursor: move;
}
.icon-delete{
    display: block;
    float: right;
    cursor: pointer;
}
.card-header {
    padding-top: 0.75rem;
    padding-right: 1.25rem;
    padding-bottom: 0rem;
    padding-left: 1.25rem;
    margin-bottom: 0;
    background-color: rgb(255 255 255);
    border-bottom: 0px solid rgba(0, 0, 0, 0.125);
}
.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding-top: 0.75rem;
    padding-right: 1.25rem;
    padding-bottom: 1.25rem;
    padding-left: 1.25rem;
}
</style>
