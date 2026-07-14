<template>
  <div>
    <topHeader/>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 mt-4">
          <div class="table-wrapper2">
            <div class="title-and-btn mb-3 d-flex justify-content-between align-items-center">
              <div class="title">
                <h4>Tradespeople</h4>
              </div>
              <b-button variant="primary" @click="openAddModal">
                <i class="bi bi-plus-lg"></i> Add Tradesperson
              </b-button>
            </div>
          </div>
        </div>

        <div class="col-lg-12">
          <!-- Table -->
          <div class="">
            <div class="eg-table job-list-table">
              <div class="row mb-2">
                <!-- Search -->
                <div class="col-sm-6 col-md-12 text-end mb-4">
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                        v-model="filter"
                        type="search"
                        placeholder="Search..."
                        class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                    </div>
                    <!-- End search -->
                  </div>

                  <b-table
                      :items="tradespeople"
                      :fields="fields"
                      responsive="sm"
                      :per-page="perPage"
                      :current-page="currentPage"
                      :filter="filter"
                      :filter-included-fields="filterOn"
                      :sort-by.sync="sortBy"
                      :sort-desc.sync="sortDesc"
                      @filtered="onFiltered"
                      class="table table-bordered table-hover"
                      thead-class="bg-primary-1 text-white"
                  >

                    <template #cell(business_name)="data">
                      <h6 class="mb-0">{{ data.item.business_name || 'N/A' }}</h6>
                    </template>

                    <template #cell(name)="data">
                      <h6 class="mb-0">{{ data.item.name }}</h6>
                    </template>

                    <template #cell(email)="data">
                      {{ data.item.email }}
                    </template>

                    <template #cell(phone)="data">
                      <span class="total-number light-orange">{{ data.item.phone }}</span>
                    </template>

                    <template #cell(location)="data">
                      {{ data.item.city_name ? `${data.item.city_name}, ${data.item.parish_name}` : 'N/A' }}
                    </template>

                    <template #cell(identity_verified)="data">
                      <span class="text-capitalize badge text-white rounded-pill"
                            :class="[data.item.identity_verified ==='verified'?'bg-success':'bg-danger']">{{
                          data.item.identity_verified || 'N/A'
                        }}</span>
                    </template>

                    <template #cell(status)="data">
                      <span class="text-capitalize">{{ data.item.status }}</span>
                    </template>

                    <template #cell(is_founding_member)="data">
                      <span class="text-capitalize badge text-white rounded-pill"
                            :class="[data.item.is_founding_member ? 'bg-success' : 'bg-secondary']">{{
                          data.item.is_founding_member ? 'Founding' : 'Standard'
                        }}</span>
                    </template>

                    <template #cell(plan)="data">
                      <span
                          v-if="data.item.subscription_state"
                          class="badge rounded-pill plan-pill"
                          :style="planPillStyle(data.item.subscription_state)"
                      >
                        {{ planPillLabel(data.item.subscription_state) }}
                      </span>
                      <span v-else>—</span>
                    </template>

                    <template #cell(action)="data">
                      <div class="d-flex flex-wrap gap-1">
                        <button class="btn btn-sm me-2 btn-warning" @click="openEditModal(data.item)">Edit</button>
                        <b-button size="sm" variant="primary" class="me-2" @click="goToDetails(data.item.id)">Details
                        </b-button>
                        <b-button size="sm" variant="info" class="me-2 text-white" @click="openHistoryModal(data.item)">
                          History
                        </b-button>
                        <b-dropdown size="sm" text="Mark Paid" variant="success" class="me-2">
                          <b-dropdown-item @click="markPaid(data.item, 'monthly')">Monthly (J$5,000)</b-dropdown-item>
                          <b-dropdown-item @click="markPaid(data.item, 'annual')">Annual (J$50,000)</b-dropdown-item>
                        </b-dropdown>
                        <b-button size="sm" :variant="data.item.status === 'suspended' ? 'outline-success' : 'outline-danger'"
                                  class="me-2" @click="toggleSuspend(data.item)">
                          {{ data.item.status === 'suspended' ? 'Activate' : 'Suspend' }}
                        </b-button>
                        <b-button size="sm" :variant="data.item.is_founding_member ? 'outline-secondary' : 'outline-success'"
                                  class="me-2" @click="toggleFoundingMember(data.item)">
                          {{ data.item.is_founding_member ? 'Revoke Founding' : 'Make Founding' }}
                        </b-button>
                        <b-button size="sm" variant="danger" @click="confirmDelete(data.item)">Delete</b-button>
                      </div>
                    </template>
                  </b-table>
              <div v-if="isLoading" class="text-center my-4">
                <div class="spinner-border" role="status"></div>
              </div>

              <!-- Pagination -->
              <div class="pagination-area">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="center"
                    class="my-3 pagination"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="editModalVisible" title="Edit Tradesperson" size="xl" @ok="submitEdit" v-if="editForm">
      <b-form @submit.stop.prevent="submitEdit">

        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="Business Name">
              <b-form-input v-model="editForm.business_name"/>
            </b-form-group>
          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Business Type">
              <b-form-select class="form-control" v-model="editForm.business_type"
                             :options="['Limited company (LTD)', 'Ordinary partnership','Limited liability partnership (LLP)']"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="Name">
              <b-form-input v-model="editForm.name"/>
            </b-form-group>
          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Email">
              <b-form-input disabled v-model="editForm.email" type="email"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="Phone">
              <b-form-input v-model="editForm.phone"/>
            </b-form-group>
          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Work Address">
              <b-form-input v-model="editForm.work_address"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="City">
              <GmapAutocomplete
                  @place_changed="setPlace"
                  @click="locationError =''"
                  :options="{types: ['(cities)'],componentRestrictions: {country: 'JM'}}"
                  ref="autocomplete"
                  id="citySearch"
                  type="text"
                  :value="cityName"
                  required
                  class="form-control"
                  placeholder="Eg. Albion"
                  style="flex: 1;"
              >
              </GmapAutocomplete>
              <div v-if="locationError" class="text-danger mt-2"><i class="bi bi-info-circle"/> {{ locationError }}
              </div>
            </b-form-group>


          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Parish">
              <b-form-input disabled v-model="editForm.parish_name" type="text"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="Main Trade">
              <b-form-select
                  v-model="editForm.main_trade"
                  :options="tradeOptions"
                  value-field="id"
                  text-field="name"
                  class="form-control"
              />
            </b-form-group>

          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Marketing Consent">
              <b-form-checkbox v-model="editForm.marketing_consent" :value="1" :unchecked-value="0">
                I agree to receive marketing
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="Guarantee">
              <b-form-checkbox v-model="editForm.guarantee"/>
            </b-form-group>
          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Work Radius">
              <b-form-select v-model="editForm.travel_radius" class="form-control"
                             :options="['5','10','15','20','25','50','100',]"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="Status">
              <b-form-select v-model="editForm.status" class="form-control"
                             :options="['active', 'unsubscribed', 'pending', 'suspended', 'inactive']"/>
              <small class="form-text text-muted">
                <strong>suspended/inactive</strong> = hard block (contact support).
                <strong>unsubscribed/pending</strong> = limited access only.
              </small>
            </b-form-group>
          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Registration Status">
              <b-form-select class="form-control" v-model="editForm.registration_status"
                             :options="['in-complete', 'complete']"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="Qualification Status">
              <b-form-select class="form-control" v-model="editForm.qualification_status"
                             :options="['pending', 'approved', 'rejected']"/>
              <small class="form-text text-muted">
                Once approved, the tradesperson will earn a badge.
              </small>
            </b-form-group>
          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Registration Step">
              <b-form-input v-model="editForm.registration_step" type="number"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group label="Description">
          <b-form-textarea v-model="editForm.description" rows="3"/>
        </b-form-group>

        <hr/>
        <h5 class="mb-3">Subscription</h5>

        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="Identity Verified">
              <b-form-select v-model="editForm.identity_verified" class="form-control"
                             :options="['pending', 'verified', 'rejected']"/>
            </b-form-group>
          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Founding Member">
              <b-form-checkbox v-model="editForm.is_founding_member">
                {{ editForm.is_founding_member ? 'Founding' : 'Standard' }}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="Current plan">
              <div>
                <span
                    v-if="editForm.subscription_state"
                    class="badge rounded-pill plan-pill"
                    :style="planPillStyle(editForm.subscription_state)"
                >
                  {{ planPillLabel(editForm.subscription_state) }}
                </span>
                <span v-else>—</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Trial ends">
              <div>{{ editForm.trial_ends_at ? formatDate(editForm.trial_ends_at) : '—' }}</div>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="Mark as paid">
              <div class="d-flex gap-2">
                <b-button size="sm" variant="success" @click="markPaid(selectedTradesperson, 'monthly')">
                  Monthly (J$5,000)
                </b-button>
                <b-button size="sm" variant="success" @click="markPaid(selectedTradesperson, 'annual')">
                  Annual (J$50,000)
                </b-button>
              </div>
            </b-form-group>
          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Extend trial (weeks)">
              <div class="d-flex gap-2">
                <b-form-input v-model.number="extendWeeks" type="number" min="1" style="max-width: 100px;"/>
                <b-button size="sm" variant="outline-primary" @click="extendTrial(selectedTradesperson)">
                  Extend
                </b-button>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>

    <!-- Add Tradesperson Modal -->
    <b-modal v-model="addModalVisible" title="Add Tradesperson" size="lg" @ok="submitAdd" ok-title="Create">
      <b-form @submit.stop.prevent="submitAdd">
        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="Name">
              <b-form-input v-model="addForm.name" required/>
            </b-form-group>
          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Email">
              <b-form-input v-model="addForm.email" type="email" required/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="Phone">
              <b-form-input v-model="addForm.phone" required/>
            </b-form-group>
          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Business Name">
              <b-form-input v-model="addForm.business_name"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" class="mb-3">
            <b-form-group label="Main Trade">
              <b-form-select
                  v-model="addForm.main_trade"
                  :options="tradeOptions"
                  value-field="id"
                  text-field="name"
                  class="form-control"
              >
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Select trade --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="6" class="mb-3">
            <b-form-group label="Parish">
              <b-form-select
                  v-model="addForm.parish_id"
                  :options="parishes"
                  value-field="id"
                  text-field="name"
                  class="form-control"
              >
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Select parish --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <p class="text-muted small">
          <i class="bi bi-info-circle"></i> A password will be auto-generated and emailed to the tradesperson
          along with their login details.
        </p>
      </b-form>
    </b-modal>

    <!-- Subscription History Modal -->
    <b-modal v-model="historyModalVisible" title="Subscription History" size="lg" hide-footer>
      <div v-if="historyLoading" class="text-center py-4">
        <div class="spinner-border" role="status"></div>
      </div>
      <div v-else>
        <ul class="list-group" v-if="history.length">
          <li class="list-group-item" v-for="(event, i) in history" :key="i">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <strong class="text-capitalize">{{ (event.event_type || '').replace(/_/g, ' ') }}</strong>
                <span v-if="event.plan" class="text-muted"> — {{ event.plan }}</span>
                <div v-if="event.note" class="text-muted small">{{ event.note }}</div>
              </div>
              <small class="text-muted">{{ event.created_at ? formatDate(event.created_at) : '' }}</small>
            </div>
          </li>
        </ul>
        <p v-else class="text-muted text-center mb-0">No subscription history yet.</p>
      </div>
    </b-modal>

  </div>
