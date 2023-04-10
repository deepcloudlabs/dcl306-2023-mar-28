<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">DEEP<b>CLOUD</b>LABS</a>
  </header>
  <div class="row">
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <span data-feather="home" class="align-text-bottom"></span>
              <router-link class="btn btn-info" to="/">Books</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="shopping-cart" class="align-text-bottom"></span>
              <router-link class="btn btn-warning" to="/basket">Basket
                   <BootstrapBadge :value="numberOfItems" color="bg-success"></BootstrapBadge>
                   <BootstrapBadge :value="numberOfBooks" color="bg-danger"></BootstrapBadge>
              </router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file" class="align-text-bottom"></span>
              <router-link class="btn btn-primary"  to="/orders">Orders</router-link>
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Book Store</h1>
      </div>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>

import BootstrapBadge from "@/components/BootstrapBadge";
export default {
  name: 'App',
  components: {BootstrapBadge},
  computed: {
    numberOfItems(){
      return this.$store.state.basket.items.length;
    },
    numberOfBooks(){
      return this.$store.state.basket.items.reduce((sum, item) => sum + item.quantity, 0);
    }
  }
}
</script>

<style>
@import url("assets/app.css");
</style>
