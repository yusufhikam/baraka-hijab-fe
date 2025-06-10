import React, { createContext, useEffect, useState } from "react";

export type ThemeContextType = {
    isDarkMode: boolean,
    toggleTheme: () => void
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderType = {
    children: React.ReactNode,
}

export const ThemeProvider = ({ children }: ThemeProviderType) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    const toggleTheme = () => setIsDarkMode((prev) => {
        const newTheme = !prev;

        localStorage.setItem('theme', newTheme ? 'dark' : 'light');

        return newTheme;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode])

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}


export default ThemeContext;