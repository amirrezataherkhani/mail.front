import React from "react";

export const AdminPanelConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/apps/AdminPanel",
      component: React.lazy(() => import("./AdminPanel")),
    },
  ],
};
