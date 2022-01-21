<template>
  <div>
    <!-- toolbar -->
    <div class="m-toolbar">
      <button class="m-btn m-btn-icon" @click="showModal()">
        <i class="mi mi-16 mi-new m-mr-5"></i>
        Thêm
      </button>
      <button class="m-btn m-btn-icon">
        <i class="mi mi-16 mi-duplicate m-mr-5"></i>
        Nhân bản
      </button>
      <button class="m-btn m-btn-icon">
        <i class="mi mi-16 mi-update m-mr-5"></i>
        Sửa
      </button>
      <button class="m-btn m-btn-icon">
        <i class="mi mi-16 mi-delete m-mr-5"></i>
        Xóa
      </button>
      <button class="m-btn m-btn-icon">
        <i class="mi mi-16 mi-refresh m-mr-5"></i>
        Nạp
      </button>
    </div>
    <!-- grid -->
    <material-list-grid :materials="materials"></material-list-grid>
  </div>
</template>
<script>
import MaterialListGrid from "./MaterialListGrid";
// import { eventBus } from "../../main";

export default {
  props: ["materials", "mode"],
  components: {
    MaterialListGrid,
  },
  data() {
    return {};
  },
  methods: {
    showModal() {
      this.$emit("showModal", true);
    },
  },
  // created() {
  //   eventBus.$on("showModal", () => {
  //     this.showModal();
  //   });
  // },
};
</script>
