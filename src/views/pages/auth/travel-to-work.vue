<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h1 class="fw-bold mb-0">Work Details</h1>
              <router-link to="/professions" class="ms-auto">
                <a href="#" class="text-decoration-underline me-2">Cancel</a>
                <a href="#" aria-label="Close"><i class="fa fa-times"></i></a>
              </router-link>
            </div>

            <div class="progress">
              <div class="progress-bar w-25 bg-primary-1" role="progressbar"></div>
            </div>

            <div class="d-flex align-items-center justify-content-between mt-3">
              <h6 class="mb-0">Step 1/5</h6>
              <div class="ms-auto cursor-pointer">
                <a @click="showModal = true" class="me-2" aria-label="Close"><i class="fa fa-info-circle"></i></a>
                <a @click="showModal = true" class="text-decoration-underline">All Steps</a>
              </div>
            </div>

            <div class="form-wrapper mt-5">
              <h3 class="font-weight-bold mb-4">How far can you travel for work?</h3>
              <p class="font-weight-lighter">Set the maximum distance you are willing to travel from Kingston.</p>

              <div class="slider-container mb-4">
                <label for="radiusSlider">Radius: {{ radius }} miles</label>
                <input type="range" class="custom-slider w-100" id="radiusSlider" v-model="radius" min="1" max="100"/>
              </div>

              <gmap-map :center="center" :zoom="10" style="width: 100%; height: 400px">
                <gmap-circle :center="center" :radius="radius * 1609.34" :options="circleOptions"></gmap-circle>
                <gmap-marker :position="center" :draggable="true" @dragend="updateCenter"></gmap-marker>
              </gmap-map>

              <div class="form-group form-check mb-5 mt-4">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="workThroughoutJamaica">
                <label class="form-check-label font-weight-lighter" for="exampleCheck1">I work throughout Jamaica</label>
              </div>

              <div class="button-container mt-5">
                <div class="col-12">
                  <button class="btn btn-outline-primary-1 me-3 big-button" @click="$router.go(-1)">Back</button>
                  <button class="btn primry-btn-2 d-inline-block text-light big-button" @click="save" :disabled="isLoading">
                    <b-spinner small v-if="isLoading"></b-spinner>
                    {{ isLoading ? 'Saving' : 'Continue' }}
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
        <b-button class="btn bg-primary-1 text-light">Save changes</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import topHeader from '../../base-layout/header-1';
import { gmapApi } from 'vue2-google-maps';
import { userService } from "@/apis/user.service";

export default {
  page: {
    title: "Travel To Work",
    meta: [{ name: "description", content: "Description of your page" }],
  },
  data() {
    return {
      showModal: false,
      step: 2,
      center: { lat: 18.1096, lng: -77.2975 }, // Default center (Kingston)
      radius: 10,
      workThroughoutJamaica: false,
      circleOptions: {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      },
      isLoading: false,
      user: {},
    };
  },
  components: {
    topHeader,
  },
  computed: {
    google: gmapApi,
  },
  watch: {
    workThroughoutJamaica(newValue) {
      if (newValue) {
        this.radius = 100;
      } else {
        this.radius = 10;
      }
    },
    radius(newValue) {
      if (newValue !== 100) {
        this.workThroughoutJamaica = false;
      }
    }
  },
  methods: {
    updateCenter(location) {
      this.center = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      };
    },
    async save() {
      this.isLoading = true;
      userService.saveTravelToWork({
        travel_radius: this.radius,
        work_all_jamaica: this.workThroughoutJamaica,
        latitude: this.center.lat,
        longitude: this.center.lng,
      }).then((res) => {
        this.isLoading = false;
        const { status, message, extra } = res;
        if (!status) {
          this.$store.dispatch('error', { message: message, showSwal: true });
          return;
        }
        this.$store.dispatch('updateUserInfo', extra);
        this.$router.push('/business-type');
      });
    },
    getUserInfo() {
      userService.getUserInfo().then((res) => {
        const { status, message, extra } = res;
        if (!status) {
          this.$store.dispatch('error', { message: message, showSwal: true });
          return;
        }
        this.user = extra;
        if (this.user.city && this.user.city.latitude && this.user.city.longitude) {
          this.center = {
            lat: this.user.city.latitude,
            lng: this.user.city.longitude,
          };
        }
      });
    }
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style scoped>
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
  width: 20%;
}
</style>
