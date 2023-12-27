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
                <div class='testForm'><form>
                        <label for='terrain'>
                            <input type='text' name='terrain' placeholder='terrain'
                            v-model='terrain'/>
                        </label>
                        <label for='cin'>
                            <input type='text' name='cin' placeholder='cin' v-model='cinToPay'>
                        </label>
                        <button @click.prevent='pay'>pay tax</button>
                    </form></div>
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
import { computed, defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'AdminView',
  data() {
    return {
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
    background-color: #37be9c;
    height: 100%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.testForm *{
    margin-bottom: 2px;
}
</style>
