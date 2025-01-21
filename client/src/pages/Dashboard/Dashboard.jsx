import Card from '../../components/ui/Card';
import { UsersRound, Receipt } from 'lucide-react';
import { useSelector } from "react-redux";
import CardSkeleton from '../../components/Loader/DashboardCardSkeleton';  // Import the skeleton loader

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
                {isLoading ? (
                    <h1>loding..</h1>
                ) : (
                    <Card title="Users" value={users.length} icon={<UsersRound className='h-12 w-12' />} link="users.html" />
                )}

                {/* Game Bet Card */}
                {isLoading ? (
                    <h1>loding..</h1>
                ) : (
                    <Card title="Game Bet" value="69917" icon={<Receipt className='h-12 w-12' />} link="GameBet.html" />
                )}
            </div>
        </div>
    );
}

export default Dashboard;
