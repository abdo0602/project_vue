<template>
  <div id="about">
    <h1>Application to calculate taxes on unbuilt lands</h1>
  <div id="calculator">
    <label for="surface">
      <input type="text" v-model="surface" placeholder="surfface" class="form-control">
    </label>
    <label for="date">
      <input type="date" v-model="date" class="form-control">
    </label>
    <label for="taux">
      <select name="type" id="type" class="form-control">
        <option v-for="x in taux" v-bind:key="x" v-bind:value="x.taux">{{ x.nomCategorie }}</option>
      </select>
    </label>
    <button @click="calculate" class="btn btn-success">calculate</button>
    <p>{{ taxe }}</p>
  </div>
  </div>
</template>

<script>
/* eslint-disable */
import { defineComponent } from 'vue';
import axios from 'axios';

const yourDate = new Date();
const x = yourDate.toISOString().split('T')[0];

export default defineComponent({
  name: 'UserView',
  mounted() {
    axios.get('127.0.0.1/categorie/all').then((res) => { for (obj of Object.entries(res)) { this.taux.push(obj); } })
    .catch((err) => {
      alert(err.message);
      this.taux.push({"id": 0, "nomCategorie": "villa", "taux": 2.5});
      this.taux.push({"id": 0, "nomCategorie": "maison", "taux": 1.5});
    });
  },
  data() {
    return {
      dateNow: x,
      date: x,
      surface: '',
      taux: [],
      taxe: 0,
    };
  },
  methods: {
    calculate() {
      console.log(this.dateNow.split('-')[0] - this.date.split('-')[0]);
      this.taxe = (this.dateNow.split('-')[0] - this.date.split('-')[0]) * this.surface * document.querySelector('#type').value;
    },
  },
});
</script>

<style>
  #about{
    position: absolute;
        top: 10%;
        left: 0;
        width: 100%;
        height: 90%;
        border-top: 1px black dotted;
  }
  #calculator{
    margin-top: 150px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #calculator *{
    width: 45%;
    text-align: center;
    margin-bottom: 5px;
  }
  #calculator button{
    width: 15%;
  }
  label{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
