<template>
  <div
    class="m-modal-medium"
    style="display: none"
    :class="{ 'm-modal-show': isShow }"
  >
    <div class="m-modal">
      <div class="m-modal-header">
        <div class="m-modal-title">Thêm nguyên vật liệu</div>
        <div class="m-close-modal mi-16 mi-close" @click="btnCloseOnClick()" v-shortkey="['esc']" @shortkey="btnCloseOnClick()"></div>
      </div>
      <!-- <form> -->
      <div class="m-modal-content">
        <!-- input nhập liệu NVL -->
        <div class="m-modal-group">
          <!-- Tên -->
          <div class="m-modal-col-6 m-row m-pr-20">
            <div class="m-modal-col-3">Tên <span>(*)</span></div>
            <div class="m-modal-col-9 m-flex-between">
              <input type="text"
                class="m-input"
                ref="txtMaterialName"
                v-model="material.MaterialName"
                @change="getNewMaterialCode"
                :class="{ 'm-is-invalid': submitted && $v.material.MaterialName.$error, }"
              />
              <div class="mi-16 mi-error"
                v-show="submitted && $v.material.MaterialName.$error"
                v-tooltip.bottom="{
                  content: submitted && $v.material.MaterialName.$error
                      ? 'Trường này không được để trống.'
                      : null, }"
              ></div>
            </div>
          </div>
          <!-- Mã -->
          <div class="m-modal-col-6 m-row">
            <div class="m-modal-col-3">Mã <span>(*)</span></div>
            <div class="m-modal-col-9 m-flex-between">
              <input
                type="text"
                class="m-input"
                v-model="material.MaterialCode"
                :class="{
                  'm-is-invalid': submitted && $v.material.MaterialCode.$error,
                }"
              />
              <div class="mi-16 mi-error"
                v-show="submitted && $v.material.MaterialCode.$error"
                v-tooltip.bottom="{
                  content: submitted && $v.material.MaterialCode.$error
                      ? 'Trường này không được để trống.'
                      : null, }"
              ></div>
            </div>
          </div>
        </div>
        <div class="m-modal-group">
          <!-- ĐVT -->
          <div class="m-modal-col-6 m-row">
            <div class="m-modal-col-3" v-tooltip.bottom="'Đơn vị tính'">
              ĐVT <span>(*)</span>
            </div>
            <div class="m-modal-col-9 m-row-inner m-flex-between">
              <!-- COMBOBOX -->
              <v-select
                class="m-modal-col-6"
                :options="units"
                :reduce="(UnitName) => UnitName.UnitId"
                label="UnitName"
                v-model="material.UnitId"
                :class="{
                  'm-is-invalid': submitted && $v.material.UnitId.$error,
                }"
              ></v-select>
              <!-- END COMBOBOX -->
              <div class="mi-16 mi-error"
                v-show="submitted && $v.material.UnitId.$error"
                v-tooltip.bottom="{ content: submitted && $v.material.UnitId.$error  ? 'Trường này không được để trống.' : null,  }"
              ></div>
            </div>
          </div>
          <!-- Kho -->
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
          <!-- HSD -->
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
          <!-- Đơn vị thời gian -->
          <div class="m-modal-col-6 m-row">
            <div
              class="m-modal-col-3"
              v-tooltip.bottom="'Số lượng tồn tối thiểu'" >
              SL tồn tối thiểu
            </div>
            <div class="m-modal-col-3">
              <!-- <input type="text" class="m-input m-text-right" v-model="material.Quantity" /> -->
              <money v-model="material.Quantity" v-bind="formatQuantity" class="m-input m-text-right"></money>
            </div>
          </div>
        </div>
        <!-- Mô tả -->
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
                    @input="messagePopup = duplicateUnit(conversion)"
                  ></v-select>
                </td>
                <td>
                  <money v-model="conversion.ConversionRate" v-bind="formatQuantity" class="m-input m-text-right"></money>
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
                  <input readonly type="text" class="m-input" :value="description(conversion)" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Thêm và xóa dòng -->
        <div class="m-end-tab">
          <button class="m-btn m-btn-icon m-mr-5" @click="btnAddLineOnClick()" v-shortkey="['ctrl','insert']" @shortkey="btnAddLineOnClick()" title="Ctrl+Insert">
            <i class="mi mi-16 mi-new m-mr-8"></i>
            Thêm dòng
          </button>
          <button class="m-btn m-btn-icon" @click="btnRemoveLineOnClick()" v-shortkey="['ctrl','del']" @shortkey="btnRemoveLineOnClick()" title="Ctrl+Delete" 
          :class="{'m-disable': material.Conversions == null || material.Conversions.length <1 || conversionIndex <0 }">
            <i class="mi mi-16 mi-delete m-mr-8"></i>
            Xóa dòng
          </button>
        </div>
      </div>
      <!-- Các button -->
      <div class="m-modal-footer">
        <div class="m-footer-left">
          <button class="m-btn m-btn-icon">
            <i class="mi mi-16 mi-help m-mr-8"></i>
            Giúp
          </button>
        </div>
        <div class="m-footer-right">
          <button class="m-btn m-btn-icon m-mr-8" @click="btnSaveOnClick(0)" v-shortkey="['ctrl', 's']" @shortkey="btnSaveOnClick(0)" title="Ctrl+S">
            <i class="mi-16 mi-save m-mr-8"></i>
            Cất
          </button>
          <button class="m-btn m-btn-icon m-mr-8" @click="btnSaveOnClick(1)" v-shortkey="['ctrl','shift', 's']" @shortkey="btnSaveOnClick(1)" title="Ctrl+Shift+S">
            <i class="mi-16 mi-save-add m-mr-8"></i>
            Cất và thêm
          </button>
          <button class="m-btn m-btn-icon" @click="hideModal()" v-shortkey="['ctrl','b']" @shortkey="hideModal()" title="Ctrl+B">
            <i class="mi-16 mi-cancel m-mr-8"></i>
            Hủy bỏ
          </button>
        </div>
      </div>
      <!-- </form> -->
    </div>
    <div class="modal-background"></div>
    <!-- POPUP -->
    <base-popup
      :status="popupStatus"
      :message="message"
      :show="isShowPopup"
      @btnYesWarning="hidePopup"
      @btnCancelQuesion="hidePopup"
    ></base-popup>
    <!-- END POPUP -->
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import MaterialApi from "@/apis/materialApi.js";
import UnitApi from "@/apis/unitApi.js";
import WarehouseApi from "@/apis/warehouseApi.js";
import Enum from "@/commons/enums.js";
import {Money} from 'v-money';
import BasePopup from "../../components/BasePopup.vue";
import _ from 'lodash';

