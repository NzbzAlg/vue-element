<template>
  <div class="uesr">
      <Crumbs></Crumbs>
  </div>
</template>

<script>
import Crumbs from "@/components/crumbs";
export default {
  components: {
      Crumbs
  },
  data() {
    return {};
  },
  created() {
    // this.activePath = window.sessionStorage.getItem("activePath");
  }
};
</script>