<template>
  <div class="container-welcome">
    <img src="../../assets/welcome.jpg" alt />
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('user/profile').then(res => {
      console.log(res.data)
    }).catch(() => {
      console.log('error')
    })
  }

}
</script>

<style scoped lang='less'>
img {
  display: block;
  margin: 0 auto;
}
</style>
