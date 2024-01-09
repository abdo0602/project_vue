<template>
    <div>
        <div :class='{isntlogged: !loggedIn, islogged: loggedIn}' v-if='!error'>
            <form>
                <p>log in</p>
                <label for='username'>
                    <input type='text' placeholder='username' class='creds' v-model='userName'/>
                </label>
                <label for='password'>
                    <input type='password' placeholder='********' class='creds' v-model='pass'/>
                </label>
                <input type='submit' @click.prevent='login' />
            </form>
        </div>
        <div v-else class='isntlogged'>
            <p>Host unreachable with because: {{ error }}</p>
        </div>
        <div :class='{isntlogged: loggedIn, islogged: !loggedIn}'>
            <div class='adminInterface'>
                <div class='testForm'>
                  <ul>
                    <li v-for="obj in redevables" v-bind:key="obj"><p>{{ obj.nom }}</p>
                      <p>{{ obj.prenom }}</p>
                      <p>{{ obj.addresse }}</p><div>Interact</div></li>
                  </ul>
                </div>
                <div class='adminForm'>
                    <p>Add a user to the database</p>
                    <form>
                        <label for='user'>
                            <input type='text' name='user' placeholder='user' />
                        </label>
                        <label for='cin'>
                            <input type='text' name='cin' placeholder='cin'>
                        </label>
                        <button @click.prevent='add'>add</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'AdminView',
  mounted() {
    axios.get('http://127.0.0.1/redevable/all').then((res) => {
      this.redevables = res.data;
    }).catch((err) => {
      alert(err.message);
      this.redevables = [
        {"cin": "a111111", "nom": "test_name", "prenom": "test_lname", "addresse": "test_addr"},
        {"cin": "a111112", "nom": "test_name2", "prenom": "test_lname2", "addresse": "test_addr2"},
        {"cin": "a111113", "nom": "test_name3", "prenom": "test_lname3", "addresse": "test_addr3"}
    ]
    });
  },
  data() {
    return {
      redevables: [],
      cinToPay: '',
      terrain: '',
      cin: '',
      name: '',
      token: '',
      userName: '',
      pass: '',
      loggedIn: true,
      error: false,
    };
  },
  methods: {
    login() {
      axios.post('127.0.0.1/login', '{username: this.userName, password: this.pass}').then((res) => {
        this.token = res.token;
        this.loggedIn = true;
      }).catch((err) => {
        this.error = err.message;
      });
    },
    add() {
      axios.post('127.0.0.1/add', '{cin: this.cin, name: this.name}').then((res) => {
        if (res.status === 200) {
          alert(res.message);
        }
      }).catch((err) => {
        alert(err.message);
      });
    },
    pay() {
      axios.post('/pay', '{terrain: this.terrain, cin: this.cinToPay, token: this.token}')
        .then((res) => {
          if (res.status === 200) {
            alert('tax paid');
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    },
  },
});
</script>

<style>
.isntlogged{
    position: absolute;
    top: 10%;
    left: 0;
    width: 100%;
    height: 90%;
    border-top: 1px black dotted;
    display: flex;
    align-items: center;
    justify-content: center;
}
.isntlogged form{
    display: inherit;
    flex-direction: column;
    align-items:center;
}
.creds{
    text-align: center;
    width: 25vw;
    border-radius: 5px;
    margin-bottom: 15px
}
.isntlogged input:focus{
    outline-color:red;
}
.islogged{
    display:none;
}
.isntshown{display:none}
.adminInterface{
    width: 100%;
    height: 100%;
    padding: 0;
}
.adminForm button{
    width: 40%;
}
.adminForm input{
    width: 70%;
    margin-bottom: 5px;
}
.adminForm{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: gray;
}
.testForm{
    position: absolute;
    left: 20%;
    top: 0;
    height: 100%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
ul{
      width: 90%;
      margin: 0;
    }
li {
  display: flex;
  justify-content: center;
  align-items: center;
}
li *{
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
}
li p{
  flex-grow: 4;
}
li div{
      flex-grow:1;
      background-color: lime;
      border-right: 1pt black dotted;
      border-radius: 25% 0 0 0;
      height: 100%;
}
li div:hover{background-color: green;}
li:last-child{
      border-bottom: 1pt black dotted;
}
li{
      display: flex;
      width: 100%;
      height: 20%;
      border-top: 1pt black dotted;
      border-left: 1pt black dotted;
}
</style>
