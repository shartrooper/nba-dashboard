type RouteInfo = {
  name: string;
  route: string;
  icon?: JSX.Element;
};

export type Links = RouteInfo[];

type LinkProps = {
  renderNavItem: (key: string, route: string, name: string, icon?: JSX.Element) => JSX.Element;
  links: Links;
};

export const NavigationItems = ({ renderNavItem, links }: LinkProps) => {
  const navItems = links.map((link) => {
    return renderNavItem(`${link.name.toLowerCase().replace(' ', '-')}`, link.route, link.name, link.icon);
  });

  return <>{navItems}</>;
};
