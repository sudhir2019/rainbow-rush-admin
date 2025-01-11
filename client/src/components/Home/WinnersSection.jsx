import { Trophy } from 'lucide-react';

const recentWinners = [
    {
        id: 1,
        username: "player123",
        game: "Lucky 12 Coupon",
        prize: "$1,000",
        date: "2 hours ago"
    },
    {
        id: 2,
        username: "winner456",
        game: "Triple Chance",
        prize: "$500",
        date: "3 hours ago"
    },
    {
        id: 3,
        username: "gamer789",
        game: "Roulette",
        prize: "$2,000",
        date: "5 hours ago"
    }
];

export function WinnersSection() {
    return (
        <div className="bg-black/30 backdrop-blur-sm py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white flex items-center justify-center">
                        <Trophy className="w-8 h-8 mr-2 text-yellow-400" />
                        Recent Winners
                    </h2>
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {recentWinners.map((winner) => (
                            <div key={winner.id} className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
                                <div className="text-lg font-semibold text-white">{winner.username}</div>
                                <div className="text-sm text-gray-300">Won {winner.prize} in {winner.game}</div>
                                <div className="text-xs text-gray-400 mt-2">{winner.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}