<template>
    <p>About page.</p>
    <p v-if="hasName">{{name}}</p>
</template>

<script>

export default {
  props: ["name"],
  computed: {
    hasName() {
      return (this.name.length > 0)
    }
  }
  // components: {
  //   MainLayout
  // }
}
</script>
