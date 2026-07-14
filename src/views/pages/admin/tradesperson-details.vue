<template>
  <div>
    <topHeader />

    <div class="mt-4 text-end pe-4 container">
      <router-link to="/admin/tradespeople" class="mb-4">
        <i class="bi bi-chevron-left"></i> Back to Menu
      </router-link>
    </div>

    <div class="container py-4">
      <h3 class="mb-4">Tradesperson - {{ trade.name }}</h3>

      <div v-if="loading" class="text-center my-4">
        <div class="spinner-border" role="status"></div>
      </div>

      <div v-else>

        <div class="mb-4 d-flex align-items-center ">
          <img v-if="trade.photo" :src="trade.photo" alt="Company Logo"
               class="rounded-circle me-3" width="60"
               height="60" style="object-fit: cover;"/>
          <div v-else class="profile-image cursor-pointer rounded-circle" style="width: 70px; height: 70px;">
            <i class="bi bi-person-fill"></i>
          </div>
          <div class="text-muted mb-2">
            <i class="bi bi-star-fill text-primary-1"></i> {{ trade.average_rating }}/5 Rating
          </div>
        </div>

        <a :href="`/user-profile/${trade.id}`" target="_blank" class="btn btn-sm btn-dark mb-3">View Public Profile</a>
        <div class="row mb-3">
          <div class="col-md-6 mb-2">
            <strong>Email:</strong> {{ trade.email }}
          </div>
          <div class="col-md-6 mb-2">
            <strong>Phone:</strong> {{ trade.phone }}
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6 mb-2">
            <strong>Location:</strong>
            {{ trade.city_name || 'N/A' }}, {{ trade.parish_name || 'N/A' }}
          </div>
          <div class="col-md-6 mb-2">
            <strong>Status:</strong> {{ trade.status }}
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6 mb-2">
            <strong>Business Name:</strong> {{ trade.business_name || 'N/A' }}
          </div>
          <div class="col-md-6 mb-2">
            <strong>Business Type:</strong> {{ trade.business_type || 'N/A' }}
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6 mb-2">
            <strong>Main Trade:</strong> {{ trade.main_trade?.name || 'N/A' }}
          </div>
          <div class="col-md-6 mb-2">
            <strong>Offers Guarantee:</strong> {{ trade.guarantee ? 'Yes' : 'No' }}
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6 mb-2">
            <strong>Work Address:</strong> {{ trade.work_address || 'N/A' }}
          </div>
          <div class="col-md-6 mb-2">
            <strong>Travel Radius:</strong> {{ trade.travel_radius || 'N/A' }} miles
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-12 mb-2">
            <strong>Description:</strong> {{ trade.description || 'N/A' }}
          </div>
        </div>

        <!-- Identity File -->
        <div class="row mb-4">
          <div class="col-md-12">
            <h5>Identity Document</h5>
            <div v-if="trade.identity_file">
              <span class="me-3">Type: {{ trade.identity_type }}</span>

              <a target="_blank" :href="trade.identity_file" class="btn btn-link btn-sm"><i class="bi bi-eye"/> View
                Identity File</a>
            </div>
            <div v-else>
              <p><em>No identity document uploaded.</em></p>
            </div>

            <div class="mt-2 mb-3">
              Status: <span class="badge text-white rounded-pill"
                            :class="[trade.identity_verified ==='verified'?'bg-success':'bg-danger']">{{
                trade.identity_verified || 'N/A'
              }}</span>
            </div>

            <div v-if="trade.identity_verified !=='verified'">
              <button class="btn btn-danger btn-sm me-2" v-if="trade.identity_verified !=='rejected'" @click="verifyIdentity('rejected')">Reject</button>
              <button class="btn btn-primary btn-sm" @click="verifyIdentity('verified')">Approve</button>
            </div>
          </div>
        </div>

        <!-- Skills Verification -->
        <div class="row mb-4">
          <div class="col-md-12">
            <h5>Skills Verification</h5>
            <div v-if="trade.skill_verification_file">
              <a target="_blank" :href="trade.skill_verification_file" class="btn btn-link btn-sm"><i
                  class="bi bi-eye"/> View Skills File</a>
            </div>
            <div v-else>
              <p><em>No skills verification file uploaded.</em></p>
            </div>
          </div>
        </div>

        <!-- Qualifications -->
        <div class="row mb-4">
          <div class="col-md-12">
            <h5>Qualifications</h5>

            <div v-if="trade.qualifications && trade.qualifications.length">
              <ul class="list-group">
                <li v-for="(q, index) in trade.qualifications" :key="q.id"
                    class="list-group-item d-flex justify-content-between align-items-center">
                  <span>Document {{ index + 1 }}</span>
                  <a class="btn btn-link btn-sm" :href="q.full_path" target="_blank">
                    <i class="bi bi-eye"></i> View
                  </a>
                </li>
              </ul>
              <div class="mt-3">
                <strong>Status:</strong>
                <span class="badge text-white rounded-pill ms-1"
                      :class="{
          'bg-secondary': trade.qualification_status === 'pending',
          'bg-success': trade.qualification_status === 'approved',
          'bg-danger': trade.qualification_status === 'rejected'
        }">
    {{ trade.qualification_status || 'Pending' }}
  </span>
              </div>

              <div class="mt-3">
                <label class="form-label"><strong>Stated qualifications</strong> <small class="text-muted">(typed by admin — shown on the public profile; the certificate itself stays private)</small></label>
                <textarea class="form-control" rows="2" v-model="qualificationText"
                          placeholder="e.g. Plumber NVQ, HEART Trust, Level 3"></textarea>
                <button class="btn btn-outline-primary btn-sm mt-2" :disabled="loading" @click="saveQualificationText">
                  Save qualification details
                </button>
              </div>


              <div class="mt-2" v-if="trade.qualification_status !== 'approved'">
                <button class="btn btn-danger btn-sm me-2"
                        v-if="trade.qualification_status !== 'rejected'"
                        @click="updateQualificationStatus('rejected')">Reject
                </button>
                <button class="btn btn-primary btn-sm"
                        @click="updateQualificationStatus('approved')">Approve
                </button>
              </div>


            </div>

            <div v-else>
              <p><em>No qualifications uploaded.</em></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import topHeader from '../../base-layout/admin-top-nav';
