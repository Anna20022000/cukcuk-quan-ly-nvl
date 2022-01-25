<template src="./materialList.html"></template>
<script>
import MaterialListGrid from "../materialListGrid/MaterialListGrid.vue";
import BasePopup from "../../../components/BasePopup.vue"
import Enum from "@/commons/enums.js";
import Resource from "@/commons/resources.js"
import MaterialApi from "@/apis/materialApi.js";

export default {
  props: ["materials", "mode", "materialId", "material", "loading"],
  components: {
    MaterialListGrid,
    BasePopup
  },
  data() {
    return {
      popupStatus: Enum.PopupStatus.Confirm,
      message: "",
      isShowPopup: false,
    }
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
   async btnDupOnClick() {
      let me = this;
      me.$emit("editFormMode", Enum.FormMode.Add);
      // Lấy ra bản ghi hiện tại
      await MaterialApi.getSingle(me.materialId)
        .then(function (res) {
          // gán thông tin NVL lấy được cho material bỏ trường Khóa chính
          let obj = {
            MaterialCode: null,
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
      // set mã code mới
      await me.getNewMaterialCode(me.material.MaterialName);
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
      const materialCurrent = this.materials.find(m=>m.MaterialId == me.materialId);
      this.message= Resource.Question.ConfirmDelete(materialCurrent.MaterialCode, materialCurrent.MaterialName);
      this.isShowPopup = true;
    },
    /**
     * Thực hiện xóa 1 NVL khi confim xóa
     * Author: CTKimYen (25/1/2022)
     */
    onDelete(){
      const me = this;
      MaterialApi.delete(me.materialId)
          .then(function () {
            me.$emit("getAllData");
          })
          .catch(function (e) {
            console.log(e);
          });
    },
    /**
     * Ẩn popup confirm khi xác nhận ko xóa
     * Author: CTKimYen (25/1/2022)
     */
    hidePopup(){
      this.isShowPopup = false;
    },
    /**
     * Khi click button Nạp
     * Chuyển về trang 1 và load lại dữ liệu
     * Author: CTKimYen (20/1/2022)
     */
    btnRefreshOnClick() {
      this.$emit("onChangePageIndex", 1);
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