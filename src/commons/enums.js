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
        Update: 1,
        /** Nhân bản */
        // Duplicate: 3
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
    }

}
export default Enum;