import { useState, useEffect, useRef } from 'react';
import './ThemeToggle.css';

export default function ThemeToggle({ theme, setTheme }) {
    const [isOpen, setIsOpen] = useState(false);
    const [colorTheme, setColorTheme] = useState(localStorage.getItem("colorTheme") || "blue");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const longPressTimerRef = useRef(null);
    const toggleRef = useRef(null);

    // Отслеживаем ширину экрана для мобильной версии
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Применяем цветовую тему
    useEffect(() => {
        document.documentElement.setAttribute('data-color-theme', colorTheme);
        localStorage.setItem("colorTheme", colorTheme);
    }, [colorTheme]);

    // Закрываем меню ТОЛЬКО при клике вне его
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (toggleRef.current && !toggleRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]); // Добавляем isOpen в зависимости

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
        // Убираем setIsOpen(false) - меню НЕ закрывается
    };

    const changeColorTheme = (color) => {
        setColorTheme(color);
        // Убираем setIsOpen(false) - меню НЕ закрывается
    };

    // Обработчики для мобильного long press
    const handleTouchStart = (e) => {
        if (isMobile) {
            longPressTimerRef.current = setTimeout(() => {
                setIsOpen(true);
            }, 500);
        }
    };

    const handleTouchEnd = () => {
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
    };

    const handleClick = (e) => {
        if (isMobile) {
            toggleTheme();
        }
    };

    // Цветовые схемы
    const colorSchemes = [
        { name: "Синий", value: "blue", color: "#007aff", icon: "🎨" },
        { name: "Красный", value: "red", color: "#ff3b30", icon: "🎨" },
        { name: "Оранжевый", value: "orange", color: "#ff9500", icon: "🎨" },
        { name: "Зелёный", value: "green", color: "#34c759", icon: "🎨" },
        { name: "Фиолетовый", value: "purple", color: "#af52de", icon: "🎨" },
        { name: "Розовый", value: "pink", color: "#ff2d55", icon: "🎨" }
    ];

    return (
        <div
            className="theme-toggle-container"
            ref={toggleRef}
            onMouseEnter={() => !isMobile && setIsOpen(true)}
            onMouseLeave={() => !isMobile && setIsOpen(false)}
        >
            {/* Основная кнопка */}
            <button
                className={`theme-toggle-button ${isOpen ? 'active' : ''}`}
                onClick={isMobile ? handleClick : toggleTheme}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                title={isMobile ? "Короткое нажатие - смена темы, долгое нажатие - дополнительные настройки" : "Наведите для доп. настроек"}
            >
                <span className="theme-icon">
                    {theme === "light" ? "☀️" : "🌙"}
                </span>
            </button>

            {/* Дополнительные настройки */}
            {isOpen && (
                <div className="theme-dropdown">
                    <div className="dropdown-header">
                        <span>Настройки темы</span>
                    </div>

                    {/* Переключение светлой/тёмной темы */}
                    <div className="dropdown-section">
                        <div className="section-title">Режим</div>
                        <div className="mode-switch">
                            <button
                                className={`mode-btn ${theme === "light" ? "active" : ""}`}
                                onClick={() => setTheme("light")}
                            >
                                ☀️ Светлая
                            </button>
                            <button
                                className={`mode-btn ${theme === "dark" ? "active" : ""}`}
                                onClick={() => setTheme("dark")}
                            >
                                🌙 Тёмная
                            </button>
                        </div>
                    </div>

                    {/* Выбор цветовой схемы */}
                    <div className="dropdown-section">
                        <div className="section-title">Акцентный цвет</div>
                        <div className="color-grid">
                            {colorSchemes.map(scheme => (
                                <button
                                    key={scheme.value}
                                    className={`color-option ${colorTheme === scheme.value ? 'active' : ''}`}
                                    style={{ backgroundColor: scheme.color }}
                                    onClick={() => changeColorTheme(scheme.value)}
                                    title={scheme.name}
                                >
                                    {colorTheme === scheme.value && "✓"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Подсказка для мобильных устройств */}
                    {isMobile && (
                        <div className="mobile-hint">
                            💡 Долгое нажатие для открытия меню
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}