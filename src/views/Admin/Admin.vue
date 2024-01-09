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
            <div class="pop_up_container" @click="hidePop" v-if="pop_up" @keyPress={handleClick}>
              <div class="pop_up" @click.stop.prevent="" @keyPress={handleClick}>
                <ul>
                  <li>Mr {{ pop_obj.nom }}, {{ pop_obj.prenom }}</li>
                  <li>{{ pop_obj.addresse }}</li>
                  <button @click.prevent="payTax(pop_obj)">Pay Tax</button>
                </ul>
              </div>
            </div>
            <div class='adminInterface'>
                <div class='testForm'>
                  <ul>
                    <li v-for="obj in redevables" v-bind:key="obj"><p>{{ obj.nom }}</p>
                      <p>{{ obj.prenom }}</p>
                      <p>{{ obj.addresse }}</p>
                      <div @click.prevent="showPop(obj)" @keyPress={handleClick}>Interact</div></li>
                  </ul>
                </div>
                <div class='adminForm'>
                    <p>Add a user to the database</p>
                    <form>
                        <label for='nomAdd'>
                          <input type='text' name='nomAdd' placeholder='nom' v-model="nomAdd"/>
                        </label>
                        <label for='prenomAdd'>
                          <input type='text' name='prenomAdd' placeholder='prenom'
                           v-model="prenomAdd"/>
                        </label>
                        <label for='adresseAdd'>
                          <input type='text' name='adresseAdd' placeholder='addresse'
                           v-model="adresseAdd"/>
                        </label>
                        <label for='cinAdd'>
                          <input type='text' name='cin' placeholder='cinAdd'>
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
    ];
    });
  },
  data() {
    return {
      nomAdd: '',
      prenomAdd: '',
      adresseAdd: '',
      cinAdd:'',
      redevables: [],
      pop_up: false,
      terrain: '',
      cin: '',
      name: '',
      token: '',
      userName: '',
      pass: '',
      loggedIn: true,
      error: false,
      pop_obj: null,
    };
  },
  methods: {
    login() {
      axios.post('127.0.0.1/auth/token', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}} , '{username: this.userName, password: this.pass}').then((res) => {
        localStorage.setItem("token", res.data);
        this.loggedIn = true;
      }).catch((err) => {
        this.error = err.message;
      });
    },
    add() {
      axios.post('127.0.0.1/add', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}, '{"redevable": {"cin": this.cinAdd, "nom": this.nomAdd,'+
      '"prenom": this.prenomAdd, "adresse": this.adresseAdd}}')
      .then((res) => {
        if (res.status === 200) {
          alert('redevable ajouté');
        }
      }).catch((err) => {
        alert(err.message);
      });
    },
    hidePop() {
      this.pop_up = false;
    },
    showPop(obj) {
      this.pop_obj = obj;
      this.pop_up = true;
    },
    payTax(obj) {
      axios.post('/pay', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}},
       '{obj.cin, token: this.token}')
        .then((res) => {
          if (res.status === 200) {
            alert('tax paid');
          }
        })
        .catch((err) => {
          alert(err.message);
        });
      alert('tryin to pay land Taxes of Mr: ' + obj.nom + ', endpoint not implemented yet');
    },
    handleClick() {
      console.log("");
    },
  },
});
</script>

<style>
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
li div:hover{
  background-color: green;
  cursor: pointer;
}
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
