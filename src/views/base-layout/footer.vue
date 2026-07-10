<template>
  <footer class="tl-footer">
    <div class="container">
      <div class="tl-footer-main">
        <div class="tl-footer-brand">
  

  <img
    src="../../../public/frontend/assets/images/header1-logo.svg"
    alt="Tradelink logo"
    class="tl-footer-logo"
  >

  <div>
    <h3>Proudly Connecting <span>Jamaica’s</span> Trades Industry</h3>
    <p>Linking homeowners with trusted, verified tradespeople across Jamaica.</p>
  </div>
</div>

        <div class="tl-footer-links">
          <div>
            <h5>Homeowners</h5>
            <router-link to="/post-a-job">Post a job</router-link>
            <router-link to="/faq">How it works</router-link>
            <router-link to="/find-tradesperson">Find trades</router-link>
          </div>

          <div>
            <h5>Tradespeople</h5>
            <router-link to="/register">Register as tradesperson</router-link>
            <router-link to="/quality-requirement">Quality requirements</router-link>
            <router-link to="/review-policy">Reviews policy</router-link>
            <router-link to="/new-leads">Browse leads</router-link>
          </div>

          <div>
            <h5>Company</h5>
            <router-link to="/about-us">About us</router-link>
            <router-link to="/contact-us">Contact us</router-link>
            <router-link to="/trades">Trades</router-link>
          </div>
        </div>
      </div>

      <div class="tl-footer-bottom">
        <div class="tl-map-line">
          <span class="tl-map">🇯🇲</span>
          <span>Tradelink Jamaica</span>
        </div>

        <p>© 2026 Tradelink Jamaica. All rights reserved.</p>

        <div class="tl-socials">
          <a href="#"><i class="bx bxl-facebook"></i></a>
          <a href="#"><i class="bx bxl-instagram"></i></a>
          <a href="#"><i class="bx bxl-whatsapp"></i></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "home-footer"
}
</script>

<style scoped>
.tl-footer {
  background: #032f3c;
  color: #ffffff;
  padding: 55px 0 28px;
}

.tl-footer-main {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.tl-footer-brand {
  max-width: 420px;
}

.tl-footer-logo {
  width: 130px;
  margin-bottom: 20px;
}

.tl-footer-brand h3 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 12px;
}

.tl-footer-brand h3 span {
  color: #b87345;
}

.tl-footer-brand p {
  color: rgba(255,255,255,0.8);
}

.tl-footer-links {
  display: flex;
  gap: 45px;
  flex-wrap: wrap;
}

.tl-footer-links h5 {
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 14px;
}

.tl-footer-links a {
  display: block;
  color: rgba(255,255,255,0.78);
  text-decoration: none;
  margin-bottom: 9px;
}

.tl-footer-links a:hover {
  color: #b87345;
}

.tl-footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.2);
  margin-top: 38px;
  padding-top: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.tl-map-line {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}

.tl-map {
  font-size: 30px;
}

.tl-footer-bottom p {
  margin: 0;
  color: rgba(255,255,255,0.75);
}

.tl-socials {
  display: flex;
  gap: 14px;
}

.tl-socials a {
  width: 38px;
  height: 38px;
  background: #ffffff;
  color: #032f3c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 20px;
}

.tl-socials a:hover {
  background: #b87345;
  color: #ffffff;
}

@media (max-width: 768px) {
  .tl-footer {
    text-align: center;
  }

  .tl-footer-main,
  .tl-footer-bottom,
  .tl-footer-links {
    justify-content: center;
  }

  .tl-map-line {
    justify-content: center;
  }
}

.tl-footer-brand {
  position: relative;
  max-width: 450px;
}

.tl-footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  min-width: 550px;
}

.tl-footer-links > div {
  text-align: center;
}

.tl-footer-links h5 {
  margin-bottom: 18px;
}

.tl-footer-links a {
  display: block;
  margin-bottom: 12px;
}

@media (max-width: 992px) {
  .tl-footer-links {
    grid-template-columns: 1fr;
    min-width: auto;
    gap: 30px;
  }
}
</style>