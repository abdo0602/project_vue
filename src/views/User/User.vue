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
    <div id="data">
        <p>CIN : {{ cin }}</p>
        <p>terrain : {{ terrain }}</p>
        <p>Date : {{ date }}</p>
        <p>Taxes : {{ tax }}</p>
    </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

const yourDate = new Date();
const x = yourDate.toISOString().split('T')[0];

export default defineComponent({
  name: 'UserView',
  data() {
    return {
      cin: 'testing value', date: x, tax: 0, terrain: 'testing value',
    };
  },
  methods: {
    lookup() {
      console.log('looking up');
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
