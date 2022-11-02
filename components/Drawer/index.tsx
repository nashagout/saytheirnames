import React, { ReactElement } from "react";
type Props = { children: ReactElement };

function Drawer({ children }: Props) {
  return (
    <div className="drawer drawer-end">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {children}
        <label htmlFor="drawer" className="btn drawer-button btn-primary">
          Open drawer
        </label>
      </div>
      <div className="drawer-side overflow-hidden">
        <label htmlFor="drawer" className="drawer-overlay"></label>
        <ul className="menu w-80 overflow-y-auto bg-base-100 p-4 text-base-content">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
