'use client';

import { User, KeyRound, Printer, Settings, LogOut } from 'lucide-react';

export default function UserProfilePanel() {
    return (
        <div className="bg-white rounded-xl shadow-lg p-4 w-64">
            {/* Avatar + info */}
            <div className='flex flex-col items-center text-center mb-4'>
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl mb-2">
                    <User size={32} className='text-emerald-500' />
                </div>
                <div className='mt-2 font-semibold text-sm'>
                    KHOA NỘI TỔNG HỢP
                </div>
                <div className='text-xs font-semibold text-gray-500 mt-1'>
                    BSCKI. Nguyễn Văn A
                </div>
            </div>

            {/* Menu */}
            <div className='space-y-1 text-sm'>
                <button className='flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-100'>
                    <KeyRound size={16} className='text-emerald-600' />
                    <span>Chứng thư số</span>
                </button>
                <button className='flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-100'>
                    <Printer size={16} className='text-emerald-600' />
                    <span>In ấn</span>
                </button>
                <button className='flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-100'>
                    <Settings size={16} className='text-emerald-600' />
                    <span>Cài đặt</span>
                </button>
                <button className='flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-100 text-red-600'>
                    <LogOut size={16} />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </div>
    );
}
