let Enum = {
    /**
     * Toán tử dùng để lọc dữ liệu khi tìm kiếm
     * Author: CTKimYen (20/1/2022)
     */
    Operator: {
        /** Chứa */
        Contain : 0,
        /** Bằng */
        EqualTo : 1,
        /** Bắt đầu bằng */
        BeginWith : 2,
        /** Kết thúc bằng */
        EndWith : 3,
        /** Không chứa */
        NotContain : 4
    },
    /**
     * Trạng thái của form chi tiết
     * Author: CTKimYen (21/1/2022)
     */
    FormMode:{
        /** Thêm */
        Add: 0,
        /** Sửa */
        Update: 1
    },
    /**
     * Trạng thái cất
     * Author: CTKimYen (22/1/2022)
     */
    ActionMode:{
        // Cất
        Save : 0,
        /** Cất và thêm */
        SaveNew: 1,
    },

    /**
     * Trạng thái của một đối tượng
     * Author: CTKimYen (21/1/2022)
     */
    State:{
        /** Thêm mới */
        Insert: 0,
        /** Sửa */
        Update: 1,
        /** Xóa */
        Delete: 2
    },
    /**
     * Trạng thái của popup
     * Author: CTKimYen (25/1/2022)
     */
    PopupStatus:{
        /** Popup cảnh báo có 1 button (đồng ý)*/
        Warning: "warning",
        /** Popup xác nhận có 2 button (có/không) */
        Confirm: "confirm",
        /** Popup câu hỏi xác nhận có 3 button (có/không/hủy) */
        Question: "question"
    }

}
export default Enum;