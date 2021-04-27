interface MenuItem {
  label: string;
  routerLink: string;
  iconName: string;
}

export const mainMenu: MenuItem[] = [
  { label: 'Home', routerLink: '/about', iconName: 'home' },
  { label: 'Search', routerLink: '/search', iconName: 'search' },
  { label: 'Notification', routerLink: '/notification', iconName: 'whatshot' },
  { label: 'Profile', routerLink: '/user/profile', iconName: 'account_circle' },
];
