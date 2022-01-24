<template>
  <div style="display:none" :class="{ 'm-modal-show': show }">
    <div class="m-popup">
      <div class="m-popup-title">CUKCUK - Quản lý nhà hàng</div>
      <div class="m-popup-content">
        <div class="m-flex">
          <!-- ICON DEPEND STATUS -->
          <div class="mi mi-32 mi-warning" v-if="status == 'warning'"></div>
          <div class="mi mi-32 mi-question" v-if="status == 'confirm' || status == 'question'"></div>

          <div class="m-popup-messenger">{{ message }}</div>
        </div>
      </div>
      <!-- ERROR -->
      <div class="m-popup-bottom m-flex-right" v-if="status == 'warning'">
        <button class="m-btn" @click="btnYesWarning()">Đồng ý</button>
      </div>

      <!-- QUESTION: DATA CHANGE -->
      <div class="m-popup-bottom m-flex" v-if="status == 'question'">
        <button class="m-btn m-btn-outline" @click="btnCancelQuesion()">Hủy</button>
        <div>
          <button class="m-btn m-btn-outline mr-10" @click="btnNoQuestion()">
            Không
          </button>
          <button class="m-btn" @click="btnYesQuestion()">Có</button>
        </div>
      </div>

      <!-- DELETE SINGLE -->
      <!-- <div class="m-popup-bottom m-flex" v-if="status == 2">
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
  // props: ["objectPopup"],
  props: ["status", "message", "show"],
  data() {
    return {
    };
  },
  methods: {
    /**
     * close the popup
     * Author: CTKimYen (24/1/2022)
     */
    btnYesWarning() {
      this.$emit("btnYesWarning");
    },
    
    // ---------------- QUESTION ---------------
    /**
     * when click button NO in popup Question
     * Author: CTKimYen (24/1/2022)
     */
    btnNoQuestion() {
      // close this popup
      // this.closePopup();
      // close form
      //   eventBus.$emit("hideModal");
    },
    /**
     * when click button YES
     * Author: CTKimYen (24/1/2022)
     */
    btnYesQuestion() {
      // close this popup
      this.closePopup();
      // save changed of form input data in database
      //   eventBus.$emit("save");
    },
    btnCancelQuesion(){
      this.$emit("btnCancelQuesion");
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
