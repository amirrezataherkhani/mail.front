import React from "react";

export const BannerConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/apps/Banner",
      component: React.lazy(() => import("./Banner")),
    },

  ],
};
