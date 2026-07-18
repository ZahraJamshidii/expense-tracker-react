import Logo from "./Logo";
import MenuItem from "./MenuItem";

import menuItems from "../../constants/menuItems";

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
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