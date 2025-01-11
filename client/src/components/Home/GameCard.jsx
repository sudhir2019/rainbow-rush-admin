export function GameCard({ game }) {
    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <img src={game.image} alt={game.name} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h3 className="text-lg font-bold text-white">{game.name}</h3>
                <p className="mt-2 text-gray-300 text-sm">{game.description}</p>
                <button className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-purple-500 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">
                    Play Now
                </button>
            </div>
        </div>
    );
}