"use client";

import { ConfigProvider, Dropdown, Table, Tag } from "antd";
import { useState } from "react";
import { PlusOutlined, SearchOutlined, CheckCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { PieChart } from "@/components/ui/PieChart";

interface RoomBed {
    room: string;
    bed: string;
}

//danh sách chẩn đoán
interface MedicalDiagnosis {
    title: string[];
}
interface ClinicalTest {
    title: string;
    items: string[];
}

interface PatientRecord {
    key: string;
    patientCode: string;
    admissionCode: string;
    medicalRecordCode: string;
    name: string;
    gender: "Nam" | "Nữ";
    yearOfBirth: number;
    roomBed: RoomBed;
    medicalDiagnosis: MedicalDiagnosis;
    cdcs: string;
    nctn: string;
    clinicalTests: ClinicalTest;
    admissionDate: string;
    sndt: number;
    treatmentType: string;
    patientObjectType: string;
}
export default function PatientManagerPage() {
    const [showStats, setShowStats] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState("Bác sĩ điều trị (Tất cả)");
    const columns: ColumnsType<PatientRecord> = [
        { title: "Mã bệnh nhân", dataIndex: "patientCode", width: 100, align: "center" },
        {
            title: "Mã khám bệnh / Mã bệnh án",
            width: 100,
            align: "center",
            render: (_, record) => (
                <div className="text-xs leading-tight">
                    <div className="">{record.admissionCode}</div>
                    <div className="">{record.medicalRecordCode}</div>
                </div>
            ),
        },
        { title: "Họ tên", dataIndex: "name", width: 160 },
        {
            title: "Giới tính", dataIndex: "gender", width: 40,
            render: (gender) => (
                <span className={gender === "Nam" ? "text-blue-600" : "text-pink-600"}>
                    {gender === "Nam" ? "Nam" : "Nữ"}
                </span>
            )
        },
        { title: "Năm sinh", dataIndex: "yearOfBirth", width: 60 },
        {
            title: "Phòng / Giường",
            dataIndex: "roomBed",
            width: 70,
            render: (roomBed: RoomBed) => (
                <div className="text-xs leading-tight">
                    <div className="font-medium">P: {roomBed.room}</div>
                    <div className="font-medium">G: {roomBed.bed}</div>
                </div>
            ),
        },
        {
            title: "Chẩn đoán",
            dataIndex: "medicalDianosis",
            width: 200,
            //hiển thị tên chẩn đoán
            render: (_, record) => (
                <ul className="list-disc list-inside space-y-0.5 leading-tight">
                    {record.medicalDiagnosis.title.map((diag, index) => (
                        <li key={index}>{diag}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: "CDCS",
            dataIndex: "cdcs",
            width: 50,
            render: (cdcs) => {
                const colorMap: Record<string, string> = {
                    "Cấp I": "red",
                    "Cấp II": "gold",
                    "Cấp III": "green",
                };
                return <Tag color={colorMap[cdcs]}>{cdcs}</Tag>;
            },
        },
        {
            title: "NCTN",
            dataIndex: "nctn",
            width: 70,
            align: "center",
            render: (nctn) => {
                const colorMap: Record<string, string> = {
                    "Thấp": "green",
                    "Trung bình": "gold",
                    "Cao": "red",
                };
                return <Tag color={colorMap[nctn] || "default"}>{nctn}</Tag>;
            }
        },
        {
            title: <div className="text-center">Cận lâm sàng</div>,
            dataIndex: "clinicalTests",
            width: 140,
            align: "left",
            render: (_, record) => (
                <ul className="list-disc list-inside space-y-0.5 text-xs leading-tight">
                    {record.clinicalTests.items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )
        },
        { title: "Ngày giờ nhập viện", dataIndex: "admissionDate", width: 100, align: "center" },
        { title: "SNDT", dataIndex: "sndt", width: 50, align: "center" },
        { title: "Điều trị", dataIndex: "treatmentType", width: 70, align: "center" },
        { title: "Đối tượng", dataIndex: "patientObjectType", width: 70, align: "center" },
    ]


    // create fake data docter list for dropdown
    const doctorList = [
        { key: "all", label: "Tất cả" },
        { key: "1", label: "BS. Nguyễn Văn A" },
        { key: "2", label: "BS. Trần Thị B" },
        { key: "3", label: "BS. Lê Văn C" },
        { key: "4", label: "BS. Phạm Văn D" },
        { key: "5", label: "BS. Hoàng Thị E" },
    ];

    const patientData: PatientRecord[] = [
        {
            key: "1",
            patientCode: "2025029992",
            admissionCode: "2511000023",
            medicalRecordCode: "2025010978",
            name: "NGUYỄN NAM PHÚ",
            gender: "Nam",
            yearOfBirth: 2003,
            roomBed: { room: "62", bed: "G" },
            medicalDiagnosis: {
                title: ["Thoái hóa cột sống thắt lưng", "Viêm gan"],
            },
            cdcs: "Cấp II",
            nctn: "Trung bình",
            clinicalTests: {
                title: "Chẩn đoán hình ảnh:",
                items: [
                    "Nội soi đại tràng có thể thiết",
                    "Siêu âm Doppler tim, xạn tim",
                    "Nội soi trực tràng ống mềm",
                    "Siêu âm tuyến giáp",
                    "Nội soi bàng quang"
                ]
            },
            admissionDate: "08:02\n24/11/2025",
            sndt: 31,
            treatmentType: "Nội trú",
            patientObjectType: "BHYT"
        },
        {
            key: "2",
            patientCode: "2025029986",
            admissionCode: "2511000017",
            medicalRecordCode: "2025010975",
            name: "NGUYỄN MINH ĐỨC",
            gender: "Nam",
            yearOfBirth: 2003,
            roomBed: { room: "H017", bed: "" },
            medicalDiagnosis: {
                title: ["Viêm phổi", "Nhiễm trùng đường tiểu", "Tăng huyết áp"],
            },
            cdcs: "Cấp I",
            nctn: "Thấp",
            clinicalTests: {
                title: "Chẩn đoán hình ảnh:",
                items: [
                    "Nội soi đại tràng sigma",
                    "Siêu âm Doppler động mạch tứ cung",
                    "Chụp X-quang xương gót thẳng nghiêng"
                ]
            },
            admissionDate: "13:29\n14/11/2025",
            sndt: 40,
            treatmentType: "Nội trú",
            patientObjectType: "BHYT"
        },
        {
            key: "3",
            patientCode: "2025029984",
            admissionCode: "2511000015",
            medicalRecordCode: "2025010974",
            name: "NGUYỄN THỊ MAI",
            gender: "Nữ",
            yearOfBirth: 2003,
            roomBed: { room: "H001", bed: "" },
            medicalDiagnosis: {
                title: ["Bệnh tay chân miệng", "Sốt xuất huyết"],
            },
            cdcs: "Cấp III",
            nctn: "Thấp",
            clinicalTests: {
                title: "Xét nghiệm:",
                items: [
                    "EV71 IgM/IgG test nhanh",
                    "Tìm ký sinh trùng sốt rét trong máu (bằng phương pháp tập trung hồng cầu nhiễm)"
                ]
            },
            admissionDate: "07:48\n14/11/2025",
            sndt: 41,
            treatmentType: "Nội trú",
            patientObjectType: "BHYT"
        },
        {
            key: "4",
            patientCode: "2025029985",
            admissionCode: "2511000016",
            medicalRecordCode: "2025010976",
            name: "NGUYỄN THỊ X",
            gender: "Nữ",
            yearOfBirth: 2003,
            roomBed: { room: "P213", bed: "H003" },
            medicalDiagnosis: {
                title: ["Bệnh tay chân miệng", "Sốt xuất huyết"],
            },
            cdcs: "Cấp III",
            nctn: "Thấp",
            clinicalTests: {
                title: "Xét nghiệm:",
                items: [
                    "EV71 IgM/IgG test nhanh",
                    "Tìm ký sinh trùng sốt rét trong máu (bằng phương pháp tập trung hồng cầu nhiễm)"
                ]
            },
            admissionDate: "07:48\n14/11/2025",
            sndt: 41,
            treatmentType: "Nội trú",
            patientObjectType: "BHYT"
        },
    ];

    // const careLevelData = [
    //     { name: "Cấp I", value: 3, color: "#f97316" },   // orange-500
    //     { name: "Cấp II", value: 8, color: "#eab308" },  // yellow-500
    //     { name: "Cấp III", value: 3, color: "#22c55e" }, // green-500
    // ];

    // Data cho biểu đồ chế độ chăm sóc
    // Data cho biểu đồ chế độ chăm sóc
    const careData = [
        { name: 'Cấp I', value: 24, color: '#f97316' },
        { name: 'Cấp II', value: 8, color: '#eab308' },
        { name: 'Cấp III', value: 3, color: '#22c55e' }
    ];

    // Data cho biểu đồ nguy cơ té ngã
    const fallRiskData = [
        { name: 'Thấp', value: 2, color: '#22c55e' },
        { name: 'Trung bình', value: 5, color: '#eab308' },
        { name: 'Cao', value: 8, color: '#ef4444' }
    ];

    const handleDoctorClick = ({ key }) => {
        const selected = doctorList.find(item => item.key === key);
        if (selected) {
            setSelectedDoctor(selected.label);
        }
    };

    return (
        <div className="flex flex-col gap-2 bg-gray-50 min-h-screen">
            {/* ================= FILTER PANEL ================= */}
            <div className="bg-white rounded-lg shadow px-4 py-2">
                <div className="flex flex-wrap gap-2 items-center">
                    <Dropdown menu={{ items: doctorList, onClick: handleDoctorClick }} trigger={['click']}>
                        <button className="border border-gray-300 rounded px-3 py-1 text-sm min-w-[180px] focus:outline-none focus:border-teal-500 hover:border-teal-400 text-left flex items-center justify-between bg-white">
                            <span>{selectedDoctor}</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </Dropdown>

                    <select className="border border-gray-300 rounded px-3 py-1 text-sm min-w-[180px] focus:outline-none focus:border-teal-500">
                        <option>ĐD chăm sóc (Tất cả)</option>
                    </select>

                    <select className="border border-gray-300 rounded px-3 py-1 text-sm min-w-[180px] focus:outline-none focus:border-teal-500">
                        <option>Phòng (Tất cả)</option>
                    </select>

                    <select className="border border-gray-300 rounded px-3 py-1 text-sm min-w-[180px] focus:outline-none focus:border-teal-500">
                        <option>Đối tượng (Tất cả)</option>
                    </select>

                    <input
                        className="border border-gray-300 rounded px-3 py-1 text-sm min-w-40 focus:outline-none focus:border-teal-500"
                        placeholder="Mã bệnh nhân"
                    />

                    <input
                        className="border border-gray-300 rounded px-3 py-1 text-sm min-w-40 focus:outline-none focus:border-teal-500"
                        placeholder="Mã khám bệnh"
                    />
                    <input
                        className="border border-gray-300 rounded px-3 py-1 text-sm min-w-40 focus:outline-none focus:border-teal-500"
                        placeholder="Mã bệnh án"
                    />

                    <input
                        className="border border-gray-300 rounded px-3 py-1 text-sm min-w-40 focus:outline-none focus:border-teal-500"
                        placeholder="Họ và tên"
                    />

                    <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                        <SearchOutlined size={16} />
                        <span>Tìm kiếm</span>
                    </button>

                    <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                        <PlusOutlined size={16} />
                        <span>Đăng ký nhập viện</span>
                    </button>
                </div>
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div className="flex ">
                {/* ===== STATS PANEL (LEFT) ===== */}
                <div
                    className={`bg-white rounded-lg shadow transition-all duration-300 ease-in-out ${showStats ? "w-[260px] opacity-100" : "w-0 opacity-0 overflow-hidden"
                        }`}
                >
                    <div className="p-1 space-y-3 min-w-[260px]">
                        {/* Tổng số người bệnh */}
                        <div className="flex flex-col items-center border-2 border-teal-500 rounded-lg p-1 bg-linear-to-br from-teal-50 to-white">
                            <div className="text-sm text-gray-600 mb-1 font-medium">
                                Tổng số người bệnh
                            </div>
                            <div className="text-5xl font-bold text-teal-600">
                                114
                            </div>
                        </div>

                        {/* Chế độ chăm sóc */}
                        <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-600 mb-3 font-semibold">
                                Chế độ chăm sóc
                            </div>
                            {/* flex chart and stats */}
                            <div className="flex flex-row items-center justify-between gap-4">
                                {/* Biểu đồ */}
                                <div className="">
                                    <PieChart data={careData} />
                                </div>
                                <div className="space-y-1">
                                    <ul className="">
                                        <li className="text-sm">Cấp I: <span className="font-semibold text-red-600">{careData[0].value}</span></li>
                                    </ul>
                                    <ul className="">
                                        <li className="text-sm">Cấp II: <span className="font-semibold text-yellow-600">{careData[1].value}</span></li>
                                    </ul>
                                    <ul className="">
                                        <li className="text-sm">Cấp III: <span className="font-semibold text-green-600">{careData[2].value}</span></li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        {/* Nguy cơ té ngã */}
                        <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-600 mb-3 font-semibold">
                                Nguy cơ té ngã
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        Thấp:
                                    </span>
                                    <span className="font-semibold text-green-600">2</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                        Trung bình:
                                    </span>
                                    <span className="font-semibold text-yellow-600">5</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        Cao:
                                    </span>
                                    <span className="font-semibold text-red-600">8</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== TOGGLE BUTTON ===== */}
                <button
                    onClick={() => setShowStats(!showStats)}
                    className=" bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-r-lg shadow-lg transition-all self-start sticky top-4 z-10 shrink-0"
                    title={showStats ? "Ẩn thống kê" : "Hiện thống kê"}
                >
                    <svg
                        className={`w-5 h-5 transition-transform duration-300 ${showStats ? "rotate-180" : ""
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>

                {/* ===== TABLE PANEL (RIGHT) ===== */}
                <div className="flex flex-1 flex-col bg-white rounded-lg shadow min-w-0">
                    <div className="flex-1 min-h-0 px-3 pt-3">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Table: {
                                        headerBg: "var(--color-teal-500)",
                                        headerColor: "white",
                                        // headerSortActiveBg: "#0d9488",
                                        // headerSortHoverBg: "#0d9488",
                                        rowHoverBg: "var(--color-teal-50)",
                                    },
                                },
                            }}
                        >
                            <Table
                                columns={columns}
                                dataSource={patientData}
                                rowKey="patientCode"
                                pagination={
                                    patientData.length === 0
                                        ? false
                                        : {
                                            pageSize: 20,
                                            showSizeChanger: true,
                                            showTotal: (total) => `Tổng ${total} bản ghi`,
                                        }
                                }
                                scroll={{ x: 1400, y: "calc(100vh - 360px)" }}
                                bordered
                                size="small"
                                locale={{
                                    emptyText: "Không có dữ liệu",
                                }}
                            />
                        </ConfigProvider>

                    </div>
                    {/* <style jsx global>{`
                        .ant-table-thead > tr > th {
                            background-color: var(--color-teal-500) !important;
                            font-weight: 600;
                            color: white !important;
                        }
                        .ant-table-tbody > tr:hover {
                            background-color: var(--color-teal-50) !important;
                        }
                    `}
                    </style> */}

                    {/* Footer placeholder */}
                    {patientData.length === 0 && (
                        <div className="h-12 bottom-0 border-t border-gray-200" > footer placeholder </div>
                    )}
                </div>
            </div>
        </div>
    );
}