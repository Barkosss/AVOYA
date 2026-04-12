import React, { useEffect } from 'react';
import './MemberModal.css';

export default function MemberModal({ member, onClose }) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    const handleEasterEgg = () => {
        const messages = [
            "🎉 Ты нашёл пасхалку!",
            "🍪 Вот тебе печенька!",
            "⚡ Ты кликнул по секретной кнопке!",
            "🌟 Ты особенный!",
            "💎 +10 к карме!"
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        alert(randomMessage);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ borderTopColor: member.color }}>
                <button className="modal-close" onClick={onClose}>✕</button>

                <div className="modal-header">
                    <div className="modal-emoji" style={{ background: `${member.color}20` }}>
                        <span>{member.emoji}</span>
                    </div>
                    <h2>{member.name}</h2>
                    <p className="modal-role" style={{ color: member.color }}>{member.role}</p>
                </div>

                <div className="modal-body">
                    <div className="modal-section">
                        <h3>📖 Обо мне</h3>
                        <p>{member.fullBio}</p>
                    </div>

                    <div className="modal-section">
                        <h3>🎯 Достижения</h3>
                        <div className="achievements-list">
                            {member.achievements.map((achievement, idx) => (
                                <span key={idx} className="achievement-badge" style={{ background: `${member.color}15`, color: member.color }}>
                                    {achievement}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="modal-section">
                        <h3>✨ Интересный факт</h3>
                        <div className="fun-fact" style={{ background: `${member.color}10`, borderLeftColor: member.color }}>
                            {member.funFact}
                        </div>
                    </div>

                    {/* Кнопка с приколом */}
                    <button className="easter-egg-btn" onClick={handleEasterEgg}>
                        🎁 Нажми на меня!
                    </button>
                </div>
            </div>
        </div>
    );
}