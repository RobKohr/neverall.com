import { useToggle } from "hooks/useToggle";
import React, {
  createContext,
  ReactChild,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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

export interface MenuSettings {
  expandedMenu: string;
}

export interface HeaderMenuContext {
  expandedMenu: string;
  setExpandedMenu?: (menuId: string) => void;
}

const contextDefaults: HeaderMenuContext = {
  expandedMenu: "",
  setExpandedMenu: (menuId: string) => {},
};

const HeaderMenuContext = createContext(contextDefaults);

export interface HeaderMenuContextProviderProps {
  children: ReactNode;
}

export function HeaderMenuContextProvider({
  children,
}: HeaderMenuContextProviderProps) {
  const [expandedMenu, setExpandedMenu] = useState("");
  return (
    <div className="header-menu-context-provider">
      <HeaderMenuContext.Provider value={{ expandedMenu, setExpandedMenu }}>
        {children}
      </HeaderMenuContext.Provider>
    </div>
  );
}

export default function HeaderMenu({ menu }: { menu: MenuItem[] }) {
  const [showSideMenu, setShowSideMenu] = useState(false);
  function convertMenuItems(menu: MenuItem[]) {
    return menu.map((item, index) => {
      const { HeaderElement: Element, SlideElement, label, to, subMenu } = item;
      if (label && to) {
        if (!Element) {
          item.HeaderElement = (
            <HeaderMenuItem key={index} {...{ label, to }} />
          );
        }
        if (!SlideElement) {
          item.SlideElement = <HeaderMenuItem key={index} {...{ label, to }} />;
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
    <HeaderMenuContextProvider>
      <div id="header-menu">
        <div id="header-bar-menu-items">
          <ul id="top-header-bar-parents">
            {convertedMenuItems.map(({ HeaderElement }) => {
              return <>{HeaderElement}</>;
            })}
          </ul>
        </div>
        <div id="slide-in-menu" className={showSideMenu ? "shown" : "hidden"}>
          <ul>
            {convertedMenuItems.map(({ SlideElement, label }) => {
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
    </HeaderMenuContextProvider>
  );
}

function HeaderMenuExpandableItem({
  label,
  subMenu,
  section,
}: {
  label: string;
  subMenu: MenuItem[];
  section: "header" | "slide";
}) {
  const { expandedMenu, setExpandedMenu } = useContext(HeaderMenuContext);

  const id = section + ":" + label;
  return (
    <li className="header-menu-item expandable-item">
      <a
        onClick={() => {
          if (setExpandedMenu) {
            return setExpandedMenu(expandedMenu === id ? "" : id);
          }
        }}
      >
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
