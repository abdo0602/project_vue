<template>
  <div id="about">
    <h1>Application to calculate taxes on unbuilt lands</h1>
  <div id="calculator">
    <label for="surface">
      <input type="text" v-model="surface" placeholder="surfface">
    </label>
    <label for="date">
      <input type="date" v-model="date">
    </label>
    <label for="taux">
      <select name="type" id="type">
        <option v-for="x in taux" v-bind:key="x" v-bind:value="x">{{ x }}</option>
      </select>
    </label>
    <button @click="calculate">calculate</button>
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
    axios.get('127.0.0.1/categorie/all').then((res) => { for (const [key, values] of Object.entries(res)) { this.taux.push(values); } }).catch(alert('can\'t reach server'), this.taux.push(15), this.taux.push(25), this.taux.push(30));
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
</style>
