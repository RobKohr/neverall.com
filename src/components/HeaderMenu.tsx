import { useToggle } from "hooks/useToggle";
import React, { ReactChild, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
import { ReactComponent as ChevronDownIcon } from "../assets/icons/chevron-down.svg";
import A from "./A";

export interface MenuItem {
  label?: string;
  to?: string;
  subMenu?: MenuItem[];
  HeaderElement?: ReactNode;
  SlideElement?: ReactNode;
}

export default function HeaderMenu({ menu }: { menu: MenuItem[] }) {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState("");
  console.log({ expandedMenu });
  // const menu: MenuItem[] = [
  //   //{ element: <button>Start Free Trial</button> },
  //   {
  //     label: "Solutions1",
  //     subMenu: [
  //       { label: "sub 1", to: "sub1" },
  //       { label: "sub 2 jslkfj lasjf lasjdl;f las;djf l;asdjf ", to: "sub2" },
  //       { label: "sub 3", to: "sub3" },
  //     ],
  //   },
  //   { label: "Solutions2", to: "solutions" },
  //   { label: "Solutions3", to: "solutions" },
  //   { label: "Solutions4", to: "solutions" },
  //   {
  //     label: "Solutions5",
  //     subMenu: [
  //       { label: "sub 1", to: "sub1" },
  //       { label: "sub 2", to: "sub2" },
  //       { label: "sub 3", to: "sub3" },
  //     ],
  //   },
  //   { label: "Solutions6", to: "solutions" },
  // ];
  function convertMenuItems(menu: MenuItem[]) {
    return menu.map((item) => {
      const { HeaderElement: Element, SlideElement, label, to, subMenu } = item;
      if (label && to) {
        if (!Element) {
          item.HeaderElement = <HeaderMenuItem {...{ label, to }} />;
        }
        if (!SlideElement) {
          item.SlideElement = <HeaderMenuItem {...{ label, to }} />;
        }
      }
      if (label && subMenu) {
        const convertedSubMenu = convertMenuItems(subMenu);
        if (!Element) {
          item.HeaderElement = (
            <HeaderMenuExpandableItem
              {...{
                label,
                subMenu: convertedSubMenu,
                expandedMenu,
                setExpandedMenu,
                section: "header",
              }}
            />
          );
        }
        if (!SlideElement) {
          item.SlideElement = (
            <HeaderMenuExpandableItem
              {...{
                label,
                subMenu: convertedSubMenu,
                expandedMenu,
                setExpandedMenu,
                section: "slide",
              }}
            />
          );
        }
      }
      return item;
    });
  }

  const convertedMenuItems = convertMenuItems(menu);
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
          {menu.map(({ SlideElement, label }) => {
            return <span key={label}>{SlideElement}</span>;
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

function HeaderMenuExpandableItem({
  label,
  subMenu,
  setExpandedMenu,
  expandedMenu,
  section,
}: {
  label: string;
  subMenu: MenuItem[];
  setExpandedMenu: (label: string) => void;
  expandedMenu: string;
  section: "header" | "slide";
}) {
  const [expanded, setExpanded] = useState(false);
  const id = section + label;
  return (
    <li className="header-menu-item expandable-item">
      <a onClick={() => setExpandedMenu(expandedMenu === id ? "" : id)}>
        {label} <ChevronDownIcon className="expand-icon" />
      </a>
      <ul
        className={`submenu ${
          expandedMenu === id ? "shown" : "hidden"
        } ${expandedMenu} ${id}`}
      >
        {subMenu.map(({ HeaderElement, label }) => {
          return <li key={label}>{HeaderElement}</li>;
        })}
      </ul>
    </li>
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
          {submenu.map((child, index) => {
            return (
              <li key={index} className="header-menu-child">
                {child}
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}
