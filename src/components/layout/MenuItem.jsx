import { NavLink } from "react-router-dom";

function MenuItem({ to, icon, title }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        }`
      }
    >
      <span className="text-xl">
        {icon}
      </span>

      <span>
        {title}
      </span>
    </NavLink>
  );
}

export default MenuItem;