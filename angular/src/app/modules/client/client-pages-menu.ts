import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/client/dashboard',
    home: true,
  },
  {
    title: 'Account Settings',
    icon: 'nb-gear',
    children: [
      {
        title: 'Profile',
        link: '',
      },
      {
        title: 'Change Password',
        link: '',
      },
      {
        title: 'Settings',
        link: '',
      },
      {
        title: 'Log out',
        link: '',
      },
    ]
    },
      {
        title: 'Applications',
        icon: 'nb-lightbulb',
        children: [
          {
            title: 'Application List',
            link: '',
          },
          {
            title: 'New Application',
            link: '',
          }
        ]
        },
        {
          title: 'Informations',
          icon: 'nb-notifications',
          children: [
            {
              title: 'Communications',
              link: '',
            },
            {
              title: 'Notifications',
              link: '',
            }
          ]
    }
];
