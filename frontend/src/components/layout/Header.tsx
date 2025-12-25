"use client";

import { useEffect, useState, useRef } from "react";
import UserProfilePanel from "../ui/UserProfilePanel";
import { User } from "lucide-react";

export default function Header({ onOpenDepartmentModal }) {
    const [selectedDept, setSelectedDept] = useState("");
    const [openUserPanel, setOpenUserPanel] = useState(false);
    const userPanelRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                userPanelRef.current &&
                !userPanelRef.current.contains(event.target as Node)
            ) {
                setOpenUserPanel(false);
            }
        }

        if (openUserPanel) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openUserPanel]);

    return (
        <header className="grid grid-cols-2 w-full px-4 bg-white">
            {/* <h1 className="text-lg font-semibold text-gray-800">
                Hệ thống quản lý bệnh án
            </h1> */}

            <div className="flex items-center justify-center gap-4">
                <span className="text-sm text-gray-600">
                    Đơn vị: <strong>{selectedDept || "Chưa chọn"}</strong>
                </span>

                <button
                    onClick={onOpenDepartmentModal}
                    className="px-2 py-1 bg-teal-500 text-white font-semibold text-sm rounded hover:bg-teal-600"
                >
                    Chọn khoa
                </button>
            </div>

            <div className="relative flex items-center justify-end gap-4" ref={userPanelRef}>

                <button
                    onClick={() => setOpenUserPanel((open) => !openUserPanel)}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                    <User size={20} className="mr-2" />
                    <span className="text-sm text-gray-600">Người dùng: Admin</span>
                </button>
                {openUserPanel && (
                    <div className="absolute top-10 right-0 z-10 mt-2">
                        <UserProfilePanel />
                    </div>
                )}
            </div>
        </header>
    );
}
