import Card from '../../components/ui/Card';
import { UsersRound, Receipt } from 'lucide-react';
import { useSelector } from "react-redux";

function Dashboard() {
    const { users, isLoading } = useSelector((state) => state.users);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">Welcome to Dashboard</h4>
                </div>
            </div>

            <div className="row">
                {/* Users Card */}
                <Card
                    title="Users"
                    value={isLoading ? "Loading..." : users.length}
                    icon={<UsersRound className='h-12 w-12' />}
                    link="users.html"
                />

                {/* Game Bet Card */}
                <Card
                    title="Game Bet"
                    value={isLoading ? "Loading..." : 23456}
                    icon={<Receipt className='h-12 w-12' />}
                    link="GameBet.html"
                />

            </div>
        </div>
    );
}

export default Dashboard;
