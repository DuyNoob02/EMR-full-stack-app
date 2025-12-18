"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NavHistoryContext = createContext({
    history: [],
});

export function NavigationHistoryProvider({ children }) {
    const pathname = usePathname();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!pathname) return;
        setHistory(prev => [...prev, pathname]);
    }, [pathname]);

    return (
        <NavHistoryContext.Provider value={{ history }}>
            {children}
        </NavHistoryContext.Provider>
    );
}

export function useNavigationHistory() {
    return useContext(NavHistoryContext);
}
