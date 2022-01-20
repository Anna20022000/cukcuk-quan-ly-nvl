<template>
  <div class="m-modal-medium" style="display: none" :class="{'m-modal-show': isShow }">
    <div class="m-modal">
      <div class="m-modal-header">
        <div class="m-modal-title">Thêm nguyên vật liệu</div>
        <div class="m-close-modal mi-16 mi-close" @click="hideModal"></div>
      </div>
      <!-- <form> -->
      <div class="m-modal-content">
        <!-- input nhập liệu NVL -->
        <div class="m-modal-group">
          <div class="m-modal-col-6 m-row m-pr-20">
            <div class="m-modal-col-3">Tên <span>(*)</span></div>
            <div class="m-modal-col-9">
              <input type="text" class="m-input"
              ref="txtMaterialName"
                v-tooltip.bottom="{ content: submitted && $v.material.MaterialName.$error ? 'Trường này không được để trống.' : null }"
                v-model="material.MaterialName"
                :class="{
                  'm-is-invalid': submitted && $v.material.MaterialName.$error,
                }"
                />
            </div>
          </div>
          <div class="m-modal-col-6 m-row">
            <div class="m-modal-col-3">Mã <span>(*)</span></div>
            <div class="m-modal-col-9">
              <input type="text" class="m-input" 
                v-tooltip.bottom="{ content: submitted && $v.material.MaterialCode.$error ? 'Trường này không được để trống.' : null }"
                v-model="material.MaterialCode"
                :class="{
                  'm-is-invalid': submitted && $v.material.MaterialCode.$error,
                }"
              />
            </div>
          </div>
        </div>
        <div class="m-modal-group">
          <div class="m-modal-col-6 m-row">
            <div class="m-modal-col-3" v-tooltip.bottom="'Đơn vị tính'">ĐVT <span>(*)</span></div>
            <div class="m-modal-col-9">
              <input type="text" class="m-input" 
                v-tooltip.bottom="{ content: submitted && $v.material.UnitId.$error ? 'Trường này không được để trống.' : null }"
                v-model="material.UnitId"
                :class="{
                  'm-is-invalid': submitted && $v.material.UnitId.$error,
                }"/>
            </div>
          </div>
          <div class="m-modal-col-6 m-row">
            <div class="m-modal-col-3">Kho ngầm định</div>
            <div class="m-modal-col-9">
              <input type="text" class="m-input" 
                v-model="material.WarehouseId"/>
            </div>
          </div>
        </div>
        <div class="m-modal-group">
          <div class="m-modal-col-6 m-row">
            <div class="m-modal-col-3">Hạn sử dụng</div>
            <div class="m-modal-col-9 m-row-inner">
              <input type="text" class="m-input m-modal-col-6 m-mr-8" 
                v-model="material.Expiry"/>
              <input type="text" class="m-input m-modal-col-6" 
                v-model="material.TimeUnit"/>
            </div>
          </div>
          <div class="m-modal-col-6 m-row">
            <div class="m-modal-col-3" v-tooltip.bottom="'Số lượng tồn tối thiểu'">SL tồn tối thiểu</div>
            <div class="m-modal-col-3">
              <input
                type="text"
                value="0,00"
                style="text-align: right"
                class="m-input"
                v-model="material.Quantity"
              />
            </div>
          </div>
        </div>
        <div class="m-modal-group m-row m-textarea">
          <div class="m-modal-col-2">Mô tả</div>
          <div class="m-modal-col-10">
            <textarea rows="3" v-model="material.Note"></textarea>
          </div>
        </div>
        <!-- bảng Đơn vị chuyển đổi -->
        <div class="m-tab-bar">
          <div class="tab-conversions">Đơn vị chuyển đổi</div>
          <!-- <div class="m-pl-8">Nhà cung cấp</div> -->
        </div>
        <div class="m-modal-grid-view">
          <table class="m-modal-table">
            <tr>
              <th style="width: 5%">STT</th>
              <th style="width: 25%">Đơn vị chuyển đổi</th>
              <th style="width: 20%">Tỷ lệ chuyển đổi</th>
              <th style="width: 20%">Phép tính</th>
              <th>Mô tả</th>
            </tr>
          </table>
        </div>
        <div class="m-end-tab">
          <button class="m-btn m-btn-icon m-mr-5">
            <i class="mi mi-16 mi-new m-mr-8"></i>
            Thêm dòng
          </button>
          <button class="m-btn m-btn-icon">
            <i class="mi mi-16 mi-delete m-mr-8"></i>
            Xóa dòng
          </button>
        </div>
      </div>
      <div class="m-modal-footer">
        <div class="m-footer-left">
          <button class="m-btn m-btn-icon">
            <i class="mi mi-16 mi-help m-mr-8"></i>
            Giúp
          </button>
        </div>
        <div class="m-footer-right">
          <button class="m-btn m-btn-icon m-mr-8" @click="btnSaveOnClick()">
            <i class="mi-16 mi-save m-mr-8"></i>
            Cất
          </button>
          <button class="m-btn m-btn-icon m-mr-8">
            <i class="mi-16 mi-save-add m-mr-8"></i>
            Cất và thêm
          </button>
          <button class="m-btn m-btn-icon">
            <i class="mi-16 mi-cancel m-mr-8"></i>
            Hủy bỏ
          </button>
        </div>
      </div>
      <!-- </form> -->
    </div>
    <div class="modal-background"></div>
  </div>
</template>



<script>

import { required } from "vuelidate/lib/validators";

export default {
  props: [
    "isShow",
    "material"
  ],
  data() {
    return {
      /** Trạng thái form submit */
      submitted : false,

    }
  },
  /**
   * Validate dữ liệu
   * Author: CTKimYen (22/1/2022)
   */
  validations: {
    /** đối tượng nguyên vật liệu */
    material: {
      MaterialCode: { required }, // mã NVL
      MaterialName: { required }, // tên NVL
      UnitId: { required }, // mã đơn vị tính chính
    },
  },
  methods:{
    /**
     * Ẩn modal chi tiết
     * Author: CTKimYen (22/1/2022)
     */
    hideModal(){
      this.$emit("showModal", false);
      this.submitted = false;
    },
    /**
     * Khi click vào button Cất trên form chi tiết
     * Author: CTKimYen (22/1/2022)
     */
    btnSaveOnClick(){
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
    }
  },
   watch: {
    /**
     * theo dõi sự thay đổi của biến isShowModal
     * Nếu form hiển thị (iShowModal = true) thì focus vào input đầu tiên
     */
    isShow() {
      setTimeout(() => {
        this.$refs.txtMaterialName.focus();
      }, 10);
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/component/tooltip.css");
.m-modal-show{
  display: block !important;
}
</style>
