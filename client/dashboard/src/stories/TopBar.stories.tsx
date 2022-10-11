import { TopBarContainer } from '@/features/misc/dashboard';
import { Menu } from '@headlessui/react';
import { Meta } from '@storybook/react';

const meta: Meta = {
    title: 'dashboard header',
    component: TopBarContainer,
};

export default meta;


const mockNavItems = ['Mock A', 'Mock B', 'Mock C', 'Mock D'];


const MockMenuItem = ({ name }: { name: string }) => {
    return (
        <Menu.Item>
            {({ active }) => (
                <div
                    className={`${active && 'bg-basketball'} py-2 px-4 text-sm cursor-pointer`}
                >
                    {name}
                </div>
            )}
        </Menu.Item>
    )
}


export const MockTopBarItemsComponent = () =>
(<>
    {mockNavItems.map((navItem, index) => <MockMenuItem key={index} name={navItem} />)}
</>);

export const TopBarComponent = () => (
    <TopBarContainer handleClick={() => null}>
        {mockNavItems.map((navItem, index) => <MockMenuItem key={index} name={navItem} />)}
    </TopBarContainer>);