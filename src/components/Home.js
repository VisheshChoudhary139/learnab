import React, { useState } from "react";
import "./Home.css";
import LessonPage from "./LessonPage";
import Speech from "./Speech";
import Vocabulary from "./Vocabulary";
import Quizzes from "./Quizzes";
import Progress from "./Progress";
import Auth from "./Auth";



const Home = () => {
    const [currentPage, setCurrentPage] = useState("home");

    const renderPage = () => {
        switch (currentPage) {
            case "lesson":
                return <LessonPage/>;
            case "speech":
                return <Speech/>;
            case "games":
                return <Vocabulary/>;
            case "quizzes":
                return <Quizzes/>;
            case "progress":
                return <Progress/>;
            case "auth":
                return <Auth/>;
            default:
                return (
                    <div className="home-page">
                    <div className="home-container">
                        <div className="hero-section">
                            <div className="hero-overlay-text">
                                <p className="hero-description">Unlock the power of language with our multi-modal
                                    learning app!
                                    Whether you learn best by listening, speaking, reading, or visualizing, we’ve got
                                    you
                                    covered!</p>
                                <p>As Deadpool said ~</p>
                                <h1>Maximum Effort</h1>
                            </div>
                            <div className="hero-section-container">
                                <div className="marquee">
                                    <div
                                        data-text="Bonjour Venezia शुभप्रभात История 문화 希望 探索 Luce 成功 도전 Toscana 사랑 Cultura 성공 梦 未来 Genova विश्व Lebensfreude Москва 创造 Verità Napoli Kreml Avventura Bonjour Venezia शुभप्रभात История 문화 希望 探索 Luce 成功 도전 Toscana 사랑 Cultura 성공 梦 未来 Genova विश्व Lebensfreude Москва 创造 Verità Napoli Kreml Avventura"></div>
                                </div>
                                <div className="marquee">
                                    <div
                                        data-text="你好 Prego मित्र Москва 詩歌 سفر 광장 希望 정열 Balalayka 学問 Amico 未来 강산 نیکبختی Vento Chanson 日本 성장 Poésie Вдохновение Sicilia 유산 Torino 사랑 여행 你好 Prego मित्र Москва 詩歌 سفر 광장 希望 정열 Balalayka 学問 Amico 未来 강산 نیکبختی Vento Chanson 日本 성장 Poésie Вдохновение Sicilia 유산 Torino 사랑 여행"></div>
                                </div>
                                <div className="marquee">
                                    <div
                                        data-text="Gracias संगीत Россия 和平 Liberté 芸術 Udaça عشق 도시 Avventura 月亮 Napoli دنیا آرامش Mare 笑顔 전통 꿈 Torino إبداع Creazione 友情 Verità 希望 運命 知識 Gracias संगीत Россия 和平 Liberté 芸術 Udaça عشق 도시 Avventura 月亮 Napoli دنیا آرامش Mare 笑顔 전통 꿈 Torino إبداع Creazione 友情 Verità 希望 運命 知識"></div>
                                </div>
                                <div className="marquee">
                                    <div
                                        data-text="Benvenuto धर्म 사랑 愛 Montagna 希望 История Bello 山 Genova 학교 Дружба Torino अवसर 光 Philosophie 未来 연구 Байкал Plaisir 풍경 전통 Légende 希望 Inspiración Benvenuto धर्म 사랑 愛 Montagna 希望 История Bello 山 Genova 학교 Дружба Torino अवसर 光 Philosophie 未来 연구 Байкал Plaisir 풍경 전통 Légende 希望 Inspiración"></div>
                                </div>
                                <div className="marquee">
                                    <div
                                        data-text="سلام Buongiorno भगवान Toscana 愛 Himalaya Pravda 한강 문화 Luminosité सफलता Мечта 꿈 Свобода संसार Petersburg 笑顔 전통 Chanson Harmony 照明 Crescento Avventura Buongiorno भगवान Toscana 愛 Himalaya Pravda 한강 문화 Luminosité सफलता Мечта 꿈 Свобода संसार Petersburg 笑顔 전통 Chanson Harmony 照明 Crescento Avventura "></div>
                                </div>
                                <div className="marquee">
                                    <div
                                        data-text="안녕하세요 سفر Ciao स्वागत Schönheit Москва Душа 행복 조화 Sole Песня Verità 太阳 친구 Barcelona जन्म Tradizione 光明 순수 夢 想 Artis Milano Crescita Storia 안녕하세요 سفر Ciao स्वागत Schönheit Москва Душа 행복 조화 Sole Песня Verità 太阳 친구 Barcelona जन्म Tradizione 光明 순수 夢 想 Artis Milano Crescita Storia"></div>
                                </div>
                                <div className="marquee">
                                    <div
                                        data-text="Venezia हर्ष Благодать 梦 Freund Liebe Napoli 希望 전망 Plaisir 창조 友情 Milano 宇宙 Torino शक्ति Дорога 平和 Пассия Buongiorno 文化 Armonia 미래 成功 용기 繁栄 Venezia हर्ष Благодать 梦 Freund Liebe Napoli 希望 전망 Plaisir 창조 友情 Milano 宇宙 Torino शक्ति Дорога 平和 Пассия Buongiorno 文化 Armonia 미래 成功 용기 繁栄"></div>
                                </div>
                                <div className="marquee">
                                    <div
                                        data-text="Buongiorno धन्यवाद Samovar تاريخ Vento 서울 希望 Legend शांति Balalayka 빛 Sole روح Montagna 꿈 Москва Cultura Légende 友情 Crescendo 未来 調和 朝陽 光輝 知恵 Buongiorno धन्यवाद Samovar تاريخ Vento 서울 希望 Legend शांति Balalayka 빛 Sole روح Montagna 꿈 Москва Cultura Légende 友情 Crescendo 未来 調和 朝陽 光輝 知恵"></div>
                                </div>
                                <div className="marquee">
                                    <div
                                        data-text="こんにちは Italia प्रिय Amore Avventura Вдохновение 문화 希望 सपना GutenTag Дружба Petersburg 행복 Bello विज्ञान 光 Torino Crescita 友情 유산 日本 未来 照明 こんにちは Italia प्रिय Amore Avventura Вдохновение 문화 希望 सपना GutenTag Дружба Petersburg 행복 Bello विज्ञान 光 Torino Crescita 友情 유산 日本 未来 照明"></div>
                                </div>
                                <div className="marquee">
                                    <div
                                        data-text="Добрыйдень मित्र Genova 希望 Kremlin 사랑 Luminosité Cultura 전통 Liebe Napoli 친구 Avventura Искусство Italia 創造성 विश्व Inspiration 照明 Crescendo 전설 Добрыйдень मित्र Genova 希望 Kremlin 사랑 Luminosité Cultura 전통 Liebe Napoli 친구 Avventura Искусство Italia 創造성 विश्व Inspiration 照明 Crescendo 전설"></div>
                                </div>
                                <div className="marquee">
                                    <div
                                        data-text="Ciao अनुशासन Москва Amour Verità 빛 Napoli 梦想 Montagna संगीत GutenMorgen Kreml 友情 繁荣 Milano 전망 Licht Дорога 希望 Armonia 미래 成功 Crescita 知識 Ciao अनुशासन Москва Amour Verità 빛 Napoli 梦想 Montagna संगीत GutenMorgen Kreml 友情 繁荣 Milano 전망 Licht Дорога 希望 Armonia 미래 成功 Crescita 知識"></div>
                                </div>
                                <div className="marquee">
                                    <div
                                        data-text=" السلام عشق Mare फूल Plaisir Historia 행복 Avventura Milano 希望 Сказка Légende Sole शक्ति 꿈 Torino 光明 Créativité Crescendo 照明 Crescento 知恵 유산السلام عشق Mare फूल Plaisir Historia 행복 Avventura Milano 希望 Сказка Légende Sole शक्ति 꿈 Torino 光明 Créativité Crescendo 照明 Crescento 知恵 유산"></div>
                                </div>
                                <div className="marquee">
                                    <div
                                        data-text="Benvenuto शुभकामनाएँ Россия 도시 Sole Cultura 希望 이야기 Liebe Napoli 전망 Montagna Мечта Sole शांति 빛 Bello Venezia Armonia Crescita 照明 繁栄 光輝 Benvenuto शुभकामनाएँ Россия 도시 Sole Cultura 希望 이야기 Liebe Napoli 전망 Montagna Мечта Sole शांति 빛 Bello Venezia Armonia Crescita 照明 繁栄 光輝"></div>
                                </div>
                                <div className="marquee">
                                    <div
                                        data-text=" 你好 Liebe Toscana 꿈 Samovar 希望 빛 Sole Milano Verità Россия Montagna Москва 친구 友情 Avventura 繁荣 Bello Balalayka Crescendo Inspiration 光明 朝陽 你好 Liebe Toscana 꿈 Samovar 希望 빛 Sole Milano Verità Россия Montagna Москва 친구 友情 Avventura 繁荣 Bello Balalayka Crescendo Inspiration 光明 朝陽"></div>
                                </div>
                            </div>
                            <div className="circle"></div>
                            <img src="trophy.png" alt="Trophy" className="trophy"/>
                        </div>

                        <div className="info-section">
                            <div className="info-text">
                                <h2>How It Works</h2>
                                <p class="home-description">Learn a new language effortlessly with AI-powered
                                    conversations,
                                    interactive exercises, and gamified challenges.</p>
                            </div>
                            <div className="step">
                                <div className="home-icon">1</div>
                                <div className="home-text">
                                    Choose your language <img src="right.png"/>
                                    <span class="home-highlight">"English", "Spanish", "Russian"..</span>
                                    <img src="left.png"/> and skill level <img src="right.png"/><span
                                    class="home-highlight">"Beginner", "Intermediate", "Advanced"</span><img
                                    src="left.png"/>
                                </div>
                            </div>
                            <div className="step">
                                <div className="home-icon">2</div>
                                <div className="home-text">
                                    Engage in AI conversations
                                    <img src="right.png"/>
                                    <span class="home-highlight">"Pronunciation & convo practice"</span>
                                    <img src="left.png"/> and interactive exercises
                                    <img src="right.png"/>
                                    <span class="home-highlight">"Real-life dialogues", "Grammar drills"...</span>
                                    <img src="left.png"/>
                                </div>
                            </div>
                            <div className="step">
                                <div className="home-icon">3</div>
                                <div className="home-text">
                                    Play gamified challenges <img src="right.png"/>
                                    <span class="home-highlight">"Quizzes", "Flashcards"..</span>
                                    <img src="left.png"/>and track progress
                                    <img src="right.png"/>
                                    <span class="home-highlight"> "Leaderboard rankings"</span>
                                    <img src="left.png"/>
                                </div>
                            </div>
                            <div className="step">
                                <div className="home-icon">4</div>
                                <div className="home-text">
                                    Earn rewards <img src="right.png"/>
                                    <span class="home-highlight">"Achievements"</span>
                                    <img src="left.png"/> and level up your fluency
                                    <img src="right.png"/>
                                    <span class="home-highlight">"Badges", "Daily streaks"</span>
                                    <img src="left.png"/>
                                </div>
                            </div>
                        </div>
                        <div className="why-section">
                            <div className="why-text-section">
                                <div className="why-text">
                                    <h2>Why Learning a new language is the most rewarding investments you can make?</h2>
                                    <p className="why-description">Learning a new language is one of the most powerful
                                        investments
                                        you
                                        can make in yourself. It sharpens your mind, enhances problem-solving skills,
                                        and
                                        strengthens
                                        your ability to adapt. It’s a gateway to global opportunities—boosting your
                                        career,
                                        expanding
                                        your connections, and unlocking new cultures. You'll think sharper, earn more,
                                        and
                                        experience
                                        the world in a way few ever will.
                                        Master a new language — unlock a <span
                                            className="why-highlight"> new  world.</span></p>
                                </div>
                            </div>
                            <div className="why-image-section">
                                <img src="languages.png" alt="Languages illustration" className="why-image"/>
                            </div>
                        </div>

                        <div className="home-features">
                            <h2>Why Choose Us?</h2>
                            <div className="home-feature-container">
                                <div className="feature">
                                    <img src="./texting.png" alt="Chatbot Conversations"/>
                                    <h3>AI-Bot Conversations</h3>
                                    <div className="feature-text">
                                        <p>Practice with an AI chatbot and speak fluently like a native.</p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <img src="online-learning.png" alt="Multi-Modal Learning"/>
                                    <h3>Multi-Modal Approach</h3>
                                    <div className="feature-text">
                                        <p>Learn through text, speech, visuals, and interactive exercises.</p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <img src="report.png" alt="AI Progress Report"/>
                                    <h3>Progress Report with AI-Insight</h3>
                                    <div className="feature-text">
                                        <p>Track your learning progress easily with smart AI insights.</p>
                                    </div>
                                </div>

                                <div className="feature">
                                    <img src="arcade-machine.png" alt="Gamified Experience"/>
                                    <h3>Gamified Experience</h3>
                                    <div className="feature-text">
                                        <p>Earn exciting rewards and monitor your daily progress. .</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Customer Reviews */}
                        <section className="customer-reviews">
                            <h2 className="reviews-section-title">What People Say About Us</h2>

                            <div className="reviews-container">
                                <div className="review-card">
                                    <img src="./open.png" alt="Quote Icon" className="quote-icon"/>
                                    <p className="review-text">
                                        "I’ve gained so much knowledge across different subjects, all without feeling
                                        overwhelmed or
                                        discouraged. The multi-modal approach—combining videos, interactive exercises,
                                        and AI-driven
                                        insights—has made learning enjoyable and effective. I especially appreciate the
                                        ability to
                                        practice new skills in a supportive environment where I can make mistakes and
                                        learn from
                                        them without pressure!"
                                    </p>
                                    <h4 className="review-author">— Rohan Mehta</h4>
                                </div>
                                <div className="review-card">
                                    <img src="./open.png" alt="Quote Icon" className="quote-icon"/>
                                    <p className="review-text">
                                        "An amazing tool for both beginners and experienced learners alike! The app
                                        offers
                                        personalized recommendations, adaptive learning paths, and hands-on activities
                                        that make
                                        complex topics easier to grasp. The combination of interactive exercises,
                                        multimedia
                                        resources, and real-time feedback keeps me engaged and motivated. Whether you're
                                        just
                                        starting out or looking to deepen your expertise, this platform has something
                                        valuable to
                                        offer."
                                    </p>
                                    <h4 className="review-author">— Priya Sharma</h4>
                                </div>
                                <div className="review-card">
                                    <img src="./open.png" alt="Quote Icon" className="quote-icon"/>
                                    <p className="review-text">
                                        "This platform has completely transformed the way I approach learning! The
                                        AI-powered
                                        insights are incredibly accurate, helping me focus on the areas where I need
                                        improvement the
                                        most. The interactive, risk-free environment has given me the confidence to
                                        explore new
                                        subjects and challenge myself without the fear of failure. I never thought
                                        learning could be
                                        this engaging and stress-free!" </p>
                                    <h4 className="review-author">— Aman Verma</h4>
                                </div>
                            </div>
                        </section>


                        {/* Quick Access Links */}
                        <section className="quick-features">
                            <h2 className="access-section-title">Quick Actions</h2>
                            <p className="section-descriptionn">
                                Learn essential grammar, pronunciation, and cultural insights while staying updated with the latest linguistic trends.
                            </p>
                            <div className="quick-feature-container">
                                <div className="quick-feature">
                                    <button onClick={() => setCurrentPage("lesson")}>Lesson Page</button>
                                    <div className="quick-feature-text">
                                        <p>Learn languages through structured lessons tailored for all levels.</p>
                                    </div>
                                </div>

                                <div className="quick-feature">
                                    <button onClick={() => setCurrentPage("speech")}>Speech Practice</button>
                                    <div className="quick-feature-text">
                                        <p>Enhance pronunciation and fluency using advanced AI voice recognition.</p>
                                    </div>
                                </div>

                                <div className="quick-feature">
                                    <button onClick={() => setCurrentPage("games")}>Vocabulary Games</button>
                                    <div className="quick-feature-text">
                                        <p>Boost your vocabulary with engaging and interactive language games.</p>
                                    </div>
                                </div>

                                <div className="quick-feature">
                                    <button onClick={() => setCurrentPage("quizzes")}>Quizzes / Flashcards</button>
                                    <div className="quick-feature-text">
                                        <p>Reinforce your learning through quizzes and customizable flashcards.</p>
                                    </div>
                                </div>

                                <div className="quick-feature">
                                    <button onClick={() => setCurrentPage("progress")}>Progress Report</button>
                                    <div className="quick-feature-text">
                                        <p>Monitor your improvement with AI-driven progress tracking and analytics.</p>
                                    </div>
                                </div>

                                <div className="quick-feature">
                                    <button onClick={() => setCurrentPage("auth")}>Login/Sign-Up</button>
                                    <div className="quick-feature-text">
                                        <p>Register or log in to save progress and personalize your learning
                                            experience.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                    </div>
                );
        }

    };

    return <>{renderPage()}</>;
};

export default Home;