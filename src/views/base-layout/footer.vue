<template>
  <footer class="footer1">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-3 col-md-3 col-sm-6 mb--50">
          <div class="footer-widget">
            <div class="widget-title">
              <h5>Homeowners</h5>
            </div>
            <div class="menu-container">
              <ul>
                <li>
                  <router-link to="/post-a-job">Post a job <i class='bx bx-up-arrow-alt'></i></router-link>
                </li>
                <li>
                  <router-link to="/faq">How it works (FAQ)<i class='bx bx-up-arrow-alt'></i></router-link>
                </li>
                <li>
                  <router-link to="/find-a-trade">Find trades <i class='bx bx-up-arrow-alt'></i></router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
            class="col-lg-3 col-md-3 col-sm-6 mb--50 ">
          <div class="footer-widget">
            <div class="widget-title">
              <h5>Tradespeople</h5>
            </div>
            <div class="menu-container">
              <ul>
                <li>
                  <router-link to="/register">Register as tradesperson <i class='bx bx-up-arrow-alt'></i></router-link>
                </li>
                <li>
                  <router-link to="/quality-requirement">Quality requirements <i class='bx bx-up-arrow-alt'></i>
                  </router-link>
                </li>
                <li>
                  <router-link to="/review-policy">Reviews policy <i class='bx bx-up-arrow-alt'></i></router-link>
                </li>
                <li>
                  <router-link to="/new-leads">Browse Leads <i class='bx bx-up-arrow-alt'></i></router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
            class="col-lg-3 col-md-3 col-sm-6 mb--50 ">
          <div class="footer-widget">
            <div class="widget-title">
              <h5>Company Info</h5>
            </div>
            <div class="menu-container">
              <ul>
                <li>
                  <router-link to="/about-us">About us <i class='bx bx-up-arrow-alt'></i></router-link>
                </li>
                <li>
                  <router-link to="/contact-us">Contact Us <i class='bx bx-up-arrow-alt'></i></router-link>
                </li>
                <li><a href="https://docs.google.com/document/d/1q-Nbu-VSv9Gg2oyetR-zuSMv5Lf5FhCN9mUESTN-64c"
                       target="_blank">Privacy Policy</a></li>

              </ul>
            </div>
          </div>
        </div>

        <div
            class="col-lg-3 col-md-3 col-sm-6 mb--50 ">
          <div class="footer-widget">
            <div class="widget-title">
              <h5>Helpful Resources</h5>
            </div>
            <div class="menu-container">
              <ul>
                <li>
                  <router-link to="/trades">Trades <i class='bx bx-up-arrow-alt'></i></router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-btm">
        <div class="footer-logo">
          <img src="../../../public/frontend/assets/images/header1-logo.svg" style="width: 120px" alt="">
        </div>
        <div class="row border-top align-items-center">
          <div class="col-lg-6 d-flex  justify-content-lg-start justify-content-center">
            <div class="copyright-area">
              <p>©Copyright 2025 Trade Link</p>
            </div>
          </div>
          <div class="col-lg-6 d-flex justify-content-lg-end justify-content-center">
            <div class="social-area">
              <h6>Follow Trade Link:</h6>
              <ul>
                <li><a href="#"><i class="bx bxl-facebook"></i></a></li>
                <li><a href="#"><i class="bx bxl-twitter"></i></a></li>
                <li><a href="#"><i class="bx bxl-linkedin"></i></a></li>
                <li><a href="#"><i class="bx bxl-instagram"></i></a></li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name:"home-footer"
  
}
</script>