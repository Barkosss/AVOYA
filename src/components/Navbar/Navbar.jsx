import './Navbar.css';
import {Link, useLocation} from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import {useEffect, useState} from "react";

export default function Navbar() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { path: "/", label: "Главная", icon: "🏠" },
        { path: "/fun", label: "Приколы", icon: "🎁" }
        // { path: "/rules", label: "Правила", icon: "📋" },
        // { path: "/faq", label: "FAQ", icon: "❓" },
        // { path: "/collaboration", label: "Сотрудничество", icon: "🤝" }
    ];

    const isActive = (path) => location.pathname === path;

    // Десктопная версия
    if (!isMobile) {
        return (
            <nav className="navbar">
                <div className="navbar-right">
                    {navItems.map(item => (
                        <Link to={item.path} key={item.path}>
                            <div className={`nav-item ${isActive(item.path) ? 'active' : ''}`}>
                                {item.label}
                            </div>
                        </Link>
                    ))}
                    <ThemeToggle theme={theme} setTheme={setTheme}/>
                </div>
            </nav>
        );
    }

    // Мобильная версия (нижняя панель в стиле Telegram)
    return (
        <>
            {/* Десктопный навбар скрыт, показываем только контент */}
            <div className="bottom-nav">
                <div className="bottom-nav-inner">
                    {navItems.map(item => (
                        <Link to={item.path} key={item.path} className={`bottom-nav-item ${isActive(item.path) ? 'active' : ''}`}>
                            <span className="bottom-nav-icon">{item.icon}</span>
                            {/*<span className="bottom-nav-label">{item.label}</span>*/}
                        </Link>
                    ))}
                    {/* Кнопка темы в мобильной версии (можно убрать, если лишняя) */}
                    <div className="bottom-nav-item theme-mobile">
                        <ThemeToggle theme={theme} setTheme={setTheme}/>
                    </div>
                </div>
            </div>
        </>
    );
}
