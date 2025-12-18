"use client";

import { Table } from "antd";

export default function DashboardPage() {

    const columns = [
        { title: "Mã người bệnh", dataIndex: "code", width: 120 },
        { title: "Mã tiếp nhận", dataIndex: "receive", width: 120 },
        { title: "Họ tên", dataIndex: "name", width: 150 },
        { title: "Giới tính", dataIndex: "gender", width: 100 },
        { title: "Nhóm máu", dataIndex: "blood", width: 100 },
        { title: "Phòng giường", dataIndex: "room", width: 150 },
        { title: "Cận lâm sàng", dataIndex: "cls", width: 150 },
        { title: "Ngày giờ nhập viện", dataIndex: "date", width: 160 },
        { title: "SNĐT", dataIndex: "type", width: 100 },
        { title: "Điều trị", dataIndex: "treatment", width: 120 },
    ];

    return (
        <div className="min-h-screen bg-[#CCEBEB] flex flex-col">

            {/* FILTER SECTION */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#CCEBEB]">
                <input className="p-2 rounded border" placeholder="BS điều trị (Tất cả)" />
                <input className="p-2 rounded border" placeholder="DD chăm sóc (Tất cả)" />
                <input className="p-2 rounded border" placeholder="Nguy cơ té ngã" />
                <input className="p-2 rounded border" placeholder="Mã bệnh nhân" />
                <input className="p-2 rounded border" placeholder="Mã tiếp nhận" />
                <input className="p-2 rounded border" placeholder="Họ tên" />
                <button className="bg-[#229EA1] text-white px-4 rounded">Tìm kiếm</button>
                <button className="bg-[#0D7EA8] text-white px-4 rounded">Đăng ký nhập viện</button>
            </div>

            {/* CARDS */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded p-4">
                    <div className="text-gray-700">Tổng số người bệnh</div>
                    <div className="text-3xl font-bold">0</div>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <div className="text-gray-700">Chế độ chăm sóc</div>
                    <div className="text-3xl font-bold">—</div>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <div className="text-gray-700">Nguy cơ té ngã</div>
                    <div className="text-3xl font-bold">—</div>
                </div>
            </div>

            {/* TABLE */}
            <div className="px-4 flex-1">
                <Table
                    columns={columns}
                    dataSource={[]}
                    pagination={false}
                    scroll={{ x: 1000, y: 500 }}
                    bordered
                    className="bg-white rounded shadow"
                />
            </div>

            {/* FOOTER */}
            <div className="p-2 text-xs text-gray-700 bg-[#C6E5E5]">
                Version: test_dh_v3.9.251206120257 | Device: Windows-Desktop
            </div>

        </div>
    );
}
