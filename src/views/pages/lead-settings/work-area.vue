<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Work Area</h4>
    </template>

    <div class="row" style="margin-bottom: 6rem">
      <div class="col-md-8">
        <p class="fw-lighter">This is the area you are prepared to travel for work and ensures you receive relevant leads.</p>

        <div class="card mb-4">
          <div class="card-body">
            <!-- Search input -->
            <div class="form-group mb-4">
              <label for="citySearch" class="fw-bold mb-2">Current location</label>
              <div class="d-flex align-items-center">
                <input
                    id="citySearch"
                    v-model="user.cityName"
                    type="text"
                    class="form-control me-3"
                    ref="autocompleteInput"
                    placeholder="Enter city name"
                    style="flex: 1;"
                >
                <div style="width: 1px; height: 38px; background-color: #ddd;"></div> <!-- vertical divider -->
                <input
                    type="text"
                    class="form-control ms-3"
                    :value="user.parishName"
                    disabled
                    placeholder="Parish"
                    style="width: 150px; background-color: #f8f9fa; border-color: #ddd;"
                >
              </div>
            </div>


            <div class="form-group">
              <label for="radiusSelect" class="fw-bold mb-2">Distance area</label>
              <select id="radiusSelect" class="form-control" v-model="radius">
                <option :value="radius" disabled>{{radius}} miles</option>
                <option :value="5">5 miles</option>
                <option :value="10">10 miles</option>
                <option :value="15">15 miles</option>
                <option :value="20">20 miles</option>
                <option :value="25">25 miles</option>
                <option :value="50">50 miles</option>
                <option :value="100">100 miles</option>
                <option :value="200">200 miles</option>
                <option :value="300">300 miles</option>
                <option :value="'all'">I work throughout Jamaica</option>
              </select>
            </div>

          </div>
        </div>

        <h6 class="fw-bold">Drag the pin to adjust your working distance</h6>
        <gmap-map :center="center" :zoom="10" style="width: 100%; height: 400px" :options="mapOptions">
          <gmap-circle :center="center" :radius="radius * 1609.34" :options="circleOptions"></gmap-circle>
          <gmap-marker :position="center" :draggable="true" @dragend="updateCenter"></gmap-marker>
        </gmap-map>

        <div class="col-12 mt-4">
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
      center: {lat: 18.1096, lng: -77.2975},
      radius: 10,
      workThroughoutJamaica: false,
      city:'',
      mapOptions: {
        restriction: {
          latLngBounds: {
            north: 18.6000,
            south: 17.7000,
            west: -78.5000,
            east: -76.0000
          },
          strictBounds: true
        }
      },
      circleOptions: {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      },
      user: {
        cityName: '',
        parishName: ''
      }
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
      this.reverseGeocode(this.center.lat, this.center.lng);
    },
    reverseGeocode(lat, lng) {
      if (!this.google) return;
      const geocoder = new this.google.maps.Geocoder();
      const latlng = { lat, lng };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const addressComponents = results[0].address_components;

          const cityComponent = addressComponents.find(comp =>
              comp.types.includes('locality')
          );
          const parishComponent = addressComponents.find(comp =>
              comp.types.includes('administrative_area_level_1')
          );

          this.user.cityName = cityComponent ? cityComponent.long_name : '';
          this.user.parishName = parishComponent ? parishComponent.long_name : '';

        } else {
          console.log('Reverse geocoding failed:', status);
        }
      });
    },

    initAutocomplete() {
      if (!this.google) return;
      const autocomplete = new this.google.maps.places.Autocomplete(this.$refs.autocompleteInput, {
        types: ['(cities)'],
        componentRestrictions: { country: 'JM' }
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        this.reverseGeocode(this.center.lat, this.center.lng);
      });
    },

    getUserInfo() {
      userService.getUserInfo().then((res) => {
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        const user = extra;
        if (user.latitude && user.longitude) {
          this.center = {
            lat: parseFloat(user.latitude),
            lng: parseFloat(user.longitude),
          };
        }
        this.user.cityName = user.city || ''
        this.user.parishName = user.parish || ''
        this.radius = user.travel_radius || 10;
      });
    },

    async save() {
      this.isLoading = true;
      userService.workArea({
        travel_radius: this.radius,
        latitude: this.center.lat,
        longitude: this.center.lng,
        city_name: this.user.cityName,
        parish_name: this.user.parishName
      }).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.$store.dispatch('updateUserInfo', extra)
        this.$store.dispatch('success', {message: message, showSwal: true});

      });
    },
  },
  components: {
    BaseDashboardLayout,
  },
  created() {
    this.getUserInfo();
    setTimeout(() => {
      this.initAutocomplete();
    },1000);
  },
  mounted() {
    $('#work-area').addClass('active');
  },
};
</script>

<style scoped>
.form-control:focus {
  font-weight: lighter !important;
}

.form-control{
  font-weight: lighter !important;
}
</style>
