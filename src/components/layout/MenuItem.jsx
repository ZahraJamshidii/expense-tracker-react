import { NavLink } from "react-router-dom";

function MenuItem({ to, icon, title }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? "text-white shadow-md"
            : "theme-text hover:brightness-95"
        }`
      }
      style={({ isActive }) => ({
        background: isActive ? "var(--primary)" : "transparent",
      })}
    >
      <span className="text-xl">
        {icon}
      </span>

      <span className="font-medium">
        {title}
      </span>
    </NavLink>
  );
}

export default MenuItem;