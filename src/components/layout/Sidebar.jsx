import Logo from "./Logo";
import MenuItem from "./MenuItem";

import menuItems from "../../constants/menuItems";

function Sidebar() {
  return (
    <aside
      className="w-64 p-6 transition-all duration-300 shadow-xl"
      style={{
        background: "var(--card)",
        color: "var(--text)",
        borderRight: "1px solid rgba(148,163,184,.15)",
        boxShadow: "4px 0 25px rgba(0,0,0,.18)",
      }}
    >
      <Logo />

      <nav className="mt-10 flex flex-col gap-2">
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            to={item.path}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;