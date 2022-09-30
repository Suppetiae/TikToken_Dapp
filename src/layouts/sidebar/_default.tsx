import cn from 'classnames';

import Logo from '@/components/ui/logo';
import { MenuItem } from '@/components/ui/collapsible-menu';
import Scrollbar from '@/components/ui/scrollbar';
import Button from '@/components/ui/button';
import routes from '@/config/routes';
import { useDrawer } from '@/components/drawer-views/context';
import { HomeIcon } from '@/components/icons/home';

import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';

import { ExchangeIcon } from '@/components/icons/exchange';

import { Close } from '@/components/icons/close';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';


export const menuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },

  {
    name: 'Buy',
    icon: <ExchangeIcon />,
    href: routes.swap,
  },
  {
    name: 'TTicket',
    icon: <PoolIcon />,

    dropdownItems: [
      {
        name: 'Buy TTicket',
        href: 'https://mint-ticket.tt2e.finance/',
      },
      {
        name: 'Your TTickets',
        href: routes.nft,
      },
    ],
  },
  {
    name: 'Explore NFTs',
    icon: <CompassIcon />,
    href: routes.cameras,
  },
  {
    name: 'Earn',
    icon: <PlusCircle />,
    href: routes.earn,
  },

  {
    name: 'Docs',
    icon: <ProfileIcon />,
    href: 'https://docs.tt2e.finance/',
  },
];

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { closeDrawer } = useDrawer();
  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed  xl:w-72 2xl:w-80',
        className
      )}
    >
      <div className="relative mt-4 flex h-24 items-center justify-center  overflow-hidden ">
        <Logo />
        <div className="md:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>

      <Scrollbar style={{ height: 'calc(100% - 96px)' }}>
        <div className="px-6 pb-5 2xl:px-8">
          <div className="mt-12">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                name={item.name}
                href={item.href}
                icon={item.icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </div>
        </div>
      </Scrollbar>
    </aside>
  );
}