import {userService} from '@/apis/user.service';
import appConfig from "../../../../app.config.json";
import tradespeople from "@/views/pages/admin/tradespeople";
import {confirm} from "@/utils/functions"; // your API service

export default {
  components: {topHeader},
  name: "Tradesperson",
  page: {
    title: "Tradesperson Details",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      trade: {},
      qualificationText: '',
      loading: false,
    };
  },
  methods: {
    async updateQualificationStatus(status) {
      confirm("Are you sure you want to approve this qualification?",  () => {
        this.loading = true;
        const payload = {
          user_id: this.trade.id,
          qualification_status: status,
          qualification_text: this.qualificationText
        };
        userService.updateQualificationStatus(payload).then((res) => {
          this.loading = false;
          const {extra, status, message} = res;
          if (!status) {
            this.$store.dispatch('error', {message, showSwal: true});
            return;
          }
          this.trade.qualification_status = extra;
        });

      });
    },
    // Save the admin-typed public qualification text without changing the
    // approve/reject status (reuses the same endpoint with the current status).
    saveQualificationText() {
      this.loading = true;
      userService.updateQualificationStatus({
        user_id: this.trade.id,
        qualification_status: this.trade.qualification_status || 'pending',
        qualification_text: this.qualificationText,
      }).then((res) => {
        this.loading = false;
        if (!res.status) {
          this.$store.dispatch('error', { message: res.message, showSwal: true });
          return;
        }
        this.trade.qualification_text = this.qualificationText;
      });
    },

    async fetchTradePerson() {
      this.loading = true;
      userService.getTradesperson(this.$route.params.id).then((res) => {
        this.loading = false;
        const {extra, status} = res;
        if (!status) {
          alert('Tradeperson not found');
          this.$router.back();
        }
        this.trade = extra;
        this.qualificationText = (extra && extra.qualification_text) || '';

      });

    },

    async verifyIdentity(type) {
      confirm("This action cannot be reverted", () => {
        this.loading = true;
        const payload = {
          user_id: this.trade.id,
          identity_verified: type,
        }
        userService.verifyIdentity(payload).then((res) => {
          this.loading = false;
          const {extra, status} = res;
          if (!status) {
            this.$store.dispatch('error', {message: message, showSwal: true});
            return;
          }
          this.trade.identity_verified = extra;
        });
      });
    }
  },
  mounted() {
    this.fetchTradePerson();
  }
};
</script>
