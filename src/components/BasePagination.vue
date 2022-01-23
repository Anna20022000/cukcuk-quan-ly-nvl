<template>
  <div class="m-paginate">
    <div class="m-paging-left">
      <div class="m-page-bar">
        <!-- Button trang đầu tiên -->
        <div
          class="mi-16 mi-page-first"
          @click="btnFirstPageOnClick()"
          :class="{ 'm-disable': pageIndex == 1 }"
        ></div>
        <!-- Button trang trước -->
        <div
          class="mi-16 mi-page-pre"
          @click="btnPrevPageOnClick()"
          :class="{ 'm-disable': pageIndex == 1 }"
        ></div>
        <div class="m-text-paging">|</div>
        <div class="m-text-paging">Trang</div>
        <!-- Input nhập số trang-->
        <div>
          <input
            type="input"
            value="1"
            @blur="onChangePageIndex()"
            v-model="pageNumber"
            v-mask="'###'"
            class="m-input"
            style="height: 24px; width: 38px"
          />
        </div>
        <div class="m-text-paging" style="min-width: 50px">trên {{ totalPage }}</div>
        <!-- Button trang tiếp theo -->
        <div class="m-text-paging">|</div>
        <div
          class="mi-16 mi-page-next"
          @click="btnNextPageOnClick()"
          :class="{ 'm-disable': pageIndex == totalPage }"
        ></div>
        <!-- Button trang cuối cùng -->
        <div
          class="mi-16 mi-page-last"
          @click="btnLastPageOnClick()"
          :class="{ 'm-disable': pageIndex == totalPage }"
        ></div>
        <div class="m-text-paging">|</div>
        <div class="mi-16 mi-page-refresh"></div>
        <div class="m-text-paging">|</div>
      </div>
      <div class="m-chosse-size m-flex-item-center" 
      :class="{ 'm-chosse-size-active': showDropdownChoseSize, }">
        <div class="page-size-text">
          {{ pageSize}}
        </div>
        <div
          class="m-dropdown"
          :class="{'m-dropdown-active': showDropdownChoseSize,}"
        >
          <div
            class="m-icon-arrow"
            @click="showDropdownChoseSize = !showDropdownChoseSize"
          >
            <i class="mi-16 mi-dropdown"></i>
          </div>
          <div class="m-dropdown-list">
            <div v-for="page in listPageSizes"
              :key="page" class="m-dropdown-item"
              :class="{'m-dropdown-item-active': pageSize == page, }"
              @click="onChangePageSize(page)"
            >
              {{ page }}
            </div>
          </div>
        </div>
      </div>  
    </div>
    <div class="m-paging-right">
      Hiển thị {{ (pageIndex-1) * pageSize + 1 }} - {{ pageSize * pageIndex > totalRecord ? totalRecord : pageSize * pageIndex }}
      trên {{ totalRecord }} kết quả
    </div>
  </div>
</template>

<script>
export default {
  props: ["pageIndex", "pageSize", "totalPage", "totalRecord", "listPageSizes"],
  data() {
    return {
      pageNumber: this.pageIndex,
      showDropdownChoseSize: false,
    };
  },
  methods: {
    /**
     * Click button chuyển đến trang đầu tiên
     * Author: CTKimYen (22/1/2022)
     */
    btnFirstPageOnClick() {
      this.pageNumber = 1;
      this.onChangePageIndex(this.pageNumber);
    },
    /**
     * Click button chuyển đến trang tiếp theo
     * Author: CTKimYen (22/1/2022)
     */
    btnPrevPageOnClick() {
      this.pageNumber--;
      this.onChangePageIndex(this.pageNumber);
    },
    /**
     * Click button chuyển đến trang cuối cùng
     * Author: CTKimYen (22/1/2022)
     */
    btnLastPageOnClick() {
      this.pageNumber = this.totalPage;
      this.onChangePageIndex(this.pageNumber);
    },
    /**
     * Click button chuyển đến trang tiếp theo
     * Author: CTKimYen (22/1/2022)
     */
    btnNextPageOnClick() {
      this.pageNumber++;
      this.onChangePageIndex(this.pageNumber);
    },
    /**
     * Chuyển tới trang khi nhập input
     *  Author: CTKimYen (22/1/2022)
     */
    onChangePageIndex() {
      if(this.pageNumber < 1) this.pageNumber =1;
      if (this.pageNumber > this.totalPage) this.pageNumber = this.totalPage;
      this.$emit("onChangePageIndex", this.pageNumber);
    },
    /**
     * Thay đổi số bản ghi trên 1 trang
     *  Author: CTKimYen (22/1/2022)
     */
    onChangePageSize(pageSize) {
      this.$emit("onChangePageSize", pageSize);
    },
  },

  watch: {
    /** 
     * Khi thay đổi số bản ghi trên trang 
     * Author: CTKimYen (22/1/2022)
    */
    pageSize() {
      this.pageNumber = 1;
      this.showDropdownChoseSize = false;
    },
    /**
     * Khi thay đổi pageIndex thì cập nhật lại trang hiển thị
     * Author: CTKimYen (23/1/2022)
     */
    pageIndex(){
      this.pageNumber = this.pageIndex;
    }
  },
};
</script>
