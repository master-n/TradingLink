<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Work Area</h4>
    </template>

    <div class="row">
      <div class="col-md-8">
        <p class="fw-lighter">This is the area you are prepared to travel for work and ensures you receive relevant
          leads.</p>
        <div class="card mb-4">
          <div class="card-body">
            <div class="slider-container">
              <label for="radiusSlider">Distance area: {{ radius }} miles</label>
              <input type="range" class="custom-slider w-100" id="radiusSlider" v-model="radius" min="1" max="100"/>
            </div>

          </div>
        </div>

        <gmap-map :center="center" :zoom="10" style="width: 100%; height: 400px">
          <gmap-circle :center="center" :radius="radius * 1609.34" :options="circleOptions"></gmap-circle>
          <gmap-marker :position="center" :draggable="false" @dragend="updateCenter"></gmap-marker>
        </gmap-map>

        <div class="form-group form-check my-4">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="workThroughoutJamaica">
          <label class="form-check-label font-weight-lighter" for="exampleCheck1">I work throughout Jamaica</label>
        </div>

        <div class="col-12">
          <button class="btn primry-btn-2 d-inline-block text-light big-button" @click="save" :disabled="isLoading">
            <b-spinner small v-if="isLoading"></b-spinner>
            {{ isLoading ? 'Saving' : 'Save Changes' }}
          </button>
        </div>
      </div>
    </div>

  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/tradesperson-dashboard';
import appConfig from "../../../../app.config.json";
import {gmapApi} from 'vue2-google-maps';
import {userService} from "@/apis/user.service";

export default {
  name: "WorkArea",
  page: {
    title: "Work Area",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      isLoading: false,
      center: {lat: 18.1096, lng: -77.2975}, // Default center (Kingston)
      radius: 10,
      workThroughoutJamaica: false,
      circleOptions: {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      },
      user: {}
    };
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
    getUserInfo() {
      userService.getUserInfo().then((res) => {
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.user = extra;
        if (this.user.city && this.user.city.latitude && this.user.city.longitude) {
          this.center = {
            lat: parseFloat(this.user.city.latitude),
            lng: parseFloat(this.user.city.longitude),
          };

          this.radius = this.user.travel_radius || 10;
        }
      });
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
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
      });
    },


  },
  components: {
    BaseDashboardLayout,
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    $('#work-area').addClass('active')
  },
};
</script>
