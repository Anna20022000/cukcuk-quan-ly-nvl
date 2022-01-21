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
        Update:1,
        /** Cất và thêm */
        AddnNew: 2
    }

}
export default Enum;