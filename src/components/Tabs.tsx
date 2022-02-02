import { createContext, ReactNode, useContext } from "react";

export interface TabsetContext {
  activeTab: string;
  setActiveTab?: (tabId: string) => void;
}

const contextDefaults: TabsetContext = {
  activeTab: "",
  setActiveTab: (tabId: string) => {},
};

const TabsetContext = createContext(contextDefaults);

export interface Tabset extends TabsetContext {
  children: ReactNode;
}
export function Tabset({
  children,
  activeTab,
  setActiveTab = (tabId: string) => {},
}: Tabset) {
  return (
    <div className="tabset">
      <TabsetContext.Provider value={{ activeTab, setActiveTab }}>
        {children}
      </TabsetContext.Provider>
    </div>
  );
}

export function Tab({ children, id }: { children: ReactNode; id: string }) {
  const { activeTab, setActiveTab } = useContext(TabsetContext);
  console.log(activeTab);
  return (
    <div
      onClick={() => setActiveTab && setActiveTab(id)}
      className={`tab ${activeTab === id ? "active" : ""}`}
    >
      {children}
    </div>
  );
}
