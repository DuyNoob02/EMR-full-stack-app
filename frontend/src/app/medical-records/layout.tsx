"use client";

import { useState } from "react";
import Breadcrumbs from "../../components/ui/Breadcrumb";
import Header from "../../components/layout/Header";
import DepartmentSelectorModal from "../../components/ui/DepartmentSelectorModal";


export default function MedicalRecordsLayout({ children }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="px-4 py-2 border-b bg-white flex items-center justify-end">
                <Breadcrumbs />
                <Header onOpenDepartmentModal={() => setModalOpen(true)} />
            </div>

            <div className="p-1">{children}</div>

            <DepartmentSelectorModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSelect={() => { }} // Không cần, localStorage xử lý rồi
            />
        </div>
    );
}