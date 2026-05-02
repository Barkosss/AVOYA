import Layout from "../../components/Layout";
import { Link } from "react-router";
import { useState } from "react";
import "./Main.css";

export const teamMembers = [
    {
        id: 1,
        name: "Андрей",
        link: "/team/barkos",
        role: "Backend Developer",
        emoji: "🖥️",
        shortBio: "Постоянно учусь и развиваюсь в IT",
        color: "#095883"
    },
    {
        id: 2,
        name: "Владимир",
        link: "/team/vova",
        role: "Когда матрица не фильм, а алгем...",
        emoji: "✉️",
        shortBio: "Для вас слово \"незачёт\" и слово \"смерть\" означают одно и то же.",
        color: "#bb7109"
    },
    {
        id: 3,
        name: "Олег",
        link: "/team/oleg",
        role: "Backend Developer",
        emoji: "⚙️",
        shortBio: "Строю надёжные серверные решения",
        color: "#2d9346"
    },
    {
        id: 4,
        name: "Ярик",
        link: "/team/krakin",
        role: "QA Engineer",
        emoji: "💿",
        shortBio: "Нахожу баги там, где их никто не ждёт",
        color: "#8342a3"
    },
    {
        id: 5,
        name: "Андрей",
        link: "/team/snails",
        role: "Mobile Developer",
        emoji: "📕",
        shortBio: "Создаю приложения, которыми пользуются",
        color: "#b5302a"
    }
];

export default function Main() {
    const [viewMode, setViewMode] = useState('grid');

    const getRandomRotation = () => {
        return Math.random() * 4 - 2;
    };

    return (
        <Layout>
            <div className="team-page">
                <div className="team-header">
                    <h1 className="team-title">
                        Наша команда
                    </h1>

                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            🧩 Плитки
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            📋 Список
                        </button>
                    </div>
                </div>

                <div className={`team-container ${viewMode}`}>
                    {teamMembers.map(member => (
                        <Link to={member.link} key={member.id} className="team-folder-link">
                            <div
                                className="team-folder"
                                style={{
                                    '--folder-color': member.color,
                                    transform: `rotate(${getRandomRotation()}deg)`
                                }}
                            >
                                <div className="folder-icon">
                                    <div className="folder-front" style={{ backgroundColor: member.color }}>
                                        <span className="folder-emoji">{member.emoji}</span>
                                    </div>
                                    <div className="folder-back" style={{ backgroundColor: member.color }}></div>
                                </div>
                                <div className="folder-info">
                                    <h3 className="folder-name">{member.name}</h3>
                                    <p className="folder-role">{member.role}</p>
                                    <p className="folder-bio">{member.shortBio}</p>
                                </div>
                                <div className="folder-hint">
                                    <span>📂 Открыть страницу</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
}