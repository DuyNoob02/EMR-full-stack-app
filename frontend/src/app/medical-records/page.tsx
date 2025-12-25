import DashboardCard from '../../components/ui/DashboardCard';
import { ClipboardList, Hospital } from 'lucide-react';

export const metadata = {
    title: "Bệnh án",
};
export default function MedicalRecordsPage() {
  return (
    <div className='grid grid-cols-6 gap-4 p-1'>
      <DashboardCard title="Danh sách người bệnh tại khoa" href="medical-records/patient-manager" icon={<ClipboardList size={20} />} />
      <DashboardCard title="Danh sách người bệnh xuất viện" href="/patient-manager" icon={<Hospital size={20} />} />
    </div>
  );
}
