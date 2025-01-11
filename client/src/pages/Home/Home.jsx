import { GameCard } from "../../components/Home/GameCard";
import { Hero } from "../../components/Home/Hero";
import { WinnersSection } from "../../components/Home/WinnersSection";
import { games } from '../../data/data'
export default function Home() {
    return (
        <>
            <Hero />
            <div id="games" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Games</h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {games.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </div>

            <WinnersSection />
        </>

    )
}
