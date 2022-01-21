import http from "@/commons/http.js";

class UnitApi {
  /**
   * api lấy ra tất cả Đơn vị tính
   * @returns danh sách Đơn vị tính
   * Author: CTKYen (22/1/2022)
   */
  getAll() {
    return http.get("/api/v1/Unit");
  }
}

export default new UnitApi();
