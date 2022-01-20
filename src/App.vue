<template>
  <!-- <router-link to="/">Home</router-link> -->
  <div id="app">
    <!-- NAVBAR -->
    <nav class="m-navbar">
      <div class="m-nav-top">
        <a href="#" class="m-toggle"></a>
        <a href="#" class="m-logo"></a>
      </div>
      <div class="m-menu">
        <ul>
          <li>
            <a href="#">
              <div class="mi mi-24 mi-sidebar-material"></div>
              <div class="m-name-submenu">Nguyên vật liệu</div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- HEADER -->
    <div class="m-main">
      <header class="m-header">
        <div class="m-header-left">
          <div class="m-header-branch">
            <div class="m-combobox">
              <input type="text" value="Ánh Dương Restaurant" />
              <button class="m-combobox-btn mi-chevron-down"></button>
            </div>
          </div>
        </div>
        <div class="m-header-right">
          <div class="m-version">R58.0</div>
          <div class="m-language">
            <div class="m-combobox">
              <input type="text" value="Tiếng Việt (Tiếng Việt)" />
              <button class="m-combobox-btn mi-chevron-down"></button>
            </div>
          </div>
          <div class="m-notifi">
            <div class="mi-notifi"></div>
          </div>
          <div class="m-account">
            <div class="m-account-image"></div>
            <div class="m-account-name">Chu Yến</div>
            <div
              class="mi-16 mi-chevron-down"
              style="background-color: #0973b9"
            ></div>
          </div>
        </div>
      </header>
      <!-- END HEADER -->
      <!-- CONTENT -->
      <router-view />
      <!-- END CONTENT -->
    </div>
  </div>
</template>

<style lang="scss">
@import url("./assets/css/main.css");
</style>
