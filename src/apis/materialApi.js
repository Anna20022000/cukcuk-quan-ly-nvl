import http from "@/commons/http.js";

class MaterialApi {
  /**
   * api lấy ra tất cả nguyên vật liệu
   * @returns danh sách nguyên vật liệu
   * Author: CTKYen (20/1/2022)
   */
  getAll() {
    return http.get("/api/v1/Material");
  }
  /**
   * api lấy ra nguyên vật liệu theo id
   * @param {string} id Id nguyên vật liệu
   * @returns nguyên vật liệu
   * Author: CTKYen (20/1/2022)
   */
  getSingle(id){
    return http.get(`/api/v1/Material/${id}`);
  }
  /**
   * api sinh mã NVL tự động theo tên NVL
   * @param {string} name Tên NVL
   * @returns Mã NVL mới
   * Author: CTKimYen (21/1/2022)
   */
  getNewCode(name) {
    return http.get(`/api/v1/Material/newMaterialCode?materialName=${name}`);
  }
  /**
   * api thêm mới 1 nguyên vật liệu vào database
   * @param {employeeModel} data thông tin nguyên vật liệu được thêm mới
   * @returns response thêm thành công hay không
   * Author: CTKYen (20/1/2022)
   */
  create(data) {
    data.Expiry = Number.parseInt(data.Expiry);
    data.Quantity = Number.parseInt(data.Quantity);
    data.IsFollow = Number.parseInt(data.IsFollow);
    return http.post("/api/v1/Material", data);
  }
  /**
   * api sửa thông tin 1 nguyên vật liệu đã chọn
   * @param {string} id mã của đối tượng nguyên vật liệu cần update
   * @param {employeeModel} data thông tin nguyên vật liệu khi update
   * @returns response sửa thành công hay không
   * Author: CTKYen (20/1/2022)
   */
  update(id, data) {
    data.Expiry = Number.parseInt(data.Expiry);
    data.Quantity = Number.parseInt(data.Quantity);
    data.IsFollow = Number.parseInt(data.IsFollow);
    return http.put(`/api/v1/Material/${id}`, data);
  }
  /**
   * api xóa nguyên vật liệu theo khóa chính
   * @param {string} entityId Khóa chính của bảng nguyên vật liệu - ID
   * @returns response xóa thành công hay không
   * Author: CTKYen (20/1/2022)
   */
  delete(entityId) {
    return http.delete(`/api/v1/Material/${entityId}`);
  }
  /**
   * api tìm kiếm, sắp xếp, phân trang danh sách nguyên vật liệu theo điều kiện
   * @param {number} pageSize Số bản ghi/ trang
   * @param {number} pageIndex Trang số bao nhiêu
   * @param {string} listObjectFilter danh sách đối tượng để lọc dữ liệu
   * @param {string} objectSort đối tượng để sap xep
   * @returns Danh sách nguyên vật liệu thỏa mãn điều kiện lọc
   * Author: CTKYen (20/1/2022)
   */
  filter( pageIndex,pageSize, listObjectFilter, objectSort){
    listObjectFilter = JSON.stringify(listObjectFilter);
    objectSort = JSON.stringify(objectSort);
    return http.get(`/api/v1/Material/filter?pageIndex=${pageIndex}&pageSize=${pageSize}&objectFilterJson=${listObjectFilter}&objectSortJson=${objectSort}`);
  }
}

export default new MaterialApi();
