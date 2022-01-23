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
        :material="material"
        :materialId="materialId"
        :mode="formMode"
        @showModal="showModal"
        @resetForm="resetFormData"
        @editFormMode="editFormMode"
        @getAllData="getAllData"
        @getSingle="getSingle"
        @onClickRowActive="onClickRowActive"
        @setObjectFilter="setObjectFilter"
      ></material-list>
    </div>
    <!-- paginate -->
    <base-pagination
      :pageIndex="pageIndex"
      :pageSize="pageSize"
      :totalRecord="totalRecord"
      :totalPage="totalPage"
      :listPageSizes="listPageSizes"
      @onChangePageIndex="onChangePageIndex"
      @onChangePageSize="onChangePageSize"
    ></base-pagination>
    <!-- end paginate -->
    <!-- end content main -->
    <!-- detail -->
    <material-detail
      :material="material"
      :materialId="materialId"
      :isShow="isShowModal"
      :mode="formMode"
      @showModal="showModal"
      @resetForm="resetFormData"
      @editFormMode="editFormMode"
      @getAllData="getAllData"
    ></material-detail>
  </div>
</template>
<script>
import MaterialApi from "@/apis/materialApi.js";
import MaterialList from "./MaterialList.vue";
import MaterialDetail from "./MaterialDetail.vue";
import BasePagination from "../../components/BasePagination.vue";
import Enum from "@/commons/enums.js";

export default {
  components: {
    MaterialList,
    MaterialDetail,
    BasePagination,
  },
  data() {
    return {
      /** Danh sách NVL */
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
      /** Danh sách các đối tượng lọc */
      listObjectFilter: [],
      /** Đối tượng lọc dữ liệu */
      objectFilter: {
        Column: "",
        Operator: Enum.Operator.Contain,
        Value: "",
        ValueType: "string",
        AdditionalOperator: "AND",
      },
      /** Đối tượng sắp xếp */
      objectSort: {
        Column: null,
        Sort: null,
      },
      /** Danh sách các option số bản ghi trên trang */
      listPageSizes: [25, 50, 100],
      /** Trang hiện tại */
      pageIndex: 1,
      /** Số bản ghi trên trang */
      pageSize: 50,
      /** Tổng số trang */
      totalPage: 1,
      /** Tổng số bản ghi */
      totalRecord: 0,
      /** Ẩn/hiện form chi tiết */
      isShowModal: false,
      /** Trạng thái form chi tiết - mặc định là thêm mới */
      formMode: Enum.FormMode.Add,
    };
  },
  methods: {
    /**
     * Thực hiện thay đổi danh sách lọc dữ liệu
     * Author: CTKimYen (23/1/2022)
     */
    setObjectFilter(object) {
      try {
        let me = this;
        // Nếu obj có giá trị rỗng
        if (object.Value == "" || object.Value == null) {
          // Neu ds loc khac rong
          if (me.listObjectFilter.length > 0) {
            // kiem tra xem co trung obj khong
            for (let index = 0; index < me.listObjectFilter.length; index++) {
              const element = me.listObjectFilter[index];
              // neu trung thi xoa khoi ds loc
              if (element.Column == object.Column) {
                me.listObjectFilter.splice(index, 1);
              }
            }
          }
        }
        // Neu obj co gia tri
        else {
          // Neu ds loc rong
          if (me.listObjectFilter.length == 0) me.listObjectFilter.push(object);
          else {
            // Neu ds loc khac rong
            // kiem tra trung
            let i = 0;
            for (let index = 0; index < me.listObjectFilter.length; index++) {
              const element = me.listObjectFilter[index];
              // neu trung thi sua
              if (element.Column == object.Column) {
                element.Value = object.Value;
                element.Operator = object.Operator;
                i = i + 1;
              }
            }
            //Neu obj khong co trong ds loc
            if (i < 1) {
              me.listObjectFilter.push(object);
            }
          }
        }
        me.getAllData();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thực hiện ẩn/hiện form chi tiết
     * (true-hiển thị; false-ẩn)
     * Author: CTKimYen (21/1/2022)
     */
    showModal(mode) {
      this.isShowModal = mode;
    },
    /**
     * Thực hiện gọi api để lấy tất cả bản ghi bảng NVL
     * Author:CTKimYen (20/1/2022)
     */
    getAllData() {
      let me = this;
      //   this.listObjectFilter.push(me.objectFilter);
      MaterialApi.filter(
        me.pageIndex,
        me.pageSize,
        me.listObjectFilter,
        me.objectSort
      )
        .then((response) => {
          me.materials = response.data.Data;
          me.totalPage = response.data.TotalPage;
          me.totalRecord = response.data.TotalRecord;
          this.materialId = this.materials[0].MaterialId;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Thực hiện lấy ra thông tin của một NVL
     * Author: CTKimYen (22/1/2022)
     */
    getSingle(entity) {
      try {
        this.material = entity;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thực hiện reset lại thông tin NVL
     * Author: CTKimYen (21/1/2022)
     */
    resetFormData() {
      this.material = {
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
      };
    },
    /**
     * Thực hiện sửa trạng thái form chi tiết theo trạng thái nhập
     * Author: CTKimYen (21/1/2022)
     */
    editFormMode(mode) {
      this.formMode = mode;
    },
    /**
     * Chuyển tới trang khi nhập input
     *  Author: CTKimYen (22/1/2022)
     */
    onChangePageIndex(pageIndex) {
      this.pageIndex = pageIndex;
      this.getAllData();
    },
    /**
     * Chuyển tới trang khi nhập input
     * Author: CTKimYen (22/1/2022)
     */
    onChangePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageIndex = 1;
      this.getAllData();
    },
    /**
     * Chọn 1 đối tượng và thay đổi giá trị NVL hiện tại
     * Author: CTKimYen (22/1/2022)
     */
    onClickRowActive(entity) {
      this.material = entity;
      this.materialId = entity.MaterialId;
    },
  },
  /**
   * Hook Created
   */
  created() {
    this.getAllData();
  },
};
</script>
