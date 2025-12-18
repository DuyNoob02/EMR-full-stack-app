'use client';
import Header from '../components/layout/Header';
import DepartmentSelectorModal from '../components/ui/DepartmentSelectorModal';
import DashboardCard from '../components/ui/DashboardCard';
import { useState } from 'react';
import { FileText, Database, HelpCircle, Building2, User, KeyRound, Printer, Settings, LogOut } from 'lucide-react';
export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  // const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="px-4 py-2 border-b bg-white flex items-center justify-end">
        <Header onOpenDepartmentModal={() => setModalOpen(true)} />
      </div>
      <div className='grid grid-cols-5 gap-4 p-4'>
        <div className='col-span-4'>
          <div className='grid grid-cols-4 gap-4'>
            <DashboardCard title="Bệnh án" href="/medical-records" icon={<FileText size={20} />} />
            <DashboardCard title="Kho giám định" href="/patient-manager" icon={<Database size={20} />} />
            <DashboardCard title="Xem PDF mẫu" href="/" icon={<Building2 size={20} />} />
            <DashboardCard title="Trợ giúp" href="/help-page" icon={<HelpCircle size={20} />} />
          </div>
        </div>
        <div className='col-span-1'>
          {/* user profile */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            {/* Avatar */}
            <div className='flex flex-col items-center text-center mb-4'>
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl mb-2">
                <User size={40} className='text-emerald-500' />
              </div>
              <div className='mt-3 font-semibold text-sm'>KHOA NỘI TỔNG HỢP</div>
              <div className='text-xs font-semibold text-gray-500 mt-1'>BSCKI. Nguyễn Văn A</div>
            </div>
            {/* Menu */}
            <div className='space-y-2 text-sm'>
              <button className='flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-100 transition'>
                <KeyRound size={16} className='text-emerald-600'/>
                <span>Chứng thư số</span>
              </button>
              <button className='flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-100 transition'>
                <Printer size={16} className='text-emerald-600'/>
                <span>In ấn</span>
              </button>
              <button className='flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-100 transition'>
                <Settings size={16} className='text-emerald-600'/>
                <span>Cài đặt</span>
              </button>
              <button className='flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-100 transition text-red-600'>
                <LogOut size={16} />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <DepartmentSelectorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={() => { }} // Không cần, localStorage xử lý rồi
      />
    </div>
  );
}