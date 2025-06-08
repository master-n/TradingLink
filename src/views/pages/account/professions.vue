<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">

            <div class="d-flex align-items-center justify-content-between mb-4">
              <h1 class="fw-bold mb-0">Work Details</h1>

              <router-link to="/about-you" class="ms-auto">
                <a href="#" class="text-decoration-underline me-2">Cancel</a>
                <a href="#" aria-label="Close"><i class="fa fa-times"></i></a>
              </router-link>
            </div>

            <div class="progress">
              <div class="progress-bar w-25 bg-primary-1" role="progressbar"></div>
            </div>

            <div class="d-flex align-items-center justify-content-between mt-3">
              <h6 class=" mb-0">Step 1/5</h6>
              <div class="ms-auto cursor-pointer">
                <a @click="showModal = true" class="me-2" aria-label="Close"><i class="fa fa-info-circle"></i></a>
                <a @click="showModal = true" class="text-decoration-underline" >All Steps</a>
              </div>

            </div>
            <div class="form-wrapper mt-5">
              <h3 class="font-weight-bold mb-4">Select up to 5 professions</h3>
              <p class="font-weight-lighter">Tell us what you do so we can send you the most relevant leads.</p>

              <div class="mb-3">
                <label for="searchTrades" class="form-label font-weight-bold">Search trades</label>
                <div class="input-group">
                  <input type="text" class="form-control py-2" id="searchTrades" placeholder="i.e Gardener"
                         v-model="searchQuery">
                  <button class="btn btn-outline-secondary" type="button" @click="searchQuery = ''">×</button>
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-center my-4">
                <h6 class="mb-0 font-weight-bold">Selected</h6>
                <div class="selected-count">{{ selectedTrades.length }}</div>
              </div>

              <div class="profession-list">
                <div class="profession-item" v-for="trade in filteredTrades" :key="trade.id">
                  <label :for="trade.id">{{ trade.name }}</label>
                  <input :id="trade.id" type="checkbox" class="form-check-input" @change="toggleTradeSelection(trade)">
                </div>
                <div v-if="tradeLoader">
                  <div v-for="(item,i) in 10" :key="i">
                    <div class="profession-item">
                      <div class="lines shine"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="button-container">
                  <div class="col-12">
                    <button class="btn btn-outline-primary-1 me-3 big-button" @click="$router.go(-1)">Back</button>
                    <button class="btn primry-btn-2 d-inline-block text-light big-button" @click="saveProfession">
                      Continue
                    </button>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
<!--    steps modal-->
    <div v-if="showModal" class="modal fade show" data-backdrop="true">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Complete your registration</h5>
            <button type="button" class="btn-close" @click="showModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="registration-steps">
              <div class="step completed">
                <span class="step-icon">✓</span>
                <span class="step-text">Work details</span>
              </div>
              <div class="step completed">
                <span class="step-icon">✓</span>
                <span class="step-text">ID Check</span>
              </div>
              <div class="step completed">
                <span class="step-icon">✓</span>
                <span class="step-text">Safety & Quality</span>
              </div>
              <div class="step">
                <span class="step-icon">4</span>
                <span class="step-text">Profile Setup</span>
              </div>
            </div>
          </div>
          <div class="modal-footer mb-5">
            <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Backdrop -->
    <div v-if="showModal" class="modal-backdrop fade show" @click="showModal=false"></div>

  </div>
</template>

<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config";
import topHeader from '../../base-layout/header-1'

import {required, email} from "vuelidate/lib/validators";
import store from "@/store/store";
import {userService} from "@/apis/user.service";

/**
 * Profession component
 */
export default {
  page: {
    title: "Profession",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      showModal: false,
      email: "",
      password: "",
      success: false,
      error: false,
      errorMessage: '',
      trades: [],
      searchQuery: '',
      selectedTrades: [],
      tradeLoader: false
    };
  },
  components: {
    Auth,
    topHeader
  },
  created() {
    this.getTrades();
  },
  computed: {
    filteredTrades() {
      return this.trades.filter(trade =>
          trade.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async getTrades() {
      this.tradeLoader = true
      await this.$store.dispatch('showLoader')
      userService.getTrades().then((res) => {
        this.trades = res.extra;
        this.tradeLoader = false
      });
    },
    toggleTradeSelection(trade) {
      const index = this.selectedTrades.indexOf(trade.id);
      if (index === -1) {
        if (this.selectedTrades.length < 5) {
          this.selectedTrades.push(trade.id);
        } else {
          alert('You can select up to 5 professions.');
        }
      } else {
        this.selectedTrades.splice(index, 1);
      }
    },

    async saveProfession() {
      if (this.selectedTrades.length === 0) {
        alert('Please select at least one profession.');
        return;
      }
      this.isLoading = true
      await this.$store.dispatch('showLoader')
      userService.saveProfession({trades: this.selectedTrades}).then((res) => {
        this.$store.dispatch('hideLoader')
        this.isLoading = false
        const {status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true})
          return;
        }
        this.$router.push('/travel-to-work')
      });
    },
  }
};
</script>

<style scoped>
/* Ensure the modal is displayed */
.modal.show {
  display: block;
}

.modal-dialog {
  position: relative;
  max-width: 500px !important;
}

.registration-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
}

.step.completed {
  background-color: #e9f7ef;
  color: #28a745;
}

.step-icon {
  font-weight: bold;
}


.progress-bar {
  height: 100%;
  background-color: var(--primary-color1);
  width: 20%; /* Adjust based on step */
}

.selected-count {
  background-color: var(--primary-color1);
  color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.profession-item {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profession-item label{
  font-weight: lighter;
  cursor: pointer;
}

</style>
