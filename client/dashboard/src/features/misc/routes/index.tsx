import { Route, Routes } from 'react-router-dom';
import Settings from '@/features/usersettings/components/Main';
import { FeedContainer } from '@/features/players/components';
import { PlayerStatsContainer } from '@/features/playerstats/components';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FeedContainer />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/player/:playerId" element={<PlayerStatsContainer />} />
    </Routes>
  );
};