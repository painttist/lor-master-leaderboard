<template>
  <div id="content">
    <h1 id="title">LoR Master Info</h1>
    <base-card class="card" :to="'/leaderboard'">Leaderboard</base-card>
    <base-footer></base-footer>
  </div>
  <base-navbar></base-navbar>
  
</template>

<script>
import BaseNavbar from '../components/BaseNavbar.vue'
import BaseCard from '../components/BaseCard.vue'
import BaseFooter from '../components/BaseFooter.vue'

export default {
  components: { BaseNavbar, BaseCard, BaseFooter},
  
}
</script>

<style scoped>
  #title {
    margin-top: 0px;
    margin-bottom: 100px;
  }

  .card {
    margin-bottom: 100px;
  }

  #content {
    display: flex;
    height: 100vh;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
</style>
