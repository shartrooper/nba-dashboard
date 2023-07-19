import { Navigate, Route, Routes } from 'react-router-dom';
import Settings from '@/features/usersettings/components/Main';
import { FeedContainer } from '@/features/players/components';
import { PlayerStatsWrapper } from '@/features/playerstats/components';
import { MainContainer } from '../dashboard';
import { AveragesTableContainer } from '@/features/averages/components';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContainer />} />
      <Route path="/players" element={<FeedContainer />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/player/:playerId" element={<PlayerStatsWrapper />} />
      <Route path="/averages" element={<AveragesTableContainer />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};