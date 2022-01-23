<template>
  <div>
    <!-- toolbar -->
    <div class="m-toolbar">
      <button class="m-btn m-btn-icon" @click="btnAddOnClick()">
        <i class="mi mi-16 mi-new m-mr-5"></i>
        Thêm
      </button>
      <button class="m-btn m-btn-icon" @click="btnDupOnClick()">
        <i class="mi mi-16 mi-duplicate m-mr-5"></i>
        Nhân bản
      </button>
      <button class="m-btn m-btn-icon" @click="btnUpdateOnClick()">
        <i class="mi mi-16 mi-update m-mr-5"></i>
        Sửa
      </button>
      <button class="m-btn m-btn-icon" @click="btnDelOnClick()">
        <i class="mi mi-16 mi-delete m-mr-5"></i>
        Xóa
      </button>
      <button class="m-btn m-btn-icon" @click="btnRefreshOnClick()">
        <i class="mi mi-16 mi-refresh m-mr-5"></i>
        Nạp
      </button>
    </div>
    <!-- GRID -->
    <material-list-grid
      :materials="materials"
      :materialId="materialId"
      @onClickRowActive="onClickRowActive"
      @setObjectFilter="setObjectFilter"
      @onChangeSortObject="onChangeSortObject"
    ></material-list-grid>
    <!-- end Table Grid -->
  </div>
</template>
<script>
import MaterialListGrid from "./MaterialListGrid";
import Enum from "@/commons/enums.js";
import MaterialApi from "@/apis/materialApi.js";

// import { eventBus } from "../../main";

export default {
  props: ["materials", "mode", "materialId", "material"],
  components: {
    MaterialListGrid,
  },
  methods: {
    /**
     * Khi thay đổi đối tượng sắp xếp
     * Author: CTKimYen (23/1/2022)
     */
    onChangeSortObject(objSort) {
      this.$emit("onChangeSortObject", objSort);
    },
    /**
     * Khi click button Thêm
     * Author: CTKimYen (20/1/2022)
     */
    async btnAddOnClick() {
      await this.$emit("resetForm");
      this.$emit("editFormMode", Enum.FormMode.Add);
      this.$emit("showModal", true);
    },
    /**
     * Khi click button Nhân bản
     * Author: CTKimYen (20/1/2022)
     */
    btnDupOnClick() {
      let me = this;
      me.$emit("editFormMode", Enum.FormMode.Add);
      // set mã code mới
      me.getNewMaterialCode(me.material.MaterialName);
      // Lấy ra bản ghi hiện tại
      MaterialApi.getSingle(me.materialId)
        .then(function (res) {
          // gán thông tin NVL lấy được cho material bỏ trường Khóa chính
          let obj = {
            MaterialCode: res.data.MaterialCode,
            MaterialName: res.data.MaterialName,
            Note: res.data.Note,
            Expiry: res.data.Expiry,
            TimeUnit: res.data.TimeUnit,
            Quantity: res.data.Quantity,
            IsFollow: res.data.IsFollow,
            UnitId: res.data.UnitId,
            UnitName: res.data.UnitName,
            WarehouseId: res.data.WarehouseId,
            MaterialCategoryId: res.data.MaterialCategoryId,
            MaterialCategoryName: res.data.MaterialCategoryName,
            Conversions: res.data.Conversions,
          };
          obj.Conversions.forEach((con) => {
            con.ConversionId = null;
          });

          me.$emit("getSingle", obj);
          // Show modal detail
          me.$emit("showModal", true);
        })
        .catch(function (e) {
          console.log(e);
        });
    },
    /**
     * Khi click button Sửa
     * Author: CTKimYen (20/1/2022)
     */
    btnUpdateOnClick() {
      this.$emit("editFormMode", Enum.FormMode.Update);
      let me = this;
      // Lấy ra bản ghi hiện tại
      MaterialApi.getSingle(me.materialId)
        .then(function (res) {
          // gán thông tin NVL lấy được cho material
          me.$emit("getSingle", res.data);
          // Show modal detail
          me.$emit("showModal", true);
        })
        .catch(function (e) {
          console.log(e);
        });
    },
    /**
     * Khi click button Xóa
     * Author: CTKimYen (20/1/2022)
     */
    btnDelOnClick() {
      let me = this;
      if (confirm("Bạn thực sự muốn xóa bản ghi này?")) {
        MaterialApi.delete(this.materialId)
          .then(function () {
            me.$emit("getAllData");
          })
          .catch(function (e) {
            console.log(e);
          });
      }
    },
    /**
     * Khi click button Nạp
     * Author: CTKimYen (20/1/2022)
     */
    btnRefreshOnClick() {
      this.$emit("getAllData");
    },
    /**
     * Chọn 1 đối tượng
     * Author: CTKimYen (22/1/2022)
     */
    onClickRowActive(entity) {
      this.$emit("onClickRowActive", entity);
    },
    /**
     * Thực hiện gọi api lấy mã NVL mới
     * Author: CTKimYen (21/1/2022)
     */
    getNewMaterialCode() {
      let me = this;
      MaterialApi.getNewCode(me.material.MaterialName)
        .then((response) => {
          me.material.MaterialCode = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Thiết lập giá trị cho danh sách lọc
     * Author: CTKimYen (23/1/2022)
     */
    setObjectFilter(object) {
      this.$emit("setObjectFilter", object);
    },
  },
};
</script>
