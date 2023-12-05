<template>
    <div>
        <div :class="{isntlogged: !loggedIn, islogged: loggedIn} ">
            <form>
                <p>log in</p>
                <label for="username">
                    <input type="text" placeholder="username" class="creds"/>
                </label>
                <label for="password">
                    <input type="password" placeholder="********" class="creds"/>
                </label>
                <input type="submit" @click.prevent="login" />
            </form>
        </div>
        <div :class="{isntlogged: loggedIn, islogged: !loggedIn}">
            hi
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminView',
  data() {
    return {
      token: '',
      loggedIn: false,
    };
  },
  methods: {
    login() {
      console.log('hi, trying to log in');
      this.loggedIn = !this.loggedIn;
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
</style>
