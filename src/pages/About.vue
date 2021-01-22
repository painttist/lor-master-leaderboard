

<template>
    <p>About page.</p>
    <!-- <p v-if="hasName">{{name}}</p> -->
    <base-navbar></base-navbar>
</template>

<script>
import BaseNavbar from '../components/BaseNavbar.vue'

export default {
  components: { BaseNavbar },
  // props: ["name"],
  // computed: {
  //   hasName() {
  //     return (this.name.length > 0)
  //   }
  // }
  // components: {
  //   MainLayout
  // }
}
</script>
