'use client';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface DashboardCardProps {
    title: string;
    href: string;
    icon: ReactNode;
}

export default function DashboardCard({
    title,
    href,
    icon,
}: DashboardCardProps) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(href)}
            className="cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 flex items-center gap-4">
            <div className=" w-14 h-14 rounded-md bg-emerald-500 flex items-center justify-center text-white">
                {icon}
            </div>

            <div className="text-sm font-medium text-gray-800">
                {title}
            </div>
        </div>
    );
}
