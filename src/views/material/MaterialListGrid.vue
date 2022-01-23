<template>
  <div class="m-content-table">
    <!-- table -->
    <table class="m-table">
      <thead class="m-text-left">
        <tr>
          <th>
            <div class="m-th-name">Mã nguyên vật liệu</div>
            <div >
              <base-input-filter
              :column="'MaterialCode'"
              @setObjectFilter="setObjectFilter"
              />
            </div>
          </th>
          <th>
            <div class="m-th-name">Tên nguyên vật liệu</div>
            <div>
              <base-input-filter
              :column="'MaterialName'"
              @setObjectFilter="setObjectFilter"
              />
            </div>
          </th>
          <th>
            <div class="m-th-name">Tính chất</div>
            <div>
              <base-input-filter
              :column="'MaterialCategoryName'"
              :listObjectFilter="listObjectFilter"
              @setObjectFilter="setObjectFilter"
              />
            </div>
          </th>
          <th>
            <div class="m-th-name">ĐVT chính</div>
            <div>
              <base-input-filter
              :column="'UnitName'"
              @setObjectFilter="setObjectFilter"
              />
            </div>
          </th>
          <th>
            <div class="m-th-name">Nhóm nguyên vật liệu</div>
            <div>
              <base-input-filter
              :column="'MaterialCategoryName'"
              @setObjectFilter="setObjectFilter"
              />
            </div>
          </th>
          <th>
            <div class="m-th-name">Ghi chú</div>
            <div>
              <base-input-filter
              :column="'Note'"
              @setObjectFilter="setObjectFilter"
              />
            </div>
          </th>
          <th>
            <div class="m-th-name">Ngừng theo dõi</div>
            <div>
              <base-input-filter
              :column="'IsFollow'"
              @setObjectFilter="setObjectFilter"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="material in materials" :key="material.MaterialId" 
          :class="{ 'm-row-active': material.MaterialId == materialId }"
          @click="onClickRowActive(material)">
          <td>{{ material.MaterialCode }}</td>
          <td>{{ material.MaterialName }}</td>
          <td>{{ material.MaterialCategoryName }}</td>
          <td>{{ material.UnitName }}</td>
          <td>{{ material.MaterialCategoryName }}</td>
          <td>{{ material.Note }}</td>
          <td class="m-text-center">
            <input type="checkbox" class="m-checkbox" disabled />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Enum from '../../commons/enums.js'
import BaseInputFilter from '../../components/BaseInputFilter.vue'

export default {
  props: ["materials", "materialId"],
  components:{
    BaseInputFilter
  },
  data() {
    return {
      /** Danh sách nhóm NVL */
      materialCategories:[],
      operators:[
        { Name: "*.", Show:"* : Chứa", Value: Enum.Operator.Contain },
        { Name: "=.",Show: "= : Bằng", Value: Enum.Operator.EqualTo },
        { Name: "+.",Show:"+ : Bắt đầu bằng", Value: Enum.Operator.BeginWith },
        { Name: "-.",Show:"- : Kết thúc bằng", Value: Enum.Operator.EndWith },
        { Name: "!.",Show:"! : Không chứa", Value: Enum.Operator.NotContain },
      ],
    };
  },
  methods: {
    /**
     * Chọn 1 đối tượng
     * Author: CTKimYen (22/1/2022)
     */
    onClickRowActive(entity) {
      this.$emit("onClickRowActive", entity)
    },
    
    /**
     * Thiết lập giá trị cho danh sách lọc
     * Author: CTKimYen (23/1/2022)
     */
    setObjectFilter(object){
      this.$emit("setObjectFilter", object);
    }
  },

};
</script>
