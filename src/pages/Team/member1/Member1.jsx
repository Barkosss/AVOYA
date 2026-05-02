import styles from './Member1.module.css';
import Layout from '../../../components/Layout';

export default function Member1() {
    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Avatar"
                        className={styles.avatar}
                    />
                    <h1 className={styles.name}>Имя Участника 1</h1>
                    <p className={styles.role}>Frontend Developer</p>
                </div>

                <div className={styles.section}>
                    <h2>📋 Обо мне</h2>
                    <p>
                        Привет! Я разработчик с опытом работы в создании веб-приложений.
                        Люблю React, JavaScript и создавать крутые интерфейсы.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2>🎯 Навыки</h2>
                    <div className={styles.skills}>
                        <span className={styles.skill}>React</span>
                        <span className={styles.skill}>JavaScript</span>
                        <span className={styles.skill}>HTML/CSS</span>
                        <span className={styles.skill}>Git</span>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>📞 Контакты</h2>
                    <ul className={styles.contacts}>
                        <li>📧 email@example.com</li>
                        <li>💻 GitHub: /username</li>
                        <li>📱 Telegram: @username</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2>🏆 Мои проекты</h2>
                    <div className={styles.projects}>
                        <div className={styles.card}>
                            <h3>Проект 1</h3>
                            <p>Описание проекта, технологии и результат</p>
                        </div>
                        <div className={styles.card}>
                            <h3>Проект 2</h3>
                            <p>Описание проекта, технологии и результат</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}