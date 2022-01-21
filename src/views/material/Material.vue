<template>
  <div class="m-content">
    <!-- title page -->
    <div class="m-title">
      <span>Nguyên vật liệu</span>
      <div class="m-title-right">
        <button class="m-btn m-btn-icon">
          <i class="mi-14 mi-speaker m-mr-8"></i>
          Phản hồi
        </button>
      </div>
    </div>
    <!-- end title page -->
    <!-- Content main -->
    <div class="m-content-main">
      <!-- list -->
      <material-list 
      :materials="materials" 
      :mode="formMode"
      @showModal="showModal"
      ></material-list>
    </div>
    <!-- paginate -->
    <div class="m-paginate">
      <div class="m-paging-left">
        <div class="m-page-bar">
          <div
            class="mi-16 mi-page-first"
            @click="pageIndex = 1"
            :class="{ 'm-disable': pageIndex == 1 }"
          ></div>
          <div
            class="mi-16 mi-page-pre"
            @click="pageIndex--"
            :class="{ 'm-disable': pageIndex == 1 }"
          ></div>
          <div class="m-text-paging">|</div>
          <div class="m-text-paging">Trang</div>
          <div>
            <input
              type="input"
              value="1"
              :max="totalPage"
              v-model="pageIndex"
              class="m-input"
              style="height: 24px; width: 38px; margin: 0 8px"
            />
          </div>
          <div class="m-text-paging">trên {{ totalPage }}</div>
          <div class="m-text-paging">|</div>
          <div
            class="mi-16 mi-page-next"
            @click="pageIndex++"
            :class="{ 'm-disable': pageIndex == totalPage }"
          ></div>
          <div
            class="mi-16 mi-page-last"
            @click="pageIndex = totalPage"
            :class="{ 'm-disable': pageIndex == totalPage }"
          ></div>
          <div class="m-text-paging">|</div>
          <div class="mi-16 mi-page-refresh"></div>
          <div class="m-text-paging">|</div>
        </div>
        <div class="m-chosse-size">
          <div class="m-combobox">
            <input type="text" value="50" v-model="pageSize" />
            <button class="m-combobox-btn mi-14 mi-dropdown"></button>
          </div>
        </div>
      </div>
      <div class="m-paging-right">
        Hiển thị {{ (pageIndex-1)*pageSize+1 }} - {{ pageIndex*pageSize > totalRecord? totalRecord : pageIndex*pageSize }} trên {{ totalRecord }} kết quả
      </div>
    </div>
    <!-- end paginate -->
    <!-- end content main -->
    <!-- detail -->
    <material-detail
    :material="material"
    :materialId="materialId"
    :isShow="isShowModal"
    :mode="formMode"
    :conversion="conversion"
    @showModal="showModal"
    @resetForm="resetFormData"
    @getAllData="getAllData"
    ></material-detail>
  </div>
</template>
<script>
import MaterialApi from "@/apis/materialApi.js";
import MaterialList from "./MaterialList.vue";
import MaterialDetail from "./MaterialDetail.vue";
import Enum from "@/commons/enums.js";

export default {
  components: {
    MaterialList,
    MaterialDetail,
  },
  data() {
    return {
      /**
       * Danh sách NVL
       */
      materials: [],
      /** Khóa chính bảng NVL */
      materialId: null,
      /** Một đối tượng NVL */
      material: {
        MaterialCode: null,
        MaterialName: null,
        Note: null,
        Expiry: 0,
        TimeUnit: null,
        Quantity: 0,
        IsFollow: 1,
        UnitId: null,
        UnitName: null,
        WarehouseId: null,
        MaterialCategoryId: null,
        MaterialCategoryName: null,
        Conversions: [],
      },
      /** Một đối tượng Đơn vị chuyển đổi */
      conversion:{
        ConversionId : null,
        ConversionRate: 0,
        Calculation: null,
        Description: null,
        UnitId: null,
        MaterialId: null,
        State: 0,
      },
      /** Danh sách các đối tượng lọc */
      listObjectFilter: [],
      /** Đối tượng lọc dữ liệu */
      objectFilter: {
        Column: "",
        Operator: Enum.Operator.Contain,
        Value: "",
        ValueType: "string",
        AdditionalOperator: "AND",
        Sort: "",
      },
      /** Trang hiện tại */
      pageIndex: 1,
      /** Số bản ghi trên trang */
      pageSize: 50,
      /** Tổng số trang */
      totalPage: 1,
      /** Tổng số bản ghi */
      totalRecord: 0,
      /** Ẩn/hiện form chi tiết */
      isShowModal : false,
      /** Trạng thái form chi tiết - mặc định là thêm mới */
      formMode: Enum.FormMode.Add,
      

    };
  },
  methods: {
    /**
     * Thực hiện ẩn/hiện form chi tiết
     * (true-hiển thị; false-ẩn)
     * Author: CTKimYen (21/1/2022)
     */
    showModal(mode){
      this.isShowModal = mode;
    },
    /**
     * Thực hiện gọi api để lấy tất cả bản ghi bảng NVL
     * Author:CTKimYen (20/1/2022)
     */
    getAllData() {
      let me = this;
      //   this.listObjectFilter.push(me.objectFilter);
      MaterialApi.filter(me.pageIndex, me.pageSize, me.listObjectFilter)
        .then((response) => {
          me.materials = response.data.Data;
          me.totalPage = response.data.TotalPage;
          me.totalRecord = response.data.TotalRecord;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Thực hiện reset lại thông tin NVL
     * Author: CTKimYen (21/1/2022)
     */
    resetFormData(){
      this.material = {
        MaterialCode: "",
        MaterialName: "",
        Note: null,
        Expiry: 0,
        TimeUnit: "",
        Quantity: 0,
        IsFollow: 1,
        UnitId: "",
        UnitName: "",
        WarehouseId: "",
        MaterialCategoryId: "",
        MaterialCategoryName: null,
        Conversions: [],
      }
    },
    /**
     * Thực hiện sửa trạng thái form chi tiết theo trạng thái nhập
     * Author: CTKimYen (21/1/2022)
     */
    editFormMode(mode){
      this.formMode = mode;
    }

  },
  /**
   * Hook Created
   */
  created() {
    this.getAllData();
  },

  watch: {
    /**
     * Sự kiện khi thay đổi số trang
     * Author: CTKimYen (20/1/2022)
     */
    pageIndex: function () {
      this.getAllData();
    },
    pageSize: function () {
      this.pageIndex = 1;
      this.getAllData();
    },

  },
};
</script>
<style scoped>
.m-disable {
  pointer-events: none;
  opacity: 0.4;
}
</style>
