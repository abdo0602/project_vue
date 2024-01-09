<template>
    <div id="userapp">
        <nav id="datanav">
            <form>
                <label for="cin">
                    <input type="text" v-model="cin" />
                </label>
                <label for="date">
                    <input type="date" v-model="date" />
                </label>
                <input type="submit" @click.prevent="getterrains" value="submit form"/>
        </form>
    </nav>
    <div class="pop_up_container" @click="pop_up = false" v-if="pop_up" @keyPress={handleClick}>
      <div class="pop_up" @click.stop.prevent="" @keyPress={handleClick}>
        <ul>
          <li>{{ pop_obj.terrainID }}</li>
          <li>{{ pop_obj.adresse }}</li>
          <button @click.prevent="submit">submit</button>
        </ul>
      </div>
    </div>
    <div id="data" v-if="!data_in">
        <ul>
          <li v-for="obj in terrains" v-bind:key="obj">
            <p>{{ obj.addresse }}</p>
            <div @click.prevent="selectObj(obj)" @keyPress={handleClick}>Interract</div>
          </li>
        </ul>
    </div>
    <div id="datatest" v-else-if="tax != 0">
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
      pop_obj: null,
      pop_up: false,
      cin: 'testing value',
      name: 'aaaaa',
      next_date: x.split('-')[0],
      date: x,
      tax: 100,
      terrain: 1,
      terrains: [],
      data_in: false,
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
    selectObj(obj) {
      this.pop_obj = obj;
      this.pop_up = true;
    },
    handleClick() {
      console.log("");
    },
    getterrains() {
      axios.get('http://127.0.0.1/terrain/proprietaire' + this.cin).then(res => {
        this.terrains = res.data;
      }).catch((err) => {
        alert(err.message);
        this.terrains.push({"terrainID": 1, "surface": 250, "addresse": "terrain 1"});
        this.terrains.push({"terrainID": 1, "surface": 250, "addresse": "terrain 1"});
        this.terrains.push({"terrainID": 1, "surface": 250, "addresse": "terrain 1"});
      })
    },
    submit() {
      axios.get('http://127.0.0.1/' + this.pop_obj.terrainID + '/is-tax-paid', { params: { year: this.year } }).then((res) => {
        this.data_in = true;
        if(res == true) {
          axios.get('http://127.0.0.1/' + this.pop_obj.terrainID + '/calculate-tax').then((res) => {
            this.tax = res.data;
          }).catch((err) => alert(err.message));
        }
      } ).catch((err) => {
        alert(err.message);
        this.data_in = true;
        this.tax = 100;
        this.pop_up = false;
      });
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
      border: 1px black dotted;
      margin-left: 2px;
      position: relative;
      left: 10px;
      top: -40px;
    }
    #datatest li{
      border: 0;
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
    .pop_up_container{
  background-color: rgba(40, 40, 40, 0.7);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20%;
  right: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pop_up{
  background-color: rgba(230, 230, 230, 0.7);
  width: 70%;
  height: 70%;
  display: flex;
  justify-content: center;
  
}
.pop_up *{
  border: 0;
}
.pop_up button{
  width: 20%;
  height: 30px;
  background-color: lime;
}
.pop_up button:hover{
  background-color: green;
  cursor: pointer;
}
</style>
