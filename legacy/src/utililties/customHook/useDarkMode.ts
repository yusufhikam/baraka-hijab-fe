import { useContext } from "react";
import ThemeContext, { ThemeContextType } from "../../context/ThemeContext";

const useDarkMode = (): ThemeContextType => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useDarkMode must be used within a ThemeProvider');
    }

    return context;
}

export default useDarkMode;