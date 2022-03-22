const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/home" },
      { path: "home", component: () => import("pages/MainHome.vue") },
      { path: "activities", component: () => import("pages/MainActives.vue") },
      { path: "about", component: () => import("pages/MainAbout.vue") },
    ],
  },
  {
    path: "/login/:id?",
    component: () => import("layouts/LoginLayout.vue"),
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "create", component: () => import("pages/AdminCreate.vue") },
      { path: "", component: () => import("pages/AdminDashboard.vue") },
      {
        path: "stats/:id",
        name: "stats",
        component: () => import("pages/AdminStats.vue"),
        props: true,
      },
    ],
    meta: {
      auth: true,
      requiresAdmin: true,
      requiresUser: false,
    },
  },
  {
    path: "/process/:id",
    component: () => import("layouts/ProcessLayout.vue"),
    props: true,
    children: [
      { path: "start", component: () => import("pages/ProcessHome.vue") },
      { path: "main", component: () => import("pages/ProcessMain.vue") },
    ],
    meta: {
      auth: true,
      requiresAdmin: false,
      requiresUser: true,
    },
  },
  {
    path: "/test",
    component: () => import("layouts/TestLayout.vue"),
    children: [
      { path: "/home", component: () => import("pages/MainHome.vue") },
    ],
  },
  {
    path: "/unauthorized",
    component: () => import("pages/Error401.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
