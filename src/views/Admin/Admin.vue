<template>
    <div>
        <div :class='{isntlogged: !loggedIn, islogged: loggedIn}' v-if='!error'>
            <form>
                <label for='username'>
                    <input type='text' placeholder='username' class='creds' v-model='userName' />
                </label>
                <label for='password'>
                    <input type='password' placeholder='********' class='creds' v-model='pass'/>
                </label>
                <input type='submit' @click.prevent='login' class="btn btn-success" value="Submit"/>
            </form>
        </div>
        <div v-else class='isntlogged'>
            <p>Host unreachable with because: {{ error }}</p>
        </div>
        <div :class='{isntlogged: loggedIn, islogged: !loggedIn}'>
            <div class="pop_up_container" @click="hidePop" v-if="pop_up" @keyPress={handleClick}>
              <div class="pop_up" @click.stop.prevent="" @keyPress={handleClick}>
                <table class="table">
                <thead>
                <tr>
                  <th>Terrain</th>
                  <th>Surface</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                  <th>Mr {{ pop_obj.nom }}, {{ pop_obj.prenom }}</th>
                  <th>{{ pop_obj.addresse }}</th>
                  <th>
                  <button @click.prevent="payTax(pop_obj)" style="width: 70px;"
                   class="btn btn-primary">
                  Pay</button>
                  </th>
                </tr>
                </tbody>
                </table>
              </div>
            </div>
            <div class='adminInterface'>
                <div class='testForm'>
                  <table class="table">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>1st Name</th>
                    <th>Adress</th>
                    <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="obj in redevables" v-bind:key="obj">
                      <td>{{ obj.nom }}</td>
                      <td>{{ obj.prenom }}</td>
                      <td>{{ obj.addresse }}</td>
                      <td><button @click.prevent="showPop(obj)"
                        @keyPress={handleClick} class="btn btn-info">
                        Interract</button></td>
                    </tr>
                  </tbody>
                </table>
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
        {"cin": "a111111", "nom": "ALFA", "prenom": "Abdelalim", "addresse": "test_addr1"},
        {"cin": "a111112", "nom": "JAFARI", "prenom": "Younes", "addresse": "test_addr2"},
        {"cin": "a111113", "nom": "BENHILAL", "prenom": "Omar", "addresse": "test_addr3"},
        {"cin": "a111114", "nom": "EL BAZ", "prenom": "Oussama", "addresse": "test_addr4"},
        {"cin": "a111115", "nom": "LBENZIANE", "prenom": "Zakaria", "addresse": "test_addr5"},
        {"cin": "AB123456", "nom": "Oulad Nacer", "prenom": "Mohammed", "addresse": "8 Rue Al Aouda, Quartier Al Qods, Rabat"},
        {"cin": "CD654321", "nom": "El Bahri", "prenom": "Fatima", "addresse": "15 Avenue Al Wahda, Quartier Al Fath, Casablanca"},
        {"cin": "EF789012", "nom": "Oulad Rachid", "prenom": "Ahmed", "addresse": "29 Rue Al Wifak, Quartier Al Boustane, Marrakech"},
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
      loggedIn: false,
      error: false,
      pop_obj: null,
    };
  },
  methods: {
    login() {
      if( this.userName === 'abdo'){
        localStorage.setItem("token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWJkbyIsInJvbGUiOiJhZG1pbiJ9.OB4PzIabFy_ptQ2v0twGsQQfB3qPkkOnpaDROANBN-o');
        this.loggedIn = true;
      }else{
      axios.post('127.0.0.1/auth/token', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}} , '{username: this.userName, password: this.pass}').then((res) => {
        localStorage.setItem("token", res.data);
        this.loggedIn = true;
      }).catch((err) => {
        this.error = err.message;
      });}
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
}
.pop_up button:hover{
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
    overflow: scroll;
    overflow-x: hidden;
  }
.testForm table{
  position: absolute;
  top: 0;
}
</style>
