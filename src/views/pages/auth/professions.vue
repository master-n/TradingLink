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
                  <input :id="trade.id" :value="trade.id" :checked="selectedTrades.includes(trade.id)" type="checkbox" class="form-check-input" @change="toggleTradeSelection(trade)">
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
    <!-- Steps Modal -->
    <b-modal v-model="showModal" title="Complete your registration">
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
      <template #modal-footer>
        <b-button variant="secondary" @click="showModal = false">Close</b-button>
        <b-button class="btn bg-primary-1 text-light ">Save changes</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config.json";
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
    this.getProfessions();
  },
  computed: {
    filteredTrades() {
      return this.trades.filter(trade =>
          trade.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    getTrades() {
      this.tradeLoader = true
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
    saveProfession() {
      if (this.selectedTrades.length === 0) {
        alert('Please select at least one profession.');
        return;
      }
      this.isLoading = true
      userService.saveProfession({trades: this.selectedTrades}).then((res) => {
        this.isLoading = false
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true})
          return;
        }
        this.$store.dispatch('updateUserInfo', extra)
        this.$router.push('/travel-to-work')
      });
    },
    getProfessions() {
      userService.getProfessions().then((res) => {
        const {status, message, extra} = res;
        if (status) {
          // professions are assumed to be IDs
          this.selectedTrades = extra['professions'].map((profession)=>profession.id);
        }
      });
    }

  }
};
</script>

<style scoped>

</style>
