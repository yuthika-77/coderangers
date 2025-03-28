import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './ReturnsEstimator.css';

const ReturnsEstimator = () => {
    const [investmentAmount, setInvestmentAmount] = useState(5000);
    const [duration, setDuration] = useState(22);
    const [rate, setRate] = useState(12);
    const [isSIP, setIsSIP] = useState(true);
    const [yearlyData, setYearlyData] = useState([]);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Invested Amount', 'Est. Returns'],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: ['#00ffcc', '#ff00cc']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#00ffcc',
                            font: {
                                family: "'Press Start 2P', cursive",
                                size: 8
                            }
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        calculateReturns();
    }, [investmentAmount, duration, rate, isSIP]);

    const calculateReturns = () => {
        let investedAmount = 0;
        let returns = 0;
        const yearlyDataArray = [];

        if (isSIP) {
            // SIP calculation
            for (let year = 0; year < duration; year++) {
                investedAmount += investmentAmount;
                returns = (investedAmount * Math.pow(1 + rate / 100, year + 1)) - investedAmount;
                yearlyDataArray.push({
                    year: year + 1,
                    invested: investedAmount,
                    returns: returns
                });
            }
        } else {
            // Lumpsum calculation
            investedAmount = investmentAmount;
            returns = (investedAmount * Math.pow(1 + rate / 100, duration)) - investedAmount;
            yearlyDataArray.push({
                year: duration,
                invested: investedAmount,
                returns: returns
            });
        }

        setYearlyData(yearlyDataArray);

        // Update chart
        if (chartInstance.current) {
            chartInstance.current.data.datasets[0].data = [investedAmount, returns];
            chartInstance.current.update();
        }
    };

    const toggleInvestmentType = (type) => {
        setIsSIP(type === 'sip');
    };

    return (
        <div className="estimator-container">
            <h2>Returns Estimator</h2>
            <p className="subtitle">Estimation based on past performance</p>

            <div className="input-group">
                <label>Enter Amount (₹)</label>
                <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(parseFloat(e.target.value))}
                    min="0"
                />
            </div>

            <div className="toggle-group">
                <button
                    className={`toggle-btn ${isSIP ? 'active' : ''}`}
                    onClick={() => toggleInvestmentType('sip')}
                >
                    SIP
                </button>
                <button
                    className={`toggle-btn ${!isSIP ? 'active' : ''}`}
                    onClick={() => toggleInvestmentType('lumpsum')}
                >
                    Lumpsum
                </button>
            </div>

            <div className="input-group">
                <label>Select Duration (Years)</label>
                <input
                    type="range"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    min="1"
                    max="30"
                />
                <span className="value-display">{duration} Years</span>
            </div>

            <div className="input-group">
                <label>Expected Rate of Return (%)</label>
                <input
                    type="range"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    min="8"
                    max="30"
                />
                <span className="value-display">{rate}%</span>
            </div>

            <div className="chart-container">
                <canvas ref={chartRef}></canvas>
            </div>

            <div className="results">
                <div className="result-item">
                    <span className="label">Total Invested:</span>
                    <span className="value">₹{yearlyData[yearlyData.length - 1]?.invested.toFixed(2) || 0}</span>
                </div>
                <div className="result-item">
                    <span className="label">Estimated Returns:</span>
                    <span className="value">₹{yearlyData[yearlyData.length - 1]?.returns.toFixed(2) || 0}</span>
                </div>
            </div>
        </div>
    );
};

export default ReturnsEstimator; 