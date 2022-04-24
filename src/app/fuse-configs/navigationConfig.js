
const navigationConfig = [
  {
    id: "applications",
    title: " ",
    type: "group",
    icon: "apps",
    children: [
      {
        id: "Applications",
        title: "Applications",
        type: "collapse",
        icon: "dashboard",
        children: [
          {
            id: "chat",
            title: "Chat",
            type: "item",
            icon: "chat",
            url: "/apps/chat",
            badge: {
              title: 13,
              bg: "rgb(9, 210, 97)",
              fg: "#FFFFFF",
            },
          },
          {
            id: "Channels",
            title: "Channels",
            type: "item",
            icon: "folderShared",
            url: "/apps/dashboards/analytics", // url should be changed to show the channels
          },
          {
            id: "Groups",
            title: "Groups",
            type: "item",
            icon: "groups",
            url: "/apps/dashboards/project",
          },
          {
            id: "Banners",
            title: "Create Banner",
            type: "item",
            icon: "businessCenter",
            url: "/apps/Banner",
          },
          {
            id: "AdminPanel",
            title: "Admin Panel",
            type: "item",
            icon: "supervisorAccount",
            url: "/apps/AdminPanel",
          },
          {
            id: "Requests",
            title: "Follow Requests",
            type: "item",
            icon: "person_add",
            url: "/requests",
          },
        ],
      },
    ],
  },
];

export default navigationConfig;
