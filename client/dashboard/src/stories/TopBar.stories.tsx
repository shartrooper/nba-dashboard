import { TopBarContainer } from '@/features/misc/dashboard';
import { Meta } from '@storybook/react';



const meta: Meta = {
    title: 'dashboard header',
    component: TopBarContainer,
};

export default meta;

export const TopBarComponent = () => <TopBarContainer handleClick={()=> null}/>;
