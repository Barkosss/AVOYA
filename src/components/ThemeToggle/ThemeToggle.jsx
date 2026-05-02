import { useState, useEffect, useRef } from 'react';
import './ThemeToggle.css';

export default function ThemeToggle({ theme, setTheme }) {
    const [isOpen, setIsOpen] = useState(false);
    const [colorTheme, setColorTheme] = useState(localStorage.getItem("colorTheme") || "blue");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const longPressTimerRef = useRef(null);
    const toggleRef = useRef(null);
    const hideTimeoutRef = useRef(null); // таймер для отложенного закрытия

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

    // Очистка таймера при размонтировании
    useEffect(() => {
        return () => {
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        };
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const changeColorTheme = (color) => {
        setColorTheme(color);
    };

    // Открыть меню с отменой закрытия
    const handleMouseEnter = () => {
        if (isMobile) return;
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setIsOpen(true);
    };

    // Закрыть меню с задержкой (даёт время перейти на меню)
    const handleMouseLeave = () => {
        if (isMobile) return;
        hideTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 200); // 200ms задержка
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

    // Закрыть меню при клике вне (с задержкой для мобильных)
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
    }, [isOpen]);

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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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

            {/* Выпадающее меню с мостиком */}
            {isOpen && (
                <>
                    {/* Невидимый мостик-буфер */}
                    <div className="dropdown-bridge" />

                    <div
                        className="theme-dropdown"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
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
                </>
            )}
        </div>
    );
}