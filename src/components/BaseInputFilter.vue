<template>
  <div class="m-filter">
    <div class="m-cbb-filter">
      <v-select
        class="m-modal-col-6"
        :options="operators"
        :reduce="(Name) => Name.Value"
        label="Name"
        v-model="operator"
      ></v-select>
    </div>
    <input
      type="text"
      class="m-input"
      v-model="inputValue"
      @blur="inputValueChange"
    />
  </div>
</template>
<script>
import Enum from "../commons/enums.js";
export default {
  props: ["column"],
  data() {
    return {
      /** Toán tử mặc định là Chứa */
      operator: Enum.Operator.Contain,
      /** Danh sách các tonas tử */
      operators: [
        { Name: "*.", Show: "* : Chứa", Value: Enum.Operator.Contain },
        { Name: "=.", Show: "= : Bằng", Value: Enum.Operator.EqualTo },
        {
          Name: "+.",
          Show: "+ : Bắt đầu bằng",
          Value: Enum.Operator.BeginWith,
        },
        { Name: "-.", Show: "- : Kết thúc bằng", Value: Enum.Operator.EndWith },
        { Name: "!.", Show: "! : Không chứa", Value: Enum.Operator.NotContain },
      ],
      /** Giá trị của ô input */
      inputValue: null,
      /** Đối tượng */
      obj: {},
    };
  },
  methods: {
    /**
     * theo dõi sự thay đổi của biến inputValue
     * Nếu inputValue có giá trị nhập thì tạo mới 1 đối tượng lọc
     * Author: CTKimYen (23/1/2022)
     */
    inputValueChange() {
      let me = this;
      me.obj = {
        Column: me.column,
        Value: me.inputValue,
        Operator: me.operator,
        ValueType: "string",
        AdditionalOperator: "AND",
      };
      me.$emit("setObjectFilter", me.obj);
    },
  },

  watch: {
  /**
   * Khi thay đổi Toán tử
   * Author: CTKimYen (23/1/2022)
   */
    operator() {
      this.inputValueChange();
    },
  },
};
</script>
