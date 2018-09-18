// @flow

import * as React from 'react';
import Link from 'next/link';
import classnames from 'classnames';

const navItems = [
  { label: 'Home', href: '/', as: '/' },
  { label: 'About', href: '/about', as: '/about' },
  { label: 'Privacy', href: '/privacy', as: '/privacy' },
];

type NavItemType = {
  label: string,
  href: string,
  as: string,
  path: string,
};

type Props = {
  path: string,
  isLoggedIn: boolean,
};

class Header extends React.Component<Props> {
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
            {!this.props.isLoggedIn ? (
              <div>
                <Link prefetch href="/auth" as="/login">
                  <a className="ui button">Log In</a>
                </Link>
                <Link prefetch href="/auth" as="/signup">
                  <a className="ui button">Sign Up</a>
                </Link>
              </div>
            ) : (
              <div>
                <Link prefetch href="/dashboard" as="/dashboard">
                  <a className="ui button">Go to Dashboard</a>
                </Link>
                <a href="/logout" className="ui button">
                  Log Out
                </a>
              </div>
            )}
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

export default Header;
