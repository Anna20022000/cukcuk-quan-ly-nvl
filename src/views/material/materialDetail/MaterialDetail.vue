<template src="./materialDetail.html"></template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import MaterialApi from "@/apis/materialApi.js";
import UnitApi from "@/apis/unitApi.js";
import WarehouseApi from "@/apis/warehouseApi.js";
import Enum from "@/commons/enums.js";
import Resource from "@/commons/resources.js";
import { Money } from "v-money";
import BasePopup from "../../../components/BasePopup.vue";
import _ from "lodash";

export default {
  props: ["isShow", "material", "materialId", "mode", "materialOld"],
  components: {
    BasePopup,
    Money,
  },
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
        decimal: ",",
        thousands: ".",
        precision: 2,
        masked: false,
      },
      /** Trạng thái của popup hiển thị */
      popupStatus: "",
      /** chế độ ẩn/hiện popup (true-hiện; false-ẩn) */
      isShowPopup: false,
      /** Câu cảnh báo lỗi trong popup*/
      message: "",
      /** Tiêu đề của form */
      title: "",
      /** Kiểm tra NVL có được theo dõi hay không */
      isFollow: false,
      /** biến kiểm tra lỗi server */
      isError: false,
      /** Câu cảnh báo lỗi khi bỏ trống trường bắt buộc nhập */
      errMsgEmpty: Resource.ErrorMsgInput.Empty,
      /** Câu cảnh báo lỗi khi input nhập có độ dài tối đa là 25 */
      errMsgMaxLength: Resource.ErrorMsgInput.MaxLength,
    };
  },
  computed: {
    /**
     * Cập nhật mô tả cho đơn vị chuyển đổi
     * Author: CTKimYen (24/1/2022)
     */
    description: function () {
      const material = this.material;
      const units = this.units;
      const unitName = units.find((u) => u.UnitId == material.UnitId)?.UnitName ?? "";
      return function (conversion) {
        let description = "";
        if (
          unitName &&
          conversion.UnitId &&
          conversion.ConversionRate &&
          conversion.Calculation
        ) {
          // Lấy ra tên của đvcđ được chọn
          const conversionUnitName =
            units.find((u) => u.UnitId == conversion.UnitId)?.UnitName ?? "";
          // Nếu phép tính là nhân
          if (conversion.Calculation == "*") {
            description = `1 ${conversionUnitName} = ${conversion.ConversionRate} * ${unitName}`;
          } else {
            // Phép tính là chia
            description = `1 ${conversionUnitName} = 1/${conversion.ConversionRate} ${unitName}`;
          }
        }
        return description;
      };
    },
    /**
     * Check trùng đơn vị tính
     * Author: CTKimYen (24/1/2022)
     */
    duplicateUnit: function () {
      const materialId = this.material.UnitId;
      const units = this.material.Conversions;
      return function (conversion) {
        let me = this;
        if (materialId && conversion.UnitId) {
          // Nếu material có đvt trùng với đvt của đvcđ
          if (materialId == conversion.UnitId) {
            conversion.UnitId = null;
            // Hien thi popup cnah bao
            me.popupStatus = Enum.PopupStatus.Warning;
            me.isShowPopup = true;
            me.message = Resource.ErrorMsgMaterial.DuplicateUnit;
          }
          // Nếu ds đvcđ có đvt trùng nhau
          else if (
            units.filter((u) => u.UnitId == conversion.UnitId).length > 1
          ) {
            conversion.UnitId = null;
            // Hien thi popup canh bao
            me.popupStatus = Enum.PopupStatus.Warning;
            me.isShowPopup = true;
            me.message = Resource.ErrorMsgMaterial.DuplicateEachOther;
          }
        }
        return;
      };
    },
  },
  /**
   * Validate dữ liệu
   * Author: CTKimYen (22/1/2022)
   */
  validations: {
    /** đối tượng nguyên vật liệu */
    material: {
      MaterialCode: { required, maxLength: maxLength(25) }, // mã NVL
      MaterialName: { required }, // tên NVL
      UnitId: { required }, // mã đơn vị tính chính
    },
  },
  methods: {
    /**
     * Khi click button Đóng form thì check sự thay đổi dữ liệu
     * Author: 25/1/2022
     */
    btnCloseOnClick() {
      const objOld = this.materialOld;
      // Nếu NVL ko bị thay đổi thì ẩn modal
      if (_.isEqual(objOld, this.material)) {
        this.hideModal();
      } else {
        // nếu NVL bị thay đổi thì hiển thị popup question
        this.isShowPopup = true;
        this.popupStatus = Enum.PopupStatus.Question;
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
        } else {
          // kiểm tra đơn vị chuyển đổi nhập trống
          let con = me.material.Conversions.filter((c) => c.UnitId == null);
          if (con.length > 0) {
            // Hien thi popup
            me.isShowPopup = true;
            me.popupStatus = Enum.PopupStatus.Warning;
            me.message = Resource.ErrorMsgMaterial.EmptyConversion;
            return;
          }
        } // map giá trị
        me.mappingValue(me.material);
        // Kiểm tra trạng thái form
        if (me.mode == Enum.FormMode.Add) {
          // Thêm
          await me.create(me.material);
          // Nếu có lỗi 400 hiển thị popup
          if (me.isError) {
            me.isError = false;
            return;
          }
        } else if (me.mode == Enum.FormMode.Update) {
          // Sửa
          await me.update(me.materialId, me.material);
          // Nếu có lỗi 400 hiển thị popup
          if (me.isError) {
            me.isError = false;
            return;
          }
        }
        me.submitted = false;
        me.resetConversions();
        // Kiểm tra thao tác lưu
        if (actionMode == Enum.ActionMode.Save) me.hideModal();
        // Cất
        else {
          // Cất và thêm
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
    mappingValue(entity) {
      try {
        this.isFollow == true ? (entity.IsFollow = 0) : (entity.IsFollow = 1);
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
                  me.popupStatus = Enum.PopupStatus.Warning;
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
                me.popupStatus = Enum.PopupStatus.Warning;
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
          me.conversionIndex >= 0 ? me.conversionIndex-- : me.conversionIndex;
        }
        // Nếu đvcđ chưa tồn tại thì xóa trong mảng tạm conversions
        else {
          me.conversions.splice(me.conversionIndex, 1);
          me.conversionIndex >= 0 ? me.conversionIndex-- : me.conversionIndex;
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
      this.title = Resource.TitleMaterial.Insert;
      this.$emit("resetForm");
      this.resetConversions();
      this.isFollow = false;
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
     * Đóng popup
     * Author: CTKimYen (25/1/2022)
     */
    hidePopup() {
      this.isShowPopup = false;
    },
    /**
     * Khi click button Giúp, điều hướng sang tab mới
     * Author: CTKimYen (25/1/2022)
     */
    btnHelpOnClick() {
      window.open("https://help.cukcuk.vn/vi/kb/1060300_them_NVL");
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

  watch: {
    /**
     * theo dõi sự thay đổi của biến isShowModal
     * Nếu form hiển thị (iShowModal = true) thì focus vào input đầu tiên;
     * chuyển trạng thái của NVL từ kiểu số sang bool
     * Author: CTKimYen (21/1/2022)
     */
    isShow() {
      // chuyển trạng thái của NVL từ kiểu số sang bool
      this.isFollow = this.material.IsFollow == 1 ? false : true;
      setTimeout(() => {
        this.$refs.txtMaterialName.focus();
      }, 10);
    },
    /**
     * theo dõi sự thay đổi của trạng thái form chi tiết để hiển thị tiêu đề phù hợp
     * Author: CTKimYen (25/1/2022)
     */
    mode() {
      this.mode == Enum.FormMode.Update
        ? (this.title = Resource.TitleMaterial.Update)
        : (this.title = Resource.TitleMaterial.Insert);
    },
  },
};
</script>
