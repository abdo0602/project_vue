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
                <label for="terrain">
                    <input type="terrain" v-model="terrain" />
                </label>
                <input type="submit" @click.prevent="lookup" value="submit form"/>
        </form>
    </nav>
    <div id="data" v-if="!data_in">
        <p>CIN : {{ cin }}</p>
        <p>terrain : {{ terrain }}</p>
        <p>Date : {{ date }}</p>
        <p>Taxes : {{ tax }}</p>
    </div>
    <div id="data" v-else-if="hasTaxe">
        <p>Mr. {{ name }} owner of the land No° {{ terrain }} with the id card number {{ cin }}
            , owes the nation an ammount of
            {{ tax }} Moroccan dirham check bellow for previous payments</p>
        <Bar :options="chartOptions" :data="chartData"/> </div>
        <div id="data" v-else><p>Mr. {{ name }} owner of the land No° {{ terrain }} with
           the id card number {{ cin }} paid all his taxes</p></div>
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
      date: x,
      tax: 0,
      terrain: 1,
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
    lookup() {
      axios.get('/' + this.terrain + '/is-tax-paid', { params: { year: this.year } }).then((res) => {
        this.data_in = true;
        this.hasTaxe = !res;
        if(res == true) {
          axios.get('/' + this.terrain + '/calculate-tax').then((res) => {
            this.tax = res;
          }).catch(alert('can\'t connect to remoste host'));
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
</style>