</template>

<script>
import HomeFooter from '../../base-layout/footer';
import topHeader from '../../base-layout/admin-header'
import SideBar from '../../base-layout/navigation/tradesperson-sidebar';
import MobileFooter from '../../../components/mobile-nav';
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";
import {confirm} from "@/utils/functions";

export default {
  name: 'AdminTradepeople',
  page: {
    title: "Admin My Projects",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO,
      showSidebar: false,
      isMobile: false,
      isLoading: false,
      tradespeople: [],
      fields: [
        {key: 'business_name', label: 'Business Name', sortable: true},
        {key: 'name', sortable: true},
        {key: 'email', sortable: true},
        {key: 'phone', sortable: true},
        {
          key: 'location',
          label: 'Location',
          sortable: true,
          sortByFormatted: true,
          formatter: (value, key, item) => (item.city_name ? `${item.city_name}, ${item.parish_name}` : 'N/A'),
        },
        {key: 'status', sortable: true},
        {label: 'Identity Verified', key: 'identity_verified', sortable: true},
        {label: 'Founding Member', key: 'is_founding_member', sortable: true},
        {
          label: 'Plan',
          key: 'plan',
          sortable: true,
          sortByFormatted: true,
          formatter: (value, key, item) => (item.subscription_state ? (item.subscription_state.plan || '') : ''),
        },
        {key: 'action', label: 'Action'}
      ],
      filter: '',
      filterOn: ['name', 'email', 'phone', 'city_name', 'parish_name', 'status'],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      sortBy: 'name',
      sortDesc: false,
      editForm: null,
      editModalVisible: false,
      trades: [],
      locationError: '',
      cityName: '',
      parishName: '',
      selectedTradesperson: null,
      addModalVisible: false,
      addForm: {
        name: '',
        email: '',
        phone: '',
        business_name: '',
        main_trade: null,
        parish_id: null,
      },
      parishes: [],
      extendWeeks: 4,
      historyModalVisible: false,
      historyLoading: false,
      history: [],
    };
  },
  components: {
    HomeFooter,
    topHeader,
    SideBar,
    MobileFooter
  },
  computed: {
    loggedIn() {
      return this.$store.getters.GET_USER_INFO;
    },
    tradeOptions() {
      return this.trades || [];
    }
  },
  methods: {
    submitEdit() {
      if (!this.selectedTradesperson) return;
      const id = this.selectedTradesperson.id;

      const payload = {
        parish_name: this.editForm.parish_name,
        city_name: this.cityName,
        business_name: this.editForm.business_name,
        business_type: this.editForm.business_type,
        name: this.editForm.name,
        email: this.editForm.email,
        phone: this.editForm.phone,
        work_address: this.editForm.work_address,
        main_trade: this.editForm.main_trade,
        marketing_consent: this.editForm.marketing_consent,
        guarantee: this.editForm.guarantee,
        work_all_jamaica: this.editForm.work_all_jamaica,
        latitude: this.editForm.latitude,
        longitude: this.editForm.longitude,
        status: this.editForm.status,
        registration_status: this.editForm.registration_status,
        qualification_status: this.editForm.qualification_status,
        registration_step: this.editForm.registration_step,
        description: this.editForm.description,
      };

      const followUps = [];
      const original = this.selectedTradesperson;

      if (original && !!original.is_founding_member !== !!this.editForm.is_founding_member) {
        followUps.push(userService.toggleFoundingMember(id, !!this.editForm.is_founding_member));
      }

      if (original && original.identity_verified !== this.editForm.identity_verified) {
        followUps.push(userService.verifyIdentity({user_id: id, identity_verified: this.editForm.identity_verified}));
      }

      userService.updateTradesperson(id, payload).then((res) => {
        const {status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message, showSwal: true});
          return;
        }

        Promise.all(followUps).finally(() => {
          this.$store.dispatch('success', {message, showSwal: true});
          this.editModalVisible = false;
          this.getTradePeople();
        });
      });
    },

    openEditModal(item) {
      this.selectedTradesperson = item;
      this.editForm = {...item};
      this.cityName = item.city_name || '';
      this.extendWeeks = 4;
      this.editModalVisible = true;
    },

    openAddModal() {
      this.addForm = {
        name: '',
        email: '',
        phone: '',
        business_name: '',
        main_trade: null,
        parish_id: null,
      };
      this.addModalVisible = true;
    },

    submitAdd() {
      userService.createTradesperson(this.addForm).then((res) => {
        const {status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message, showSwal: true});
          return;
        }
        this.$store.dispatch('success', {message: message || 'Tradesperson created; login details emailed.', showSwal: true});
        this.addModalVisible = false;
        this.getTradePeople();
      });
    },

    getParishCities() {
      userService.getParishCities().then((res) => {
        const {extra, status} = res;
        if (status) {
          this.parishes = extra;
        }
      });
    },

    markPaid(item, plan) {
      if (!item) return;
      confirm(`Mark "${item.name}" as paid (${plan})?`, () => {
        this.isLoading = true;
        userService.markPlanPaid(item.id, plan).then((res) => {
          this.isLoading = false;
          const {status, message} = res;
          if (!status) {
            this.$store.dispatch('error', {message, showSwal: true});
            return;
          }
          this.$store.dispatch('success', {message, showSwal: true});
          this.editModalVisible = false;
          this.getTradePeople();
        });
      });
    },

    extendTrial(item) {
      if (!item) return;
      const weeks = Number(this.extendWeeks) || 4;
      userService.extendTrial(item.id, weeks).then((res) => {
        const {status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message, showSwal: true});
          return;
        }
        this.$store.dispatch('success', {message, showSwal: true});
        this.editModalVisible = false;
        this.getTradePeople();
      });
    },

    toggleSuspend(item) {
      const newStatus = item.status === 'suspended' ? 'active' : 'suspended';
      const action = newStatus === 'suspended' ? 'suspend' : 'activate';
      confirm(`Are you sure you want to ${action} "${item.name}"?`, () => {
        this.isLoading = true;
        userService.updateTradesperson(item.id, {status: newStatus}).then((res) => {
          this.isLoading = false;
          const {status, message} = res;
          if (!status) {
            this.$store.dispatch('error', {message, showSwal: true});
            return;
          }
          this.$store.dispatch('success', {message, showSwal: true});
          this.getTradePeople();
        });
      });
    },

    openHistoryModal(item) {
      this.historyModalVisible = true;
      this.historyLoading = true;
      this.history = [];
      userService.getSubscriptionHistory(item.id).then((res) => {
        this.historyLoading = false;
        const {extra, status} = res;
        if (status) {
          this.history = extra || [];
        }
      });
    },

    planPillLabel(state) {
      if (!state) return '—';
      if (state.plan === 'trial') {
        const days = Number(state.days_remaining);
        return `${state.label || 'Trial'} (${Number.isFinite(days) ? days : 0}d left)`;
      }
      if (state.plan === 'monthly' || state.plan === 'annual') {
        return 'Active';
      }
      return state.label || '—';
    },

    planPillStyle(state) {
      if (!state) return {};
      switch (state.plan) {
        case 'founding':
          return {backgroundColor: '#F5A623', color: '#1a1a1a'};
        case 'trial':
          return {backgroundColor: '#00A7AC', color: '#ffffff'};
        case 'monthly':
        case 'annual':
          return {backgroundColor: 'transparent', color: '#13452E', border: '1px solid #13452E'};
        case 'expired':
          return {backgroundColor: '#adb5bd', color: '#ffffff'};
        default:
          return {backgroundColor: '#e9ecef', color: '#495057'};
      }
    },

    formatDate(value) {
      return value ? new Date(value).toLocaleDateString() : '—';
    },

    setPlace() {
      const autocomplete = this.$refs.autocomplete.$autocomplete;
      if (autocomplete) {
        const place = autocomplete.getPlace();
        this.editForm.latitude = place.geometry.location.lat();
        this.editForm.longitude = place.geometry.location.lng();
        this.reverseGeocode(this.editForm.latitude, this.editForm.longitude);
      }
    },

    reverseGeocode(lat, lng) {
      this.$gmapApiPromiseLazy().then(() => {
        const geocoder = new google.maps.Geocoder();
        const latlng = {lat, lng};

        geocoder.geocode({location: latlng}, (results, status) => {
          if (status === 'OK' && results[0]) {
            const addressComponents = results[0].address_components;

            const cityComponent = addressComponents.find(comp =>
                comp.types.includes('locality')
            );

            const parishComponent = addressComponents.find(comp =>
                comp.types.includes('administrative_area_level_1')
            );

            this.cityName = cityComponent ? cityComponent.long_name : '';

            this.editForm.parish_name = parishComponent ? parishComponent.long_name : '';

          } else {
            console.log('Reverse geocoding failed:', status);
          }
        });
      });
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getTradePeople() {
      this.isLoading = true;
      userService.getTradePeople().then((res) => {
        this.isLoading = false;
        const {extra, status} = res;
        if (status) {
          this.tradespeople = extra;
        }
      });
    },
    async getTrades() {
      userService.getTrades().then((res) => {
        this.trades = res.extra;
      });
    },

    confirmDelete(item) {
      confirm(`Are you sure you want to delete trades person "${item.name}"? This action cannot be undone.`, () => {
        this.deleteTrade(item.id);
      })
    },

    deleteTrade(id) {
      this.isLoading = true;
      userService.deleteTradesPerson(id).then((res) => {
        this.isLoading= false;
        const {status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message, showSwal: true});
          return;
        }
        this.$store.dispatch('success', {message, showSwal: true});
        this.getTradePeople(); // refresh list after deletion
      })
    },

    goToDetails(id) {
      this.$router.push({name: 'TradePersonDetails', params: {id}});
    },

    toggleFoundingMember(item) {
      const newValue = !item.is_founding_member;
      const action = newValue ? 'grant' : 'revoke';
      confirm(`Are you sure you want to ${action} founding member status for "${item.name}"?`, () => {
        this.isLoading = true;
        userService.toggleFoundingMember(item.id, newValue).then((res) => {
          this.isLoading = false;
          const {status, message} = res;
          if (!status) {
            this.$store.dispatch('error', {message, showSwal: true});
            return;
          }
          this.$store.dispatch('success', {message, showSwal: true});
          this.getTradePeople();
        });
      });
    }
  },
  created() {
    this.getTradePeople();
    this.getTrades();
    this.getParishCities();

  },
  mounted() {
    $('#tradespeople').addClass('active')
  },
};
</script>

<style scoped>
.plan-pill {
  padding: 0.35em 0.75em;
  font-weight: 600;
  font-size: 0.8rem;
  display: inline-block;
}
</style>
