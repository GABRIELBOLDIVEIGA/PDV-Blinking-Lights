import {
  LayoutDashboard,
  PackageSearch,
  ShoppingCart,
  Tag,
  Tags,
} from "lucide-react";

export const menuOptions = [
  {
    link: "/dashboard",
    text: "Dashboard",
    icon: <LayoutDashboard />,
  },
  {
    link: "/venda",
    text: "Venda",
    icon: <ShoppingCart />,
  },
  {
    link: "/categorias",
    text: "Categorias",
    icon: <Tag />,
  },
  {
    link: "/subcategorias",
    text: "Subcategorias",
    icon: <Tags />,
  },
  {
    link: "/produtos",
    text: "Produtos",
    icon: <PackageSearch />,
  },
];
