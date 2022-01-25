import { useToggle } from "hooks/useToggle";
import React, { ReactChild, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
import A from "./A";

export interface MenuItem {
  label?: string;
  to?: string;
  HeaderElement?: ReactNode;
  SlideElement?: ReactNode;
}

export default function HeaderMenu() {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const menu: MenuItem[] = [
    //{ element: <button>Start Free Trial</button> },
    { label: "Solutions1", to: "solutions" },
    { label: "Solutions2", to: "solutions" },
    { label: "Solutions3", to: "solutions" },
    { label: "Solutions4", to: "solutions" },
    { label: "Solutions5", to: "solutions" },
    { label: "Solutions6", to: "solutions" },
  ];
  const convertedMenuItems = menu.map((item) => {
    const { HeaderElement: Element, SlideElement, label, to } = item;
    if (label && to) {
      if (!Element) {
        item.HeaderElement = <HeaderMenuItem {...{ label, to }} />;
      }
      if (!SlideElement) {
        item.SlideElement = <HeaderMenuItem {...{ label, to }} />;
      }
    }
    return item;
  });

  return (
    <div id="header-menu">
      <div id="header-bar-menu-items">
        <ul>
          {menu.map(({ HeaderElement }) => {
            return <>{HeaderElement}</>;
          })}
        </ul>
      </div>
      <div id="slide-in-menu" className={showSideMenu ? "shown" : "hidden"}>
        <ul>
          {menu.map(({ SlideElement }) => {
            return <>{SlideElement}</>;
          })}
        </ul>
      </div>
      <div
        onClick={() => {
          setShowSideMenu(!showSideMenu);
        }}
      >
        <MenuIcon className="menu-icon" />
      </div>
    </div>
  );
}

function HeaderMenuItem({ label, to }: { label: string; to: string }) {
  return (
    <li className="header-menu-item">
      <A to={to}>{label}</A>
    </li>
  );
}

function HeaderParentMenuItem({
  label,
  submenu,
}: {
  label: string;
  submenu: ReactNode[];
}) {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <li className="header-parent-menu-item">
      <div
        onClick={() => {
          setShowChildren(!showChildren);
        }}
      >
        {label}
        <ul className="header-menu-children">
          {submenu.map((child) => {
            return <li className="header-menu-child">{child}</li>;
          })}
        </ul>
      </div>
    </li>
  );
}
