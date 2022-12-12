import { Route, Routes } from 'react-router-dom';
import Settings from '@/features/usersettings/components/Main';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>PLACEHOLDER</div>} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};