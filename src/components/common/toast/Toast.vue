<template>
  <div v-show="isShow" class="toast">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  //   props: {
  //       msg: {
  //           type: String,
  //           default: ''
  //       },
  //       isShow: {
  //           type: Boolean,
  //           default: false
  //       }
  //   }
  data() {
    return {
      msg: "",
      isShow: false,
    };
  },
  methods: {
      show(msg, duration) {
          console.log('toast.show');
          this.msg = msg;
          this.isShow = true;
          setTimeout(() => {
              this.isShow = false;
          }, duration)
      }
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgb(0, 0, 0, 0.75);
}
</style>