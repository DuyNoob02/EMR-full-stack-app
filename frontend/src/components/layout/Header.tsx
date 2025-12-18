"use client";

import { useEffect, useState } from "react";

export default function Header({ onOpenDepartmentModal }) {
    const [selectedDept, setSelectedDept] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("selectedDepartment");
        if (saved) setSelectedDept(saved);
    }, []);

    // Mỗi lần modal chọn khoa, Layout sẽ cập nhật localStorage
    // Header chỉ cần đọc lại khi Layout truyền thêm trigger
    useEffect(() => {
        const saved = localStorage.getItem("selectedDepartment");
        if (saved) setSelectedDept(saved);
    });

    return (
        <header className="grid grid-cols-2 w-full px-4 py-2 border-b bg-white">
            {/* <h1 className="text-lg font-semibold text-gray-800">
                Hệ thống quản lý bệnh án
            </h1> */}

            <div className="flex items-center justify-center gap-4">
                <span className="text-sm text-gray-600">
                    Khoa: <strong>{selectedDept || "Chưa chọn"}</strong>
                </span>

                <button
                    onClick={onOpenDepartmentModal}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Chọn khoa
                </button>
            </div>

            <div className="flex items-center justify-end gap-4">
                <span className="text-sm text-gray-600">Người dùng: Admin</span>
            </div>
        </header>
    );
}
