<template>
  <div>
    <input type="checkbox" class="check" v-model="isCheck" />
  </div>
</template>

<script>
export default {
  name: "CheckBtn",
  props: {
    isCheck: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check {
  width: 20px;
  height: 20px;
  overflow: hidden;
  border-radius: 100%;
  border: 1px solid #ececec;
}
.check:checked {
  background: url(~assets/img/detail/check_active.png) no-repeat center;
  background-size: cover;
}
</style>