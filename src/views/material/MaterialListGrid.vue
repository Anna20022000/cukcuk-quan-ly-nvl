<template>
  <div class="m-content-table">
    <!-- table -->
    <table class="m-table">
      <thead class="m-text-left">
        <tr>
          <th>
            <div class="m-th-name">Mã nguyên vật liệu</div>
            <div class="m-filter">
              <div class="m-cbb-filter"><span>*.</span></div>
              <input type="text" class="m-input" />
            </div>
          </th>
          <th>
            <div class="m-th-name">Tên nguyên vật liệu</div>
            <div class="m-filter">
              <div class="m-cbb-filter"><span>*.</span></div>
              <input type="text" class="m-input" />
            </div>
          </th>
          <th>
            <div class="m-th-name">Tính chất</div>
            <div class="m-filter">
              <div class="m-cbb-filter"><span>*.</span></div>
              <input type="text" class="m-input" />
            </div>
          </th>
          <th>
            <div class="m-th-name">ĐVT chính</div>
            <div class="m-filter">
              <div class="m-cbb-filter"><span>*.</span></div>
              <input type="text" class="m-input" />
            </div>
          </th>
          <th>
            <div class="m-th-name">Nhóm nguyên vật liệu</div>
            <div class="m-filter">
              <div class="m-cbb-filter"><span>*.</span></div>
              <input type="text" class="m-input" />
            </div>
          </th>
          <th>
            <div class="m-th-name">Ghi chú</div>
            <div class="m-filter">
              <div class="m-cbb-filter"><span>*.</span></div>
              <input type="text" class="m-input" />
            </div>
          </th>
          <th>
            <div class="m-th-name">Ngừng theo dõi</div>
            <div class="m-filter">
              <div class="m-cbb-filter"><span>*.</span></div>
              <input type="text" class="m-input" />
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
export default {
  props: ["materials", "materialId"],
  data() {
    return {
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
  },

};
</script>