export default {
  props: ["isShow", "material", "materialId", "mode", "materialOld"],
  components:{
    BasePopup,
    Money
  },
  data() {
    return {
      /** biến kiểm tra lỗi server */
      isError: false,
      // title: null,
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
      /** Vị trí của đvcđ vừa chọn */
      conversionIndex: -1,
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
      /** Danh sách các phép tính */
      calculations: [
        { Name: "* - Nhân", Value: "*" },
        { Name: "/ - Chia", Value: "/" },
      ],
      /** Đơn vị thời gian */
      timeUnits: ["Ngày", "Tháng", "Năm"],
      /** định dạng số có phần đuôi ,00 */
      formatQuantity: {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false
      },
      /** Trạng thái của popup hiển thị */
      popupStatus: "",
      /** chế độ ẩn/hiện popup (true-hiện; false-ẩn) */
      isShowPopup: false,
      /** Câu cảnh báo lỗi trong popup*/
      message: "",
    };
  },
  computed:{
    /**
     * Cập nhật mô tả cho đơn vị chuyển đổi
     * Author: CTKimYen (24/1/2022)
     */
    description: function() {
      const material = this.material;
      const units = this.units;
      const unitName = units.find(u => u.UnitId == material.UnitId)?.UnitName ?? '';
      return function(conversion) {
        let description = '';
        if (unitName && conversion.UnitId && conversion.ConversionRate && conversion.Calculation) {
          // Lấy ra tên của đvcđ được chọn
          const conversionUnitName = units.find(u => u.UnitId == conversion.UnitId)?.UnitName ?? '';
          // Nếu phép tính là nhân
          if (conversion.Calculation == '*') {
            description = `1 ${conversionUnitName} = ${conversion.ConversionRate} * ${unitName}`;
          } else { // Phép tính là chia
            description  = `1 ${conversionUnitName} = 1/${conversion.ConversionRate} ${unitName}`;
          }
        }
        return description;
      }
    },
    /**
     * Check trùng đơn vị tính
     * Author: CTKimYen (24/1/2022)
     */
    duplicateUnit: function() {
      const materialId = this.material.UnitId;
      const units = this.material.Conversions;
      return function(conversion) {
        let me = this;
        if (materialId && conversion.UnitId) {
          // Nếu material có đvt trùng với đvt của đvcđ
          if (materialId == conversion.UnitId) {
            conversion.UnitId = null;
            // Hien thi popup cnah bao
            me.popupStatus = 'warning';
            me.isShowPopup = true;
            me.message = "Đơn vị chuyển đổi không được trùng với đơn vị tính chính.";
          }
          // Nếu ds đvcđ có đvt trùng nhau
          else if(units.filter(u=> u.UnitId == conversion.UnitId).length > 1) {
            conversion.UnitId = null;
            // Hien thi popup canh bao
            me.popupStatus = 'warning';
            me.isShowPopup = true;
            me.message = "Đơn vị chuyển đổi không được trùng nhau.";
          }
        }
        return;
      }
    },
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
    btnCloseOnClick(){
      // Nếu NVL ko bị thay đổi thì ẩn modal
      if(_.isEqual(this.materialOld, this.material)){
        alert('ko thay đổi')
        this.hideModal();
      }
      else{
        // nếu NVL bị thay đổi thì hiển thị popup question
        this.isShowPopup = true;
        this.popupStatus = "question";
        this.message = "Dữ liệu đã thay đổi, bạn có muốn cất không?";
      }
    },
    /**
     * Khi click vào một đvcđ lấy ra index và đvcđ đó
     * Author: CTKimYen (22/1/2022)
     */
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
     * Khi click vào button Cất trên form chi tiết
     * Author: CTKimYen (22/1/2022)
     */
    async btnSaveOnClick(actionMode) {
      try {
        this.submitted = true;
        this.$v.$touch();
        let me = this;
        // Nếu form error
        if (me.$v.$invalid) {
          // stop here if form is invalid
          return;
        }
        else{ // kiểm tra đơn vị chuyển đổi nhập trống
          let con = me.material.Conversions.filter(c=>c.UnitId == null);
          if(con.length > 0){
              // Hien thi popup
              me.isShowPopup = true;
              me.popupStatus = 'warning';
              me.message = "Đơn vị chuyển đổi không được để trống.";
              return;
          }
        }// map giá trị
        me.mappingValue(me.material);
        // Kiểm tra trạng thái form
        if (me.mode == Enum.FormMode.Add) { // Thêm
          await me.create(me.material);
          // Nếu có lỗi 400 hiển thị popup
          if(me.isError) 
            {
              me.isError = false; 
              return;
            }
        } else if (me.mode == Enum.FormMode.Update) { // Sửa
          await me.update(me.materialId, me.material);
          // Nếu có lỗi 400 hiển thị popup
          if(me.isError) 
            {
              me.isError = false; 
              return;
            }
        }
        me.submitted = false;
        me.resetConversions();
        // Kiểm tra thao tác lưu
        if (actionMode == Enum.ActionMode.Save) me.hideModal(); // Cất
        else { // Cất và thêm
          me.resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Gán lại một số giá trị cho phù hợp với kiểu dữ liệu gửi về
     * Author: CTKimYen (21/1/2022)
     */
    mappingValue(entity){
      try {
        if (entity.WarehouseId == "") entity.WarehouseId = null;
        if (entity.MaterialCategoryId == "") entity.MaterialCategoryId = null;
        entity.Conversions.forEach((element) => {
          element.ConversionRate = Number.parseInt(element.ConversionRate);
        });
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
        let me = this;
        // Thực hiện thêm
        await MaterialApi.create(entity)
          .then(function () {
            me.$emit("getAllData");
          })
          .catch(function (res) {
            console.log(res);
            switch (res.response.status) {
              case 400: {
                let data = res.response.data;
                if (data) {
                  // Đánh dấu form nhập liệu có lỗi
                  me.isError = true;
                  // Hien thi popup canh bao
                  me.popupStatus = 'warning';
                  me.isShowPopup = true;
                  me.message = data.data[0];
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
        })
        .catch(function (res) {
          switch (res.response.status) {
            case 400: {
              let data = res.response.data;
              if (data) {
                me.isError = true;
                // Hiển thị popup cảnh báo
                  me.popupStatus = 'warning';
                  me.isShowPopup = true;
                  me.message = data.data[0];
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
      me.unit = null;
      me.conversion = null;
      me.conversionIndex = -1;
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
        // xóa hàng được chọn khỏi ds đvcđ của nvl
        me.material.Conversions.splice(me.conversionIndex, 1);
        // lấy ra đối tượng được chọn
        let entityDel = me.conversion;
        // Nếu đvcđ đã tồn tại thì trạng thái = 2 - xóa
        if (entityDel.ConversionId != null) {
          entityDel.State = Enum.State.Delete;
          me.conversions.push(entityDel);
          me.conversionIndex>=0?me.conversionIndex--:me.conversionIndex;
        }
        // Nếu đvcđ chưa tồn tại thì xóa trong mảng tạm conversions
        else {
          me.conversions.splice(me.conversionIndex, 1);
          me.conversionIndex>=0?me.conversionIndex--:me.conversionIndex;
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
      this.resetConversions();
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
     * When click button Cancel modal
     * Author: KimYen (15/12/2021)
     */
    btnCancelOnclick() {
      if (this.isFormError) {
        this.submitted = false;
        this.isFormError = false;
      } else {
        this.$emit("resetFormData");
        this.$emit("showModal", false);
        this.submitted = false;
        this.formChanged = 0;
      }
    },
    hidePopup(){
      this.isShowPopup= false;
    }

  },
  /**
   * Hook
   */
  created() {
    this.getAllUnit();
    this.getAllWarehouse();
    this.conversions = this.material.Conversions;
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
    mode(){
      if(this.mode == 0) console.log = "Thêm nguyên vật liệu";
      if(this.mode == 1) console.log = "Sua nguyên vật liệu";
    }
  }
  
};
</script>

<style scoped>
@import url("../../assets/css/component/tooltip.css");
</style>
