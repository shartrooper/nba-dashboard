type RouteInfo = {
  name: string;
  route: string;
};

export type Links = RouteInfo[];

type LinkProps = {
  renderNavItem: (key: string, route: string, name: string) => JSX.Element;
  links: Links;
};

export const NavigationItems = ({ renderNavItem, links }: LinkProps) => {
  const navItems = links.map((link) => {
    return renderNavItem(`${link.name.toLowerCase().replace(' ', '-')}`, link.route, link.name);
  });

  return <>{navItems}</>;
};
