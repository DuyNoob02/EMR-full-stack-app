'use client';

import React from 'react';

export default function ViewPdfPage(props: {
  params: Promise<{ filename: string }>;
}) {
  // Giải Promise params bằng React.use()
  const { filename } = React.use(props.params);

  const decodedFileName = decodeURIComponent(filename);
  // File trong public/results được truy cập qua /results/filename
  const fileUrl = `/results/${decodedFileName}`;

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="bg-gray-800 text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Xem PDF: {decodedFileName}</h1>
        <p className="text-sm text-gray-300 mt-1">Đường dẫn: {fileUrl}</p>
      </div>

      <div className="flex-1 bg-gray-100">
        <iframe
          src={fileUrl}
          width="100%"
          height="100%"
          title={`PDF Viewer - ${decodedFileName}`}
          className="border-0"
        />
      </div>
    </div>
  );
}
