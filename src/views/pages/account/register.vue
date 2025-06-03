<template>
  <body class="bg-wight">
  <!--  <div class="eg-preloder">-->
  <!--  </div>-->

  <topHeader></topHeader>

  <!-- ========== Home Two Counter Start============= -->
  <div class="counter-area home2-counter-area mb-120">
    <div class="container eDSmX">
      <div class="row g-lg-4 gy-5 justify-content-center">
        <div class="col-md-6">
          <h1 class="font-weight-bold custom-title mb-4 mt-5">The trusted way to find the work you want</h1>
          <div class="card">
            <div class="card-body px-4">
              <h5 class="font-weight-bold mt-3 mb-3">Discover local trade tasks</h5>
              <div class="input-area mb-3">
                <select class="select1">
                  <option value="">Your main trade</option>
                  <option>Architectural Designer</option>
                  <option>Architectural Technician</option>
                  <option>Bathroom Fitter</option>
                  <option>Bricklayer</option>
                  <option>Carpenter</option>
                  <option>Carpet & Lino Fitter</option>
                  <option>Cleaning company</option>
                  <option>Conservatory Installer</option>
                  <option>Conversions Specialist</option>
                  <option>Damp Proofing Specialist</option>
                  <option>Decking Specialist</option>
                  <option>Demolition Contractor</option>
                  <option>Driveways Installer</option>
                  <option>Electrician</option>
                  <option>Extension Builder</option>
                  <option>Fascias & Soffits Specialist</option>
                  <option>Fencer</option>
                  <option>Fireplace & Flue Specialist</option>
                  <option>Flat Roofer</option>
                  <option>Flooring Fitter</option>
                  <option>Gardener</option>
                  <option>Gas Engineer</option>
                  <option>Groundworker</option>
                  <option>Guttering Installer</option>
                  <option>Handyman</option>
                  <option>Heating Engineer</option>
                  <option>Insulation Installer</option>
                  <option>Joiner</option>
                  <option>Kitchen Fitter</option>
                  <option>Landscaper</option>
                  <option>Locksmith</option>
                  <option>Loft Conversion Specialist</option>
                  <option>New Home Builder</option>
                  <option>Painter & Decorator</option>
                  <option>Pitched Roofer</option>
                  <option>Plasterer</option>
                  <option>Plumber</option>
                  <option>Repointing Specialist</option>
                  <option>Restoration & Refurbishment Specialist</option>
                  <option>Security System Installer</option>
                  <option>Stonemason</option>
                  <option>Tarmac Specialist</option>
                  <option>Tiler</option>
                  <option>Tree Surgeon</option>
                  <option>Waste Clearance Specialist</option>
                  <option>Windows & Doors Fitter (uPVC & Metal)</option>
                  <option>Windows & Doors Fitter (Wooden)</option>
                </select>
              </div>
              <div class="mb-3">
                <input type="email" class="form-control form-input" name="email" placeholder="Parish">
              </div>

              <div class="mb-4">
                <input type="email" class="form-control form-input" name="email"
                       placeholder="Your email to receive leads">
              </div>

              <p class="p-small mb-0">By clicking Sign up for free, you agree to MyBuilder <a
                  class="text-decoration-underline" href="#">Terms and Conditions</a>.</p>
              <p class="p-small">For information on how we process your data, see our <a
                  class="text-decoration-underline" href="#">Privacy policy</a>.</p>

              <div class="text-center mt-5 mb-4">
                <button @click="$router.push('/create-account')" class="primry-btn-2 d-block w-100 btn btn-block w-unset">Sign up for free</button>
              </div>
            </div>
          </div>

        </div>
        <div class="col-md-6">
          <div class="signup-img position-relative text-white" style="border-radius: 5px;">
            <div class="overlay position-absolute w-100 h-100 top-0 start-0"></div>
            <img class="img-fluid w-100 h-100" src="../../../../public/frontend/assets/images/bg/carpenter.jpg"
                 alt="Skilled carpenter at work">
            <div class="description position-absolute text-center w-100 px-3">
              <h3 class="fw-bold">Skilled. Local. Trusted.</h3>
              <p class="text-light">Find reliable professionals for your home or business projects.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="home2-working-process mb-120">
    <div class="container">
      <div class="row mb-60">
        <div class="col-12 d-flex justify-content-center">
          <div class="section-title1 text-center">
            <h2>Steps to land the work you <span>want</span></h2>
          </div>
        </div>
      </div>
      <div class="row gy-5 justify-content-center">
        <div class="col-lg-4 col-sm-12">
          <div class="working-process-card2">
            <div class="working-process-sl">
              <h4>01</h4>
              <span></span>
            </div>
            <h4 class="font-weight-bold mb-4">Get matched with the right jobs</h4>
            <p>Set up your free profile — we’ll match you with work that fits your skills and area.</p>
          </div>
        </div>
        <div class="col-lg-4 col-sm-12">
          <div class="working-process-card2">
            <div class="working-process-sl">
              <h4>02</h4>
              <span></span>
            </div>
            <h4 class="font-weight-bold mb-4">Let us know you're interested</h4>
            <p>Respond to as many leads as you like. Customers choose who to share their detils with based on your
              profile, work history, and reviews..</p>
          </div>
        </div>
        <div class="col-lg-4 col-sm-12">
          <div class="working-process-card2">
            <div class="working-process-sl">
              <h4>03</h4>
              <span></span>
            </div>
            <h4 class="font-weight-bold mb-4">Start the conversation</h4>
            <p>If you're shortlisted, we charge a fee to access the customer's contact details, so you can connect and
              discuss the job further.</p>
          </div>
        </div>
      </div>
      <div class="row mt-50">
        <div class="col-md-4 offset-md-4 col-12 text-center">
          <button class="primry-btn-2 d-block btn w-100" type="submit">Sign up for free</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ========== Home Two Job list strat============= -->
  <div class="home2-job-list-area mb-120">
    <div class="home4-top-recruitersa-area">
      <div class="container">
        <div class="row">
          <div class="col-12 d-flex flex-wrap align-items-end justify-content-md-center gap-3">
            <div class="section-title1 text-center">
              <h2>Other <span>trades</span></h2>
            </div>
          </div>
        </div>
        <div class="row g-4 justify-content-center mb-60">
          <div class="col-xl-2 col-6">
            <div class="recruters-card trades-card">
              <div class="trades font-weight-bold">
                <h5 class="trades"><a href="company-listing1.html" class="font-weight-bold">Architectural Designer</a>
                </h5>
              </div>

            </div>
          </div>
          <div class="col-xl-2 col-6">
            <div class="recruters-card trades-card">
              <div class="trades font-weight-bold">
                <h5 class="trades"><a href="company-listing1.html" class="font-weight-bold">Architectural Technician</a>
                </h5>
              </div>

            </div>
          </div>
          <div class="col-xl-2 col-6">
            <div class="recruters-card trades-card">
              <div class="trades font-weight-bold">
                <h5 class="trades"><a href="company-listing1.html" class="font-weight-bold">Bathroom Fitter</a></h5>
              </div>

            </div>
          </div>
          <div class="col-xl-2 col-6">
            <div class="recruters-card trades-card">
              <div class="trades font-weight-bold">
                <h5 class="trades"><a href="company-listing1.html" class="font-weight-bold">Bricklayer</a></h5>
              </div>

            </div>
          </div>
          <div class="col-xl-2 col-6">
            <div class="recruters-card trades-card">
              <div class="font-weight-bold">
                <h5 class="trades"><a href="company-listing1.html" class="font-weight-bold">Carpenter</a></h5>
              </div>

            </div>
          </div>
          <div class="col-xl-2 col-6">
            <div class="recruters-card trades-card">
              <div class="trades font-weight-bold">
                <h5 class="trades"><a class="font-weight-bold">Carpet & Lino Fitter</a></h5>
              </div>

            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 d-flex justify-content-center">
            <div class="explore-btn">
              <a href="job-listing2.html">More <span><img src="assets/images/icon/explore-elliose.svg"
                                                          alt=""></span></a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <!-- ========== Home Two Job list End============= -->

  <!-- ========== Home Two Talented Area Start============= -->
  <div class="home2-talent-area mb-120">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="talent-wrap">
            <div class="talent-content">
              <h4>There's lots of demand for good <span>tradespeople</span></h4>
              <p>150,000 jobs posted every month</p>
            </div>
            <div class="find-btn">
              <a class="primry-btn-2 lg-btn" href="job-listing1.html">Sign up for free</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ========== Home Two Talented Area End============= -->

  <HomeFooter></HomeFooter>

  </body>

</template>

<script>
import HomeFooter from '../../base-layout/footer'
import topHeader from '../../base-layout/header-2'

export default {
  components: {
    HomeFooter,
    topHeader
  },

  mounted() {
    $('.sidebar-button').on("click", function(){
      $('.main-menu').addClass('show-menu');
    });

    $('.menu-close-btn').on("click", function(){
      $('.main-menu').removeClass('show-menu');
    });
// mobile-search-area

    $('.search-btn').on("click", function(){
      $('.mobile-search').addClass('slide');
    });

    $('.search-cross-btn').on("click", function(){
      $('.mobile-search').removeClass('slide');
    });
    this.$nextTick(() => {
      $('.select1').select2({
        width: '100%',
        multiple: false,
        tags:false,
        allowClear: true,
      });

    });
  }

}
</script>

<style scoped>
.form-input {
  border: 1px solid #787878 !important;
}
>>> .select1{
  /*border: 1px solid #787878 !important;*/
}
>>> .select2-selection{
  border: 0 !important;
}
.recruters-card{
  background: white !important;
}
</style>