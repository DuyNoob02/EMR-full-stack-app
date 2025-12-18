"use client";

import { Modal, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function DepartmentSelectorModal({ open, onClose, onSelect }) {
    const [search, setSearch] = useState("");

    const departmentList = [
        "PHÒNG THU PHÍ",
        "PK Tiêm Vắc xin phòng Covid-19",
        "KHOA NGOẠI TỔNG HỢP",
        "Phòng khám (Nhi)",
        "KHOA HỒI SỨC CẤP CỨU",
        "KHOA Y HỌC CỔ TRUYỀN",
        "Phòng khám 1",
        "Buồng khám tầm soát Covid",
        "Khu Điều trị Covid-19",
        "KHOA TRUYỀN NHIỄM",
        "KHOA NHI",
    ];

    const handleSelect = (dept: string) => {
        localStorage.setItem("selectedDepartment", dept); // Lưu
        onSelect?.(dept); // Callback về cha
        onClose(); // Đóng modal
    };

    // Tính toán danh sách đã lọc
    const filteredList = departmentList.filter((d) =>
        d.toLowerCase().includes(search.toLowerCase())
    );

    // Tính chiều cao động (mỗi item ~40px, max 320px)
    const itemHeight = 40;
    const maxHeight = 320;
    const calculatedHeight = Math.min(filteredList.length * itemHeight, maxHeight);

    return (
        <Modal
            open={open}
            footer={null}
            closable={true}
            onCancel={onClose}
            width={500}
            centered
        >
            <div className="text-center mb-4">
                <SearchOutlined className="text-4xl text-[#229EA1]" />
                <h2 className="text-xl font-semibold mt-2">Chọn khoa phòng</h2>
            </div>

            <Input
                placeholder="Tìm kiếm khoa phòng"
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4"
            />

            <div
                className="overflow-y-auto"
                style={{
                    height: `${calculatedHeight}px`,
                    transition: 'height 0.3s ease-in-out',
                    alignItems: 'flex-start', // Đảm bảo giảm từ dưới lên
                }}
            >
                {filteredList.map((d, idx) => (
                    <div
                        key={idx}
                        className="p-1 border-b text-[#229EA1] hover:bg-[#E0F5F4] hover:transform hover:-translate-y-1 hover:shadow-lg cursor-pointer transition-all duration-200"
                        onClick={() => handleSelect(d)}
                    >
                        {d}
                    </div>
                ))}
            </div>
        </Modal>
    );
}