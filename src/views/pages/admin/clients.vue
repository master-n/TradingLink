<template>
  <div>
    <topHeader/>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 mt-4">
          <div class="table-wrapper2">
            <div class="title-and-btn mb-3">
              <div class="title">
                <h4>Clients</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="table-wrapper2">
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
                  :items="homeowners"
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
              >

                <template #cell(name)="data">
                  <h5 class="mb-0">{{ data.item.name }}</h5>
                </template>

                <template #cell(email)="data">
                  {{ data.item.email }}
                </template>

                <template #cell(phone)="data">
                  <span class="total-number light-orange">{{ data.item.phone }}</span>
                </template>

                <template #cell(status)="data">
                  <span class="text-capitalize">{{ data.item.status }}</span>
                </template>

                <template #cell(action)="data">
                  <b-button size="sm" variant="primary" class="me-2" @click="viewJobs(data.item.id)">View jobs</b-button>
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
  </div>
</template>

<script>
import HomeFooter from '../../base-layout/footer';
import topHeader from '../../base-layout/admin-header'
import SideBar from '../../base-layout/navigation/tradesperson-sidebar';
import MobileFooter from '../../../components/mobile-nav';
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  page: {
    title: "Admin | Trades",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO,
      showSidebar: false,
      isMobile: false,
      isLoading: false,
      homeowners: [],
      fields: [
        {key: 'name', sortable: true},
        {key: 'email', sortable: true},
        {key: 'phone', sortable: true},
        {key: 'status', sortable: true},
        {key: 'action', label: 'Action'}
      ],
      filter: '',
      filterOn: ['name', 'email', 'phone', 'city_name', 'parish_name', 'status'],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      sortBy: 'name',
      sortDesc: false
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
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getTradePeople() {
      this.isLoading = true;
      userService.getHomeowners().then((res) => {
        this.isLoading = false;
        const {extra, status} = res;
        if (status) {
          this.homeowners = extra;
        }
      });
    },
    viewJobs(userId) {
      this.$router.push({name: 'homeOwnerJobs', params: {id: userId}});
    },
  },
  created() {
    this.getTradePeople();
  },
  mounted() {
    $('#homeowners').addClass('active')
  },
};
</script>

<style scoped>

</style>
