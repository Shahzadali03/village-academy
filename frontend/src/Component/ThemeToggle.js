import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '', floating = false }) => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            className={`theme-toggle ${floating ? 'theme-toggle-floating' : ''} ${className}`.trim()}
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
        >
            {isDark ? <FaSun /> : <FaMoon />}
        </button>
    );
};

export default ThemeToggle;
