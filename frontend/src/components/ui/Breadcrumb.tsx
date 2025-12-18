"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import breadcrumbTitles from "../../app/config/breadcrumbTitles";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    const crumbs = [
        { title: "Trang chủ", href: "/" },
        ...segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const title = breadcrumbTitles[segment] || segment;
            return { title, href };
        })
    ];

    return (
        <nav className="flex items-center text-sm text-gray-700 ">
            {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;

                return (
                    <div key={crumb.href} className="flex items-center">
                        {index > 0 && (
                            <span className="mx-2 text-gray-400">/</span>
                        )}

                        {isLast ? (
                            <span className="font-semibold text-gray-900 whitespace-nowrap">
                                {crumb.title}
                            </span>
                        ) : (
                            <Link
                                href={crumb.href}
                                className="text-gray-600 hover:underline whitespace-nowrap"
                            >
                                {crumb.title}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
