<template>
  <div
    class="m-modal-medium"
    style="display: none"
    :class="{ 'm-modal-show': isShow }"
  >
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
              <input
                type="text"
                class="m-input"
                ref="txtMaterialName"
                v-tooltip.bottom="{
                  content:
                    submitted && $v.material.MaterialName.$error
                      ? 'Trường này không được để trống.'
                      : null,
                }"
                v-model="material.MaterialName"
                @change="getNewMaterialCode"
                :class="{
                  'm-is-invalid': submitted && $v.material.MaterialName.$error,
                }"
              />
            </div>
          </div>
          <div class="m-modal-col-6 m-row">
            <div class="m-modal-col-3">Mã <span>(*)</span></div>
            <div class="m-modal-col-9">
              <input
                type="text"
                class="m-input"
                v-tooltip.bottom="{
                  content:
                    submitted && $v.material.MaterialCode.$error
                      ? 'Trường này không được để trống.'
                      : null,
                }"
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
            <div class="m-modal-col-3" v-tooltip.bottom="'Đơn vị tính'">
              ĐVT <span>(*)</span>
            </div>
            <div class="m-modal-col-9 m-row-inner">
              <!-- COMBOBOX -->
              <v-select
                class="m-modal-col-6"
                :options="units"
                :reduce="(UnitName) => UnitName.UnitId"
                label="UnitName"
                v-tooltip.bottom="{
                  content:
                    submitted && $v.material.UnitId.$error
                      ? 'Trường này không được để trống.'
                      : null,
                }"
                v-model="material.UnitId"
                :class="{
                  'm-is-invalid': submitted && $v.material.UnitId.$error,
                }"
              ></v-select>
              <!-- END COMBOBOX -->
            </div>
          </div>
          <div class="m-modal-col-6 m-row">
            <div class="m-modal-col-3">Kho ngầm định</div>
            <div class="m-modal-col-9">
              <!-- COMBOBOX -->
              <v-select
                :options="warehouses"
                :reduce="(WarehouseName) => WarehouseName.WarehouseId"
                label="WarehouseName"
                v-model="material.WarehouseId"
              ></v-select>
              <!-- END COMBOBOX -->
            </div>
          </div>
        </div>
        <div class="m-modal-group">
          <div class="m-modal-col-6 m-row">
            <div class="m-modal-col-3">Hạn sử dụng</div>
            <div class="m-modal-col-9 m-row-inner">
              <input
                type="text"
                class="m-input m-modal-col-6 m-mr-8 m-text-right"
                v-mask="'##############'"
                v-model="material.Expiry"
              />
              <v-select
                class="m-modal-col-6"
                :options="timeUnits"
                label=""
                v-model="material.TimeUnit"
              ></v-select>
            </div>
          </div>
          <div class="m-modal-col-6 m-row">
            <div
              class="m-modal-col-3"
              v-tooltip.bottom="'Số lượng tồn tối thiểu'"
            >
              SL tồn tối thiểu
            </div>
            <div class="m-modal-col-3">
              <input
                type="text"
                class="m-input m-text-right"
                v-mask="'###.###.###,00'"
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
        </div>
        <div class="m-modal-grid-view">
          <table class="m-modal-table">
            <thead>
              <tr>
                <th>STT</th>
                <th style="width: 25%">Đơn vị chuyển đổi</th>
                <th style="width: 20%">Tỷ lệ chuyển đổi</th>
                <th style="width: 20%">Phép tính</th>
                <th>Mô tả</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(conversion, index) in material.Conversions"
                :key="index"
                @click="onClickRowActive(conversion, index)" >
                <td>{{ index + 1 }}</td>
                <td>
                  <v-select
                    :options="units"
                    :reduce="(UnitName) => UnitName.UnitId"
                    label="UnitName"
                    v-model="conversion.UnitId"
                  ></v-select>
                </td>
                <td>
                  <input type="text" class="m-input m-text-right" v-model="conversion.ConversionRate" />
                </td>
                <td>
                  <v-select
                    :options="calculations"
                    :reduce="(Name) => Name.Value"
                    label="Name"
                    v-model="conversion.Calculation"
                  ></v-select>
                </td>
                <td>
                  <input type="text" class="m-input" v-model="conversion.Description" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="m-end-tab">
          <button class="m-btn m-btn-icon m-mr-5" @click="btnAddLineOnClick">
            <i class="mi mi-16 mi-new m-mr-8"></i>
            Thêm dòng
          </button>
          <button class="m-btn m-btn-icon" @click="btnRemoveLineOnClick">
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
          <button class="m-btn m-btn-icon m-mr-8" @click="btnSaveOnClick(0)">
            <i class="mi-16 mi-save m-mr-8"></i>
            Cất
          </button>
          <button class="m-btn m-btn-icon m-mr-8" @click="btnSaveOnClick(1)">
            <i class="mi-16 mi-save-add m-mr-8"></i>
            Cất và thêm
          </button>
          <button class="m-btn m-btn-icon" @click="hideModal">
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
import MaterialApi from "@/apis/materialApi.js";
import UnitApi from "@/apis/unitApi.js";
import WarehouseApi from "@/apis/warehouseApi.js";
import Enum from "@/commons/enums.js";


