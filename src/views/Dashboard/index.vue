<template>
  <div class="app">
    <!--左侧菜单栏部分-->
    <el-container style="height:100%">
      <el-scrollbar>
        <el-aside
          style="height: 100%;"
          class="app-side app-side-left"
          :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'"
        >
          <div class="app-side-logo">
            <img style="width: 66px; height: 50px;" src="../../../static/image/logo.png" />
            <span class="logo-title">房屋租赁系统</span>
          </div>
          <!--用户信息部分-->
          <div class="sidebar-user-panel">
            <div class="sidebar-user-panel-toggleable">
              <el-avatar shape="circle" :size="80" src="../../../static/image/avator.jpg"></el-avatar>
              <div class="title">Admin</div>
            </div>
          </div>

          <div>
            <!-- 我是样例菜单 -->

            <el-menu
              style="height: 100%"
              :default-active="$route.path"
              router
              unique-opened
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <template v-for="(item, index) in   routes" v-if="!item.hidden">
                <!--二级菜单-->
                <template v-if="!item.leaf">
                  <el-submenu :index="index+''">
                    <template slot="title">
                      <i style="color: #ddd" :class="item.iconCls"></i>
                      <span>{{item.name}}</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item
                        :index="child.path"
                        :key="index"
                        v-for="(child, index) in item.children"
                        v-if="!child.hidden"
                      >{{child.name}}</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                </template>

                <!--一级菜单-->
                <template v-else>
                  <el-menu-item
                    :index="child.path"
                    :key="index"
                    v-for="(child, index) in item.children"
                  >
                    <i style="color: #ddd" :class="child.iconCls"></i>
                    <span slot="title">{{child.name}}</span>
                  </el-menu-item>
                </template>
                <!-- <subMenu v-else :data="item" :key="key"></subMenu> -->
              </template>
            </el-menu>
            <!-- <siderbar></siderbar>-->
          </div>
        </el-aside>
      </el-scrollbar>
      <!--右侧顶部导航栏部分-->
      <el-container>
        <el-header class="app-header">
          <div style="width: 50px; cursor: pointer;" @click.prevent="toggleSideBar">
            <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
            <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
          </div>
          <!-- 我是样例菜单 -->
          <el-menu
            default-active="/"
            router
            class="el-menu-demo tab-page"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#409EFF"
          >
            <!--:index="currentRouter" name-->
            <el-menu-item index="/">{{this.$route.name}}</el-menu-item>

          </el-menu>
          <div class="app-header-userinfo">
            <span class="my-message">
              <i class="el-icon-full-screen fontSizefull"></i>
            </span>

            <span class="my-message">
              <i class="el-icon-message-solid fontSize"></i>
              <div class="num"></div>
            </span>
            <el-dropdown trigger="hover" :hide-on-click="false">
              <span class="el-dropdown-link">
                {{username}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="app-body">
          <template>
            <transition>
              <router-view />
            </transition>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "Container",
  data() {
    return {
      username: "",
      isCollapse: false,
      transitionName: "",
      value: "",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  created() {},
  mounted() {},
  computed: {
    routes() {
      return store.getters.routers;
      // return this.$router.options.routes
    },
    username() {
      return localStorage.setItem("ms_username");
    }
  },

  watch: {
    $route(to, from) {}
  },

  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
    },
    logout: function() {
      // this.$router.push("/login");
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    remoteMethod() {}
  },
  mounted: function() {
    let user = localStorage.getItem("ms_username");
    if (user) {
      this.username = user;
    }
    console.log(user);
  }
};
</script>

<style scoped>
.right-menu {
  float: right;
  right: 20px;
}
.my-message > i:after {
  position: absolute;
  top: 14px;
  right: 126px;
  width: 18px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  border-radius: 16px;
  font-size: 9px;
  font-weight: 700;
  color: #ffffff;
  background: #e25822;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.4);
}

.logo-title {
  font-size: 20px;
}

.sidebar-user-panel {
  box-sizing: border-box;
  padding: 20px;
  height: 150px;
}
.sidebar-user-panel .title {
  font-size: 24px;
}
.my-message {
  margin-right: 36px;
}
.my-message .fontSize {
  font-size: 14px;
}
.fontSizefull {
  font-size: 20px;
}
.el-menu-vertical-demo {
  text-align: left;
}
</style>
