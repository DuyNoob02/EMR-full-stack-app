// import Breadcrumbs from "../../../components/ui/Breadcrumb";

export const metadata = {
  title: "Danh sách bệnh nhân đang điều trị",
};
export default function PatientManagerLayout({ children }) {

  return (
    <div className="px-2">
      {/* <Breadcrumbs /> */}
      {children}
    </div>
  );
}
