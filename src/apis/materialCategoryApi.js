import http from "@/commons/http.js";

class MaterialCategoryApi {
  /**
   * api lấy ra tất cả nhóm NVL
   * @returns danh sách nhóm NVL
   * Author: CTKYen (23/1/2022)
   */
  getAll() {
    return http.get("/api/v1/MaterialCategory");
  }
}

export default new MaterialCategoryApi();
