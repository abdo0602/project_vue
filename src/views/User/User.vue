<template>
    <div id="userapp">
        <nav id="datanav">
            <form>
              {{ terrain }}
                <label for="cin">
                    <input type="text" v-model="cin" />
                </label>
                <label for="date">
                    <input type="date" v-model="date" />
                </label>
                <input type="submit" @click.prevent="getterrains" value="submit form"/>
        </form>
    </nav>
    <div id="data" v-if="!data_in">
        <ul>
          <li v-for="obj in terrains" v-bind:key="obj">
            <p>{{ obj.addresse }}</p>
            <div @click.prevent="terrain = obj.terrainID" @keyPress={handleClick}>Interract</div>
          </li>
        </ul>
    </div>
    <div id="datatest" v-else-if="hasTaxe">
        <ul>
          <li>Mr. {{ name }}</li>
          <li>cin: {{ cin }}</li>
          <li>Date : {{ next_date }}</li>
          <li>Taxes : {{ tax }}</li>
        </ul>
        <Bar :options="chartOptions" :data="chartData"/> </div>
        <div id="data" v-else><p>Mr. {{ name }} owner of the land No° {{ terrain }} with
           the id card number {{ cin }} paid all his taxes </p></div>
    </div>
</template>

<script>
/* eslint-disable */
import { defineComponent } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const yourDate = new Date();
const x = yourDate.toISOString().split('T')[0];

export default defineComponent({
  name: 'UserView',
  components: { Bar },
  data() {
    return {
      cin: 'testing value',
      name: 'aaaaa',
      hasTaxe: true,
      next_date: x.split('-')[0],
      date: x,
      tax: 0,
      terrain: 1,
      terrains: [{id: 1, surface: 250, addr: "terrain 1"}, {id: 2, surface: 250, addr: "terrain 1"}
      , {id: 3, surface: 250, addr: "terrain 1"}],
      data_in: true,
      chartData: {
        labels: [x.split('-')[0] - 2, x.split('-')[0] - 1, x.split('-')[0]],
        datasets: [{ data: [40, 20, 12] }],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  methods: {
    handleClick() {
      console.log("");
    },
    getterrains() {
      axios.get('127.0.0.1/terrain/proprietaire' + this.cin).then(res => {
        this.terrains = res;
      }).catch((err) => {alert(err.message)})
    },
    lookup() {
      axios.get('127.0.0.1/' + this.terrain + '/is-tax-paid', { params: { year: this.year } }).then((res) => {
        this.data_in = true;
        this.hasTaxe = !res;
        if(res == true) {
          axios.get('127.0.0.1/' + this.terrain + '/calculate-tax').then((res) => {
            this.tax = res;
          }).catch(alert('can\'t connect to remote host'));
        }
      } ).catch(alert('can\'t connect to remoste host'));;
    },
  },
});
</script>

<style>
    #userapp{
        position: absolute;
        top: 10%;
        left: 0;
        width: 100%;
        height: 90%;
        border-top: 1px black dotted;
    }
    #datanav{
        left: 0;
        top: 0;
        width: 20%;
        height: 100%;
        border-right: 1px black dotted;
    }
    #datanav{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #datanav form input{
        margin-bottom: 15px;
        border-radius: 5px;
        text-align: center;
        width: 75%;
    }
    input:focus{outline-color: red;}
    #datatest{
      position: relative;
        height: 50%;
        width: 75%;
        top:-80%;
        left: 20%;
        display: flex;
        align-items: center;
    }
    #datatest ul{
      margin-right: 15px;
      text-align: left;
    }
    #data{
        position: relative;
        height: 50%;
        width: 75%;
        top:-80%;
        left: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #data ul{
      width: 100%;
    }
    #data li{
      display: flex;
      width: 100%;
      height: 20%;
      border-top: 1pt black dotted;
      border-left: 1pt black dotted;
    }
    #data li:last-child{
      border-bottom: 1pt black dotted;
    }
    #data li *{
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #data li div{
      flex-grow:1;
      background-color: lime;
      border-right: 1pt black dotted;
      border-radius: 25% 0 0 0;
    }
    #data li p{
      flex-grow: 8;
    }
    #data li div:hover{background-color: green;}
</style>
