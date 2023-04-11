import { Route, Routes } from 'react-router-dom';
import Settings from '@/features/usersettings/components/Main';
import { FeedContainer } from '@/features/players/components';
import { PlayerStatsWrapper } from '@/features/playerstats/components';
import { GamesBoardContainer } from '@/features/games/components';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GamesBoardContainer />} />
      <Route path="/players" element={<FeedContainer />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/player/:playerId" element={<PlayerStatsWrapper />} />
    </Routes>
  );
};