import Layout from '../../../components/Layout';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import './Barkos.css';

export default function Barkos() {
    const navigate = useNavigate();

    // ============ КОНФИГУРАЦИЯ ЦИКЛА СТАТУСОВ ============
    const statusSequence = [
        {
            id: "active",
            systemText: "SYSTEM ACTIVE",
            systemLed: "green",
            userStatus: "ACTIVE",
            duration: 10000,
            borderColor: "#00ff88"
        },
        {
            id: "offline",
            systemText: "SYSTEM OFFLINE",
            systemLed: "gray",
            userStatus: "OFFLINE",
            duration: 5000,
            borderColor: "#888888"
        },
        {
            id: "booting",
            systemText: "SYSTEM BOOTING",
            systemLed: "orange",
            userStatus: "BOOTING...",
            duration: 15000,
            borderColor: "#ff8800"
        },
        {
            id: "pending",
            systemText: "SYSTEM PENDING",
            systemLed: "yellow",
            userStatus: "PENDING...",
            duration: 10000,
            borderColor: "#ffcc00"
        }
    ];

    const [statusIndex, setStatusIndex] = useState(0);
    const currentStatus = statusSequence[statusIndex];

    // Эффект для автоматической смены статусов
    useEffect(() => {
        const timer = setTimeout(() => {
            setStatusIndex((prevIndex) => (prevIndex + 1) % statusSequence.length);
        }, currentStatus.duration);

        return () => clearTimeout(timer);
    }, [statusIndex, currentStatus.duration]);

    // ============ ДАННЫЕ ПРОФИЛЯ ============
    const profileData = {
        name: "Andrey Baryshev (Barkos)",
        title: "Backend Developer / Java / C++",
        avatar: "/barkos.png",

        mainQuote: {
            icon: "✈️",
            text: "Сети и серверы — моя взлётная полоса, каждый проект — новый полёт"
        },
        footerQuote: "Фундаментальная часть IT — моя стихия",

        skills: [
            { name: "🖥️ Networking", percent: 88 },
            { name: "🐧 Linux", percent: 82 },
            { name: "🚀 DevOps", percent: 75 },
            { name: "💻 C++ / Go", percent: 70 }
        ],

        hobbies: [
            { icon: "✈️", title: "Авиация", description: "Мечтал быть пилотом. Сейчас — авиационный программист" },
            { icon: "🏎️", title: "Автоспорт", description: "Ралли, Formula 1, телеметрия — моя вторая жизнь" },
            { icon: "🖥️", title: "Сети и серверы", description: "Коммутаторы, маршрутизация, Linux from scratch" }
        ],

        systemInfo: {
            timezone: "UTC+5 • EKAT"
        }
    };

    return (
        <Layout>
            <div className="barkos-page">
                <div className="dashboard" style={{ borderColor: currentStatus.borderColor }}>
                    <button className="barkos-back-btn" onClick={() => navigate('/')}>
                        ← BACK TO HOME
                    </button>

                    <div className="dashboard-header">
                        <div className="header-left">
                            <span className={`status-led ${currentStatus.systemLed} pulse`}></span>
                            <span className="status-text" style={{ color: currentStatus.borderColor }}>
                                {currentStatus.systemText}
                            </span>
                        </div>
                        <div className="header-right">
                            <span className="time">{profileData.systemInfo.timezone}</span>
                        </div>
                    </div>

                    <div className="dashboard-main">
                        <div className="avatar-section">
                            <div className="avatar-frame" style={{ borderColor: currentStatus.borderColor, boxShadow: `0 0 20px ${currentStatus.borderColor}80` }}>
                                <img src={profileData.avatar} alt={profileData.name} />
                            </div>
                            <div className={`status-badge ${currentStatus.id}`}>
                                <span className="dot" style={{ backgroundColor: currentStatus.borderColor }}></span>
                                {currentStatus.userStatus}
                            </div>
                        </div>

                        <div className="info-section">
                            <h1 className="name">{profileData.name}</h1>
                            <p className="title" style={{ color: currentStatus.borderColor }}>{profileData.title}</p>

                            <div className="quote-block" style={{ borderLeftColor: currentStatus.borderColor }}>
                                <span className="quote-icon">{profileData.mainQuote.icon}</span>
                                <p className="quote">"{profileData.mainQuote.text}"</p>
                            </div>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="skills-section">
                        {profileData.skills.map((skill, index) => (
                            <div className="skill" key={index}>
                                <span className="skill-name">{skill.name}</span>
                                <div className="progress-bar">
                                    <div
                                        className="progress"
                                        style={{ width: `${skill.percent}%`, backgroundColor: currentStatus.borderColor }}
                                    ></div>
                                </div>
                                <span className="skill-percent" style={{ color: currentStatus.borderColor }}>
                                    {skill.percent}%
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="hobbies-section">
                        {profileData.hobbies.map((hobby, index) => (
                            <div className="hobby-card" key={index}>
                                <span className="hobby-icon">{hobby.icon}</span>
                                <div>
                                    <h3>{hobby.title}</h3>
                                    <p>{hobby.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}