export default {
  props: ["isShow", "material", "materialId", "mode"],
  data() {
    return {
      /** Một đối tượng Đơn vị chuyển đổi */
      conversion: {
        ConversionId: null,
        ConversionRate: 1,
        Calculation: null,
        Description: null,
        UnitId: null,
        UnitName: null,
        State: 0,
      },
      conversionIndex: null,
      /** Mảng chứa danh sách ĐVCĐ của đối tượng */
      conversions: [],
      /** Trạng thái form submit */
      submitted: false,
      /** Danh sách các đon vị chuyển đổi */
      units: [],
      /** Thông tin Đơn vị chính*/
      unit: {
        UnitId: null,
        UnitName: null,
        Description: null,
      },
      /** Danh sách các Kho */
      warehouses: [],
      /** Thông tin kho */
      warehouse: {
        WarehouseId: null,
        WarehouseName: null,
      },
      /** Danh sách các phép tính */
      calculations: [
        { Name: "* - Nhân", Value: "*" },
        { Name: "/ - Chia", Value: "/" },
      ],
      /** Đơn vị thời gian */
      timeUnits: ["Ngày", "Tháng", "Năm"],
    };
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
  methods: {
    onClickRowActive(conversion, index) {
      this.conversionIndex = index;
      this.conversion = conversion;
    },
    /**
     * Ẩn modal chi tiết
     * Author: CTKimYen (22/1/2022)
     */
    hideModal() {
      this.$emit("showModal", false);
      this.submitted = false;
      this.resetForm();
    },
    /**
     * Thực hiện kiểm tra ĐVT chính có trùng với ĐVCĐ hoặc các ĐVCĐ có trùng nhau không
     * Author: CTKimYen (22/1/2022)
     */
    checkMatchUnit() {
      let me = this;
      // Lấy ra id của DVT chính
      let materialUnit = me.material.UnitId;
      let listConversionValid = [];
      // Kiểm tra trùng Đơn vị tính
      me.material.Conversions.forEach((element) => {
        // Nếu ĐVT chính = ĐVCĐ
        if (materialUnit == element.UnitId) {
          console.log("Đơn vị chuyển đổi không trùng với đơn vị tính chính.");
          return;
        }
        // Nếu ĐVCĐ trùng nhau
        if (listConversionValid.includes(element.UnitId)) {
          element.UnitId = "";
          console.log("Đơn vị chuyển đổi không được trùng nhau");
          return;
        }
        // Nếu hợp lệ thì thêm vào list id hợp lệ
        listConversionValid.push(element.UnitId);
      });
      return true;
    },
    /**
     * Khi click vào button Cất trên form chi tiết
     * Author: CTKimYen (22/1/2022)
     */
    async btnSaveOnClick(actionMode) {
      try {
        this.submitted = true;
        this.$v.$touch();
        let me = this;
        let ok = await me.checkMatchUnit();
        // Nếu form error
        if (me.$v.$invalid || !ok) {
          // stop here if form is invalid
          return;
        }
        // Kiểm tra trạng thái
        if (me.mode == Enum.FormMode.Add) {
          await me.create(me.material);
        } else if (me.mode == Enum.FormMode.Update) {
          await me.update(me.materialId, me.material);
        }

        me.submitted = false;

        if (actionMode == Enum.ActionMode.Save) me.hideModal();
        else {
          me.resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thực hiện lưu thông tin NVL
     * Author: CTKimYen (21/1/2022)
     */
    async create(entity) {
      try {
        if (entity.WarehouseId == "") entity.WarehouseId = null;
        if (entity.MaterialCategoryId == "") entity.MaterialCategoryId = null;
        entity.Conversions.forEach((element) => {
          element.ConversionRate = Number.parseInt(element.ConversionRate);
        });

        let me = this;
        await MaterialApi.create(entity)
          .then(function () {
            me.$emit("getAllData");
          })
          .catch(function (res) {
            switch (res.response.status) {
              case 400: {
                let data = res.response.data;
                if (data) {
                  console.log(data.data[0]);
                }
                break;
              }
              default:
                console.log(res);
                break;
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thực hiện sửa thông tin nguyên vật liệu
     * Author: CTKimYen (21/1/2022)
     */
    async update(id, entity) {
      let me = this;
      // lấy ra mảng dvcd của nvl
      let cons = me.material.Conversions;
      // Những dvcd có id và state = 0 thì set state =1
      cons.forEach((con) => {
        if (con.ConversionId != null && con.State == Enum.State.Insert) {
          con.State = Enum.State.Update;
          me.conversions.push(con);
        }
      });
      // gán cho entity danh sách dvcd cập nhật
      entity.Conversions = me.conversions;
      await MaterialApi.update(id, entity)
        .then(function () {
          me.$emit("getAllData");
          me.resetConversions();
        })
        .catch(function (res) {
          switch (res.response.status) {
            case 400: {
              let data = res.response.data;
              if (data) {
                console.log(data.data[0]);
              }
              break;
            }
            default:
              break;
          }
        });
    },
    /**
     * Thực hiện reset lại các thông tin về đvcđ của đối tượng vừa cập nhật
     * Author: CTKimYen (22/1/2022)
     */
    resetConversions() {
      let me = this;
      me.conversion = null;
      me.conversionIndex = null;
      me.conversions = [];
    },
    /**
     * Khi click button Thêm dòng
     * Author: CTKimYen (21/1/2022)
     */
    btnAddLineOnClick() {
      try {
        let me = this;
        let con = {
          ConversionId: null,
          ConversionRate: 1,
          Calculation: null,
          Description: null,
          UnitId: null,
          State: Enum.State.Insert,
        };
        // Thêm một đối tượng conversion mới vào list conversions của material
        me.material.Conversions.push(con);
        me.conversions.push(con);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Khi click button Xóa dòng
     * Author: CTKimYen (21/1/2022)
     */
    btnRemoveLineOnClick() {
      try {
        let me = this;
        // Ẩn hàng được chọn
        me.material.Conversions.splice(me.conversionIndex, 1);
        // lấy ra đối tượng được chọn
        let entityDel = me.conversion;
        // Nếu đvcđ đã tồn tại thì trạng thái = 2 - xóa
        if (entityDel.ConversionId != null) {
          entityDel.State = Enum.State.Delete;
          me.conversions.push(entityDel);
        }
        // Nếu đvcđ chưa tồn tại thì xóa trong mảng tạm conversions
        else {
          me.conversions.splice(me.conversionIndex, 1);
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * reset form chi tiết
     * Author: CTKimYen (21/1/2022)
     */
    resetForm() {
      this.$emit("resetForm");
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
     * Thực hiện lấy tất cả bản ghi Đơn vị tính
     * Author: CTKimYen (22/1/2022)
     */
    getAllUnit() {
      UnitApi.getAll()
        .then((response) => {
          this.units = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Thực hiện lấy tất cả bản ghi Kho
     * Author: CTKimYen (22/1/2022)
     */
    getAllWarehouse() {
      WarehouseApi.getAll()
        .then((response) => {
          this.warehouses = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Thực hiện cập nhật thông tin Mô tả của đơn vị chuyển đổi
     * Author: CTKimYen (22/1/2022)
     */
    updateConversion(entity) {
      let ok = this.checkMatchUnit();
      if (ok)
        entity.Description = `1 ${this.material.UnitName} = ${entity.ConversionRate} ${entity.Calculation} ${entity.UnitName}`;
      else entity.UnitId = null;
    },

    getUnitName(name) {
      alert(name);
    },
  },
  /**
   * Hook
   */
  created() {
    this.getAllUnit();
    this.getAllWarehouse();
    this.conversions = this.material.Conversions;
  },
  computed: {
    // corrections start
    Description: function () {
      return this.material.Conversions.map(function (item) {
        return `1 ${item.UnitId} = ${item.ConversionRate} ${item.Calculation}`;
        // `1 ${this.material.UnitName} = ${entity.ConversionRate} ${entity.Calculation} ${entity.UnitName}`;
      });
    },
    // corrections end
  },

  watch: {
    /**
     * theo dõi sự thay đổi của biến isShowModal
     * Nếu form hiển thị (iShowModal = true) thì focus vào input đầu tiên
     * Author: CTKimYen (21/1/2022)
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
</style>
