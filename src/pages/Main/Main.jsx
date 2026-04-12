import Layout from "../../components/Layout";
import {useState} from "react";
import "./Main.css";
import MemberModal from "../Team/MemberModal";

export const teamMembers = [
    {
        id: 1,
        name: "Андрей",
        role: "Junior Developer",
        emoji: "🌱",
        shortBio: "Постоянно учусь и развиваюсь в IT",
        fullBio: "Начинающий разработчик с годичным опытом изучения Java и активной работой с Go, Python и React. Интересуюсь архитектурой приложений и созданием удобных интерфейсов. Увлекается разработкой собственных проектов для автоматизации задач.",
        funFact: "Хочет написать интерпретатор для C++",
        color: "#0074b3",
        achievements: ["Изучаю Java, C++, Go", "Разрабатываю приложения"]
    },
    {
        id: 2,
        name: "Владимир",
        role: "UI/UX Designer",
        emoji: "🎨",
        shortBio: "Создаёт красивые интерфейсы",
        fullBio: "Елена отвечает за визуальную часть. Имеет 5 лет опыта в разработке интерфейсов и 3 года в дизайне.",
        funFact: "Может отличить 50 оттенков синего",
        color: "#ff9500",
        achievements: ["20+ дизайн-проектов", "2 премии", "7 лет творчества"]
    },
    {
        id: 3,
        name: "Олег",
        role: "Backend Dev",
        emoji: "⚙️",
        shortBio: "Строит надёжные сервера",
        fullBio: "Михаил занимается бэкендом и DevOps. Специалист по Python, Django и Docker.",
        funFact: "Пьёт только чёрный кофе без сахара",
        color: "#34c759",
        achievements: ["50+ API", "99.9% аптайм", "8 лет опыта"]
    },
    {
        id: 4,
        name: "Ярик",
        role: "QA Engineer",
        emoji: "🔍",
        shortBio: "Находит баги везде",
        fullBio: "Анна отвечает за качество продукта. Автоматизирует тесты и ведёт документацию.",
        funFact: "Нашла баг в приложении банка и получила бонус",
        color: "#af52de",
        achievements: ["1000+ багов найдено", "5 лет тестирования", "Автоматизация 80%"]
    },
    {
        id: 5,
        name: "Андрей",
        role: "Mobile Dev",
        emoji: "📱",
        shortBio: "Делает мобильные приложения",
        fullBio: "Дмитрий разрабатывает мобильные приложения под iOS и Android. Эксперт в React Native и Flutter.",
        funFact: "Имеет 5 смартфонов для тестирования",
        color: "#ff3b30",
        achievements: ["15+ приложений", "1 млн скачиваний", "6 лет опыта"]
    }
];

export default function Main() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' или 'list'

    const getRandomRotation = () => {
        return Math.random() * 4 - 2; // от -2 до 2 градусов
    };

    return (
        <Layout>
            <div className="team-page">
                <div className="team-header">
                    <h1 className="team-title">
                        <span className="title-icon">👥</span>
                        Наша команда
                    </h1>
                    <p className="team-description">
                        Познакомьтесь с нашей дружной командой 👇
                    </p>

                    {/* Переключатель вида */}
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
                        <div
                            key={member.id}
                            className="team-folder"
                            onClick={() => setSelectedMember(member)}
                            style={{
                                '--folder-color': member.color,
                                transform: `rotate(${getRandomRotation()}deg)`
                            }}
                        >
                            <div className="folder-icon">
                                <div className="folder-front" style={{backgroundColor: member.color}}>
                                    <span className="folder-emoji">{member.emoji}</span>
                                </div>
                                <div className="folder-back" style={{backgroundColor: member.color}}></div>
                            </div>
                            <div className="folder-info">
                                <h3 className="folder-name">{member.name}</h3>
                                <p className="folder-role">{member.role}</p>
                                <p className="folder-bio">{member.shortBio}</p>
                            </div>
                            <div className="folder-hint">
                                <span>📂 Открыть папку</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Модальное окно */}
                {selectedMember && (
                    <MemberModal
                        member={selectedMember}
                        onClose={() => setSelectedMember(null)}
                    />
                )}
            </div>
        </Layout>
    );
}
