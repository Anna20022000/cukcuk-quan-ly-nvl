let Resource = {
    /**
     * Resource cho tiêu đề form chi tiết NVL
     * Author: CTKimYen (20/1/2022)
     */
    TitleMaterial: {
        /** Thêm mới */
        Insert: "Thêm Nguyên vật liệu",
        /** Sửa */
        Update: "Sửa Nguyên vật liệu"
    },
    /**
     * Resource cho dòng thông báo lỗi về NVL
     * Author: CTKimYen (25/1/2022)
     */
    ErrorMsgMaterial: {
        DuplicateUnit: "Đơn vị chuyển đổi không được trùng với đơn vị tính chính.",
        DuplicateEachOther: "Đơn vị chuyển đổi không được trùng nhau.",
        EmptyConversion: "Đơn vị chuyển đổi không được để trống.",
    },
    ErrorMsgInput: {
        Empty: "Trường này không được để trống.",
        MaxLength: "Trường này tối đa 25 ký tự.",
    },
    Question:{
        DataChange: "Dữ liệu đã thay đổi, bạn có muốn cất không?",
        ConfirmDelete(code, name){
            return `Bạn có chắc chắn muốn xóa Nguyên vật liệu <<${code} - ${name}>> không?`
        },
    }
}
export default Resource;