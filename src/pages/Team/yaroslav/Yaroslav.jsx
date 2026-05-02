import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import './Yaroslav.css';

export default function Yaroslav() {
    const navigate = useNavigate();
    const [outputLines, setOutputLines] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const outputEndRef = useRef(null);
    const inputRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const lineTimeoutsRef = useRef([]);

    const scanLines = [
        "user@system:~$ initiating scan...",
        "loading neural profile...",
        "AI connection established",
        "AI: scanning identity structure",
        "AI: pattern detected → ANALYST / BUILDER",
        "AI: emotional stability → stable",
        "AI: creativity index → HIGH",
        "",
        "SKILLS MATRIX LOADED",
        "C++ → compilation in progress",
        "МАТАН → in process",
        "FOCUS 60%",
        "PROCRASTINATION 90%",
        "COFFEE LEVEL: 101% (organism overclocked)",
        "",
        "ERROR: motivation.exe not found",
        "SYSTEM: compiling future developer",
        "ACCESS GRANTED"
    ];

    // Автоскролл
    useEffect(() => {
        if (outputEndRef.current) {
            outputEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [outputLines]);

    // Очистка таймеров при размонтировании
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            lineTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
        };
    }, []);

    const typeLine = useCallback((line, index, onComplete) => {
        let chars = '';
        let i = 0;

        const interval = setInterval(() => {
            if (i < line.length) {
                chars += line[i];
                setOutputLines(prev => {
                    const newLines = [...prev];
                    newLines[index] = chars;
                    return newLines;
                });
                i++;
            } else {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, 20);

        return interval;
    }, []);

    const startScan = useCallback(() => {
        if (isScanning) return;

        lineTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
        lineTimeoutsRef.current = [];

        setIsScanning(true);
        setOutputLines([]);
        setShowInput(false);

        let currentIndex = 0;

        const processNextLine = () => {
            if (currentIndex >= scanLines.length) {
                setOutputLines(prev => [...prev, 'AI: subject fully integrated into system']);
                setTimeout(() => {
                    setOutputLines(prev => [...prev, 'AI: monitoring active... caffeine overload detected']);
                    setShowInput(true);
                    setIsScanning(false);
                    setTimeout(() => inputRef.current?.focus(), 100);
                }, 300);
                return;
            }

            setOutputLines(prev => [...prev, '']);
            const interval = typeLine(scanLines[currentIndex], currentIndex, () => {
                currentIndex++;
                const timeout = setTimeout(processNextLine, 100);
                lineTimeoutsRef.current.push(timeout);
            });

            lineTimeoutsRef.current.push(interval);
        };

        processNextLine();
    }, [isScanning, typeLine]);

    const handleInput = useCallback((e) => {
        if (e.key !== 'Enter') return;

        const userMessage = inputValue.trim();
        if (!userMessage) return;

        setOutputLines(prev => [...prev, `> ${userMessage}`]);

        let aiResponse = '';
        const v = userMessage.toLowerCase();

        if (v.includes('who am i')) {
            aiResponse = 'AI: you are Yaroslav, system analyst prototype';
        } else if (v.includes('skills')) {
            aiResponse = 'AI: C++ compiling, МАТАН (Математический анализ) in process, cognitive systems active';
        } else if (v.includes('where am i')) {
            aiResponse = 'AI: Земля, 2026, Россия, Екатеринбург, УрФУ, Матмех';
        } else if (v.includes('my team')) {
            aiResponse = 'AI: Костарев Владимир, Барышев Андрей, Колеватых Андрей, Коколев Олег';
        } else if (v.includes('coffee')) {
            aiResponse = 'AI: caffeine level detected at 101% — organism running in overclock mode';
        } else if (v.includes('status')) {
            aiResponse = 'AI: system stable, caffeine overload stable, humor module enabled';
        } else if (v.includes('help')) {
            aiResponse = 'AI: try "who am i", "where am i", "my team", "skills", "coffee"';
        } else if (v.includes('joke')) {
            aiResponse = 'AI: why programmers prefer dark mode? because light attracts bugs';
        } else {
            aiResponse = 'AI: command not recognized, but system is stable';
        }

        setOutputLines(prev => [...prev, aiResponse]);
        setInputValue('');

        setTimeout(() => inputRef.current?.focus(), 50);
    }, [inputValue]);

    return (
        <div className="yaroslav-page">
            <div className="terminal">
                <div className="button-group">
                    <button
                        className={`scan-btn ${!isScanning && outputLines.length === 0 ? 'blinking' : ''}`}
                        onClick={startScan}
                        disabled={isScanning}
                    >
                        ▶ RUN FULL SYSTEM SCAN
                    </button>

                    <button
                        className="yaroslav-back-btn"
                        onClick={() => navigate('/')}
                    >
                        ← BACK TO HOME
                    </button>
                </div>

                <div className={`scan-area ${isScanning ? 'visible' : 'hidden'}`}>
                    <div className="scan-frame">
                        <img
                            src="/yaroslav.jpg"
                            alt="scan"
                            className="scan-image"
                        />
                        <div className="scan-line"></div>
                    </div>
                </div>

                <div className="output-area">
                    {outputLines.map((line, idx) => (
                        <div
                            key={idx}
                            className={`output-line ${line?.startsWith('AI:') ? 'ai-line' : ''} ${line === 'AI: subject fully integrated into system' ? 'glitch' : ''}`}
                        >
                            {line || <span className="empty-line"> </span>}
                        </div>
                    ))}
                    <div ref={outputEndRef}/>
                </div>

                {showInput && (
                    <div className="input-box">
                        <div className="input-label">AI READY &gt; TYPE COMMAND</div>
                        <input
                            ref={inputRef}
                            type="text"
                            className="user-input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleInput}
                            placeholder="ask ai..."
                            autoFocus
                        />
                    </div>
                )}
            </div>
        </div>
    );
}