import {
  FaHome,
  FaMoneyBillWave,
  FaWallet,
  FaChartPie,
  FaTags,
  FaUser,
  FaCog,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: <FaHome />,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: <FaMoneyBillWave />,
  },
  {
    title: "Wallets",
    path: "/wallets",
    icon: <FaWallet />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <FaChartPie />,
  },
  {
    title: "Categories",
    path: "/categories",
    icon: <FaTags />,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
];

export default menuItems;