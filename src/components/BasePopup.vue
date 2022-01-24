<template>
  <div style="display:none" :class="{ 'm-modal-show': isShowPopup }">
    <div class="m-popup">
      <div class="m-popup-title">CUKCUK - Quản lý nhà hàng</div>
      <div class="m-popup-content">
        <div class="m-flex">
          <!-- ICON DEPEND popupStatus -->
          <div class="mi mi-32 mi-warning" v-if="popupStatus == 1 || popupStatus == 2"></div>
          <div class="mi mi-32 mi-question" v-if="popupStatus == 3"></div>

          <div class="m-popup-messenger">{{ message }}</div>
        </div>
      </div>
      <!-- ERROR -->
      <div class="m-popup-bottom m-flex-right" v-if="popupStatus == 1">
        <button class="m-btn" @click="closePopup()">Đồng ý</button>
      </div>

      <!-- QUESTION: DATA CHANGE -->
      <!-- <div class="m-popup-bottom m-flex" v-if="popupStatus == 1">
        <button class="m-btn m-btn-outline" @click="closePopup()">Hủy</button>
        <div>
          <button class="m-btn m-btn-outline mr-10" @click="btnNoOnclick()">
            Không
          </button>
          <button class="m-btn" @click="btnYesOnclick()">Có</button>
        </div>
      </div> -->

      <!-- DELETE SINGLE -->
      <!-- <div class="m-popup-bottom m-flex" v-if="popupStatus == 2">
        <button class="m-btn m-btn-outline" @click="closePopupDel()">
          Không
        </button>
        <button class="m-btn" @click="confirmDel()">Có</button>
      </div> -->
    </div>

    <!-- background -->
    <div class="m-popup-background"></div>
  </div>
</template>

<script>
export default {
  props: ["objectPopup"],
  data() {
    return {
      popupStatus: 0,
      message: null,
      isShowPopup: false,
    };
  },
  watch: {
    objectPopup() {
      this.popupStatus = this.objectPopup.PopupStatus;
      this.message = this.objectPopup.Message;
      this.isShowPopup = this.objectPopup.IsShowPopup;
    },
  },
  methods: {
    /**
     * close the popup
     * Author: CTKimYen (24/1/2022)
     */
    closePopup() {
      this.$emit("showPopup", false);
    },
    /**
     * when click button NO in popup Question
     * Author: CTKimYen (24/1/2022)
     */
    btnNoOnclick() {
      // close this popup
      this.closePopup();
      // close form
      //   eventBus.$emit("hideModal");
    },
    /**
     * when click button YES
     * Author: CTKimYen (24/1/2022)
     */
    btnYesOnclick() {
      // close this popup
      this.closePopup();
      // save changed of form input data in database
      //   eventBus.$emit("save");
    },

    // ------------ XÓA MỘT ---------------------

    /**
     * If click OK, call function deleteEmployee in father-component
     * Author: CTKimYen (24/1/2022)
     */
    confirmDel() {
      //   this.$emit("deleteSingle");
    },

    /**
     * If click NOT, close the popup
     * Author: CTKimYen (24/1/2022)
     */
    closePopupDel() {
      //   this.$emit("showPopup", false);
    },
  },
};
</script>
