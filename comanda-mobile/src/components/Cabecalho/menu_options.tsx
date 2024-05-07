export type Menu = {
  id: string;
  menu_title: "Mesas" | "Comandas";
  options: Array<{
    title: string;
    href: string;
    description: string;
  }>;
}[];

export const menu_user: Menu = [];

export const menu_adm: Menu = [
  {
    id: "mesas",
    menu_title: "Mesas",
    options: [
      {
        title: "Todas as Mesas",
        href: "/mesas/todas-mesas",
        description: "Visualize todas as mesas",
      },
    ],
  },
  {
    id: "comandas",
    menu_title: "Comandas",
    options: [
      {
        title: "Todas as Comandas",
        href: "/comandas/todas-comandas",
        description: "Visualize todas as comandas",
      },
    ],
  },
];

export const menu_dev: Menu = [...menu_adm];
