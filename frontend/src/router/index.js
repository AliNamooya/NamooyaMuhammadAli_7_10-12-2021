import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Wall from "../views/Wall.vue";
import Profile from "../views/Profile.vue";
import Edit from "../views/Edit.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/wall",
    name: "Wall",
    component: Wall,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
