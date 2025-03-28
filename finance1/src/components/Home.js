import React, { useEffect } from 'react';
import './Home.css';

const Home = () => {
    useEffect(() => {
        // Falling Money Effect
        function createMoney() {
            const moneyContainer = document.getElementById('money-container');
            if (!moneyContainer) return; // Add check for null
            
            const money = document.createElement('img');
            money.src = '/images/Untitled.png';
            money.classList.add('money');
            money.style.left = Math.random() * 100 + "vw";
            money.style.animationDuration = (Math.random() * 2 + 3) + "s";
            moneyContainer.appendChild(money);
            setTimeout(() => {
                money.remove();
            }, 5000);
        }

        // Only start the interval if the container exists
        const moneyContainer = document.getElementById('money-container');
        if (moneyContainer) {
            setInterval(createMoney, 500);
        }
    }, []);

    return (
        <div className="home-container">
            <div className="main-content">
                <div className="title">finwise</div>
                <div className="money-container" id="money-container"></div>
            </div>
            <div className="marquee">
                <span>💰 Money is falling! Stay smart with FinWise! 🚀 Your AI-powered financial assistant. 🔥</span>
            </div>
        </div>
    );
};

export default Home;