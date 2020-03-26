<template>
    <div class="finance">
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
}
</script>