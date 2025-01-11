import { useEffect, useState } from 'react';
import './FlipNumber.css';

const colorClasses = ["green", "purple", "red", "green", "purple", "red", "green", "purple", "red", "green"];

export default function FlipNumber() {
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentValue((prev) => (prev + 1) % 10);
        }, 500); // Reduced from 900ms

        return () => clearInterval(interval);
    }, []);

    const numbers = Array.from({ length: 10 }, (_, i) => ({
        num: (currentValue + i) % 10,
        nextNum: (currentValue + i + 1) % 10,
        colorClass: colorClasses[(currentValue + i) % 10],
    }));

    return (
        <div className="min-h-screen bg-[#222222] shadow-[inset_0_0_400px_#111111] font-['Anton']">
            <div className="flex items-center justify-center min-h-screen">
                <div className="nums nums-one">
                    {numbers.map((item, index) => (
                        <div
                            key={index}
                            className={`num ${item.colorClass}`}
                            data-num={item.num}
                            data-num-next={item.nextNum}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}