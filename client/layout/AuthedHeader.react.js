// @flow

import * as React from 'react';
import Link from 'next/link';
import classnames from 'classnames';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', as: '/dashboard' },
  { label: 'Contacts', href: '/contacts', as: '/contacts' },
  { label: 'My Info', href: '/my-info', as: '/my-info' },
];

type NavItemType = {
  label: string,
  href: string,
  as: string,
  path: string,
};

type Props = {
  path: string,
};

class AuthedHeader extends React.Component<Props> {
  render() {
    return (
      <div className="ui container">
        <div className="ui large secondary pointing menu">
          {navItems.map(navItem => (
            <NavItem
              key={`headerNav-${navItem.href}`}
              path={this.props.path}
              {...navItem}
            />
          ))}
          <div className="right item">
            <Link prefetch href="/settings" as="/settings">
              <a className="ui button">Settings</a>
            </Link>
            <a href="/logout" className="ui button">
              Log out
            </a>
          </div>
        </div>
        <style jsx>{`
          .ui.inverted.pointing.menu {
            border: none;
          }
        `}</style>
      </div>
    );
  }
}

const NavItem = (props: NavItemType) => (
  <Link prefetch href={props.href} as={props.as}>
    <a className={classnames('item', { active: props.path === props.as })}>
      {props.label}
    </a>
  </Link>
);

export default AuthedHeader;
