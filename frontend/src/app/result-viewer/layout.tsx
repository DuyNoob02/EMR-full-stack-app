
import type { Metadata } from "next";
import '../globals.css';
export const metadata: Metadata = {
  title: "Kết quả cận lâm sàng",
  description: "Trang xem kết quả xét nghiệm PDF cho bệnh nhân"
};
export default function ResultViewerLayout({
  children,
}: {  children: React.ReactNode }) {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      {/* <h2>Result Viewer</h2> */}
      <div>{children}</div>
    </div>
  );
}