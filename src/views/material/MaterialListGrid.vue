<template>
  <div class="m-content-table">
    <!-- table -->
    <table class="m-table">
      <!-- Dòng tiêu đề + filter -->
      <thead class="m-text-left">
        <tr>
          <!-- Mã -->
          <th>
            <div class="m-th-name m-flex-center" @click="onChangeSortObject('MaterialCode')">Mã nguyên vật liệu 
              <div class="mi-sort-asc" v-show="sortOrder && sortSubmitted && sortName=='MaterialCode'"></div>
              <div class="mi-sort-desc" v-show="!sortOrder && sortSubmitted && sortName=='MaterialCode'"></div>
            </div>
              <base-input-filter
              :column="'MaterialCode'"
              @setObjectFilter="setObjectFilter"
              />
          </th>
          <!-- Tên -->
          <th>
            <div class="m-th-name m-flex-center" @click="onChangeSortObject('MaterialName')">Tên nguyên vật liệu
              <div class="mi-sort-asc" v-show="sortOrder && sortSubmitted && sortName=='MaterialName'"></div>
              <div class="mi-sort-desc" v-show="!sortOrder && sortSubmitted && sortName=='MaterialName'"></div>
            </div>
            <div>
              <base-input-filter
              :column="'MaterialName'"
              @setObjectFilter="setObjectFilter"
              />
            </div>
          </th>
          <!-- Tính chất -->
          <th>
            <div class="m-th-name m-flex-center" @click="onChangeSortObject('MaterialCategoryName')">Tính chất
              <div class="mi-sort-asc" v-show="sortOrder && sortSubmitted && sortName=='MaterialCategoryName'"></div>
              <div class="mi-sort-desc" v-show="!sortOrder && sortSubmitted && sortName=='MaterialCategoryName'"></div>
            </div>
            <div>
              <base-input-filter
              :column="'MaterialCategoryName'"
              @setObjectFilter="setObjectFilter"
              />
            </div>
          </th>
          <!-- ĐVT chính -->
          <th>
            <div class="m-th-name m-flex-center" @click="onChangeSortObject('UnitName')">ĐVT chính
              <div class="mi-sort-asc" v-show="sortOrder && sortSubmitted && sortName=='UnitName'"></div>
              <div class="mi-sort-desc" v-show="!sortOrder && sortSubmitted && sortName=='UnitName'"></div>
            </div>
            <div>
              <base-input-filter
              :column="'UnitName'"
              @setObjectFilter="setObjectFilter"
              />
            </div>
          </th>
          <!-- Nhóm nvl -->
          <th>
            <div class="m-th-name m-flex-center" @click="onChangeSortObject('MaterialCategoryName')">Nhóm nguyên vật liệu
              <div class="mi-sort-asc" v-show="sortOrder && sortSubmitted && sortName=='MaterialCategoryName'"></div>
              <div class="mi-sort-desc" v-show="!sortOrder && sortSubmitted && sortName=='MaterialCategoryName'"></div>
            </div>
            <div>
              <base-input-filter
              :column="'MaterialCategoryName'"
              @setObjectFilter="setObjectFilter"
              />
            </div>
          </th>
          <!-- Ghi chú -->
          <th>
            <div class="m-th-name m-flex-center" @click="onChangeSortObject('Note')">Ghi chú
              <div class="mi-sort-asc" v-show="sortOrder && sortSubmitted && sortName=='Note'"></div>
              <div class="mi-sort-desc" v-show="!sortOrder && sortSubmitted && sortName=='Note'"></div>
            </div>
            <div>
              <base-input-filter
              :column="'Note'"
              @setObjectFilter="setObjectFilter"
              />
            </div>
          </th>
          <!-- Theo dõi -->
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
      sortName: null,
      /** Thứ tự hiển thị dữ liệu (true-asc; false-desc) */
      sortOrder: false,
      /** Ẩn/hiện icon */
      sortSubmitted: false,
      /** Danh sách nhóm NVL */
      materialCategories:[],
      operators:[
        { Name: "*.", Show:"* : Chứa", Value: Enum.Operator.Contain },
        { Name: "=.", Show: "= : Bằng", Value: Enum.Operator.EqualTo },
        { Name: "+.", Show:"+ : Bắt đầu bằng", Value: Enum.Operator.BeginWith },
        { Name: "-.", Show:"- : Kết thúc bằng", Value: Enum.Operator.EndWith },
        { Name: "!.", Show:"! : Không chứa", Value: Enum.Operator.NotContain },
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
    },
    /**
     * Khi click vào tiêu đề cột thì tạo mới một đối tượng sắp xếp
     * Author: CTKimYen (23/1/2022)
     */
    onChangeSortObject(columnName) {
      this.sortName = columnName;
      console.log(columnName)
      this.sortSubmitted = true;
      this.sortOrder = !this.sortOrder;
      this.objSort = {
        Column: columnName,
        Sort: this.sortOrder == true ? "ASC" : "DESC",
      };
      this.$emit("onChangeSortObject", this.objSort);
    },

  },

};
</script>