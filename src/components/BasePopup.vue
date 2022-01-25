<template>
  <div style="display: none" :class="{ 'm-modal-show': show }">
    <div class="m-popup">
      <div class="m-popup-title">CUKCUK - Quản lý nhà hàng</div>
      <div class="m-popup-content">
        <div class="m-flex">
          <!-- ICON DEPEND STATUS -->
          <div class="mi mi-32 mi-warning" v-if="status == warning"></div>
          <div
            class="mi mi-32 mi-question"
            v-if="status == confirm || status == question"
          ></div>

          <div class="m-popup-messenger">{{ message }}</div>
        </div>
      </div>
      <!-- ERROR -->
      <div class="m-popup-bottom m-flex-right" v-if="status == warning">
        <button class="m-btn" @click="btnYesWarning()" ref="btnYesW">
          Đồng ý
        </button>
      </div>

      <!-- QUESTION: DATA CHANGE -->
      <div class="m-popup-bottom m-flex-end" v-if="status == question">
        <button class="m-btn" @click="btnYesQuestion()" ref="btnYesQ">
          Có
        </button>
        <button class="m-btn" @click="btnNoQuestion()">Không</button>
        <button class="m-btn" @click="btnCancelQuesion()">Hủy bỏ</button>
      </div>

      <!-- DELETE SINGLE -->
      <div class="m-popup-bottom m-flex-end" v-if="status == confirm">
        <button class="m-btn" @click="btnYesConfirm()" ref="btnYesC">Có</button>
        <button class="m-btn m-btn-outline" @click="btnNoConfirm()">
          Không
        </button>
      </div>
    </div>

    <!-- background -->
    <div class="m-popup-background"></div>
  </div>
</template>

<script>
import Enum from "../commons/enums.js";

export default {
  props: ["status", "message", "show"],
  data() {
    return {
      warning: Enum.PopupStatus.Warning,
      confirm: Enum.PopupStatus.Confirm,
      question: Enum.PopupStatus.Question,
    };
  },
  methods: {
    // ------------------------------- WARNING --------------------------------
    /**
     * close the popup
     * Author: CTKimYen (24/1/2022)
     */
    btnYesWarning() {
      this.$emit("btnYesWarning");
    },

    // ------------------------------- QUESTION --------------------------------
    /**
     * when click button NO in popup Question
     * Author: CTKimYen (24/1/2022)
     */
    btnNoQuestion() {
      this.btnCancelQuesion();
      this.$emit("btnNoQuestion");
    },
    /**
     * Khi click button YES
     * Author: CTKimYen (24/1/2022)
     */
    btnYesQuestion() {
      this.btnCancelQuesion();
      this.$emit("btnYesQuestion");
    },
    /**
     * Khi click button Hủy trên popup
     * Author: CTKimYen (24/1/2022)
     */
    btnCancelQuesion() {
      this.$emit("btnCancelQuesion");
    },
    // ------------------------------- CONFIRM -----------------------------------

    /**
     * Khi click button Có
     * Author: CTKimYen (24/1/2022)
     */
    btnYesConfirm() {
      this.$emit("btnYesConfirm");
      // Đóng popup
      this.btnNoConfirm();
    },

    /**
     * Khi click button Không - đóng popup
     * Author: CTKimYen (24/1/2022)
     */
    btnNoConfirm() {
      this.$emit("btnNoConfirm");
    },
  },
  watch: {
    show() {
      switch (this.status) {
        case this.warning:
          setTimeout(() => {
            this.$refs.btnYesW.focus();
          }, 10);
          break;
        case this.confirm:
          setTimeout(() => {
            this.$refs.btnYesC.focus();
          }, 10);
          break;
        case this.question:
          setTimeout(() => {
            this.$refs.btnYesQ.focus();
          }, 10);
          break;
        default:
          break;
      }
    },
  },
};
</script>
