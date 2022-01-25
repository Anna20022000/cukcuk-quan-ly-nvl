<template src="./materialListGrid.html"></template>

<script>
import BaseInputFilter from "../../../components/BaseInputFilter.vue";
import { VueLoading } from "vue-loading-template";
import _ from "lodash";
export default {
  props: ["materials", "materialId", "loading"],
  components: {
    BaseInputFilter,
    VueLoading,
  },
  data() {
    return {
      sortName: null,
      /** Thứ tự hiển thị dữ liệu (true-asc; false-desc) */
      sortOrder: false,
      /** Ẩn/hiện icon */
      sortSubmitted: false,
      /** Danh sách nhóm NVL */
      materialCategories: [],
    };
  },
  methods: {
    /**
     * Khi sử dụng phím lên/xuống trên bàn phím
     * Author: CTKimYen (25/1/2022)
     */
    ArrowUpDown(event) {
      try {
        // lấy ra index của NVL đang được chọn
        let indexCurrent = _.findIndex(this.materials, [
          "MaterialId",
          this.materialId,
        ]);
        switch (event.srcKey) {
          case "up":
            this.onClickRowActive(this.materials[--indexCurrent]);
            break;
          case "down":
            this.onClickRowActive(this.materials[++indexCurrent]);
            break;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Khi click vào 1 hàng dữ liệu -> active và lấy về id
     * Author: CTKimYen (22/1/2022)
     */
    onClickRowActive(entity) {
      try {
        this.$emit("onClickRowActive", entity);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Khi dbl click vào 1 hàng dữ liệu -> hiển thị form sửa
     * Author: CTKimYen (25/1/2022)
     */
    rowOnDblClick(entity) {
      try {
        this.onClickRowActive(entity);
        this.$emit("btnUpdateOnClick");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thiết lập giá trị cho danh sách lọc
     * Author: CTKimYen (23/1/2022)
     */
    setObjectFilter(object) {
      try {
        this.$emit("setObjectFilter", object);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Khi click vào tiêu đề cột thì tạo mới một đối tượng sắp xếp
     * Author: CTKimYen (23/1/2022)
     */
    onChangeSortObject(columnName) {
      try {
        this.sortName = columnName;
        this.sortSubmitted = true;
        this.sortOrder = !this.sortOrder;
        this.objSort = {
          Column: columnName,
          Sort: this.sortOrder == true ? "ASC" : "DESC",
        };
        this.$emit("onChangeSortObject", this.objSort);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.m-loading-table {
  height: 100%;
  width: 100%;
  background-color: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-loading-content {
  padding: 10px;
  background-color: #f5f5f5;
  color: #757575;
  font-size: 12px;
  border-radius: 4px;
}
.m-loading-title {
  padding-top: 4px;
}
</style>
