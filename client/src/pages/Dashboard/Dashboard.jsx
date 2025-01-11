
import Card from '../../components/ui/Card';

function Dashboard() {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">Welcome to Dashboard</h4>
                </div>
            </div>
            <div className="row">
                <Card title="Users" value="153" icon="user-plus" link="users.html" />
                <Card title="Game Bet" value="69917" icon="inbox" link="GameBet.html" />
            </div>
        </div>
    );
}

export default Dashboard;