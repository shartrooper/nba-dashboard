import { TopBarContainer } from '@/features/misc/dashboard';
import { Meta } from '@storybook/react';
import { MockMenuItem } from './components';

const meta: Meta = {
  title: 'dashboard header',
  component: TopBarContainer,
};

const mockNavItems = ['Mock A', 'Mock B', 'Mock C', 'Mock D'];

const TopBarComponent = () => (
  <TopBarContainer userName="MockUser" handleClick={() => null}>
    {mockNavItems.map((navItem, index) => (
      <MockMenuItem key={index} name={navItem} />
    ))}
  </TopBarContainer>
);
