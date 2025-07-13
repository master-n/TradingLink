<template>
  <div>
    <topHeader />
    <div class="job-listing-area mb-120">
      <div class="container">
        <div class="row g-lg-4 gy-5">
          <div class="col-lg-8 offset-lg-2 order-lg-2 order-1">
            <div class="job-listing-wrrap">
              <div class="row">
                <div class="col-md-12 mb-3">
                  <h4 class="text-center">Trades</h4>
                </div>
                <div class="col-lg-12">
                  <button class="btn btn-primary btn-sm mb-3 me-2" @click="openCreateModal">
                    Create New Trade
                  </button>
                  <button class="btn btn-danger btn-sm mb-3" @click="deleteSelectedTrades" :disabled="selectedTrades.length === 0">
                    Delete Selected
                  </button>
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th scope="col">
                        <input type="checkbox" v-model="selectAll" @change="selectAllTrades" />
                      </th>
                      <th scope="col">Name</th>
                      <th scope="col">Updated Date</th>
                      <th scope="col">Created Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody v-if="isLoading">
                    <tr v-for="(loader, i) in 5" :key="i">
                      <td><input type="checkbox" disabled /></td>
                      <td><div class="lines shine"></div></td>
                      <td><div class="lines shine"></div></td>
                      <td><div class="lines shine"></div></td>
                      <td><div class="lines shine"></div></td>
                    </tr>
                    </tbody>
                    <tbody v-else>
                    <tr v-for="(service, i) in services" :key="i">
                      <td>
                        <input type="checkbox" :value="service.id" v-model="selectedTrades" />
                      </td>
                      <td>{{ service.name }}</td>
                      <td>{{ service.updated_at | toFormattedDateTime }}</td>
                      <td>{{ service.created_at | toHumanDate() }}</td>
                      <td>
                        <button class="btn btn-primary btn-sm me-2" @click="openEditModal(service)">Edit</button>
                        <button class="btn btn-danger btn-sm" @click="deleteTrade(service.id)">Delete</button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <b-modal v-model="createModalShow" title="Create Trade" @ok="handleCreateOk">
      <form @submit.stop.prevent="handleCreateSubmit">
        <b-form-group label="Trade Name" label-for="trade-name-input">
          <b-form-input id="trade-name-input" v-model="createTradeForm.name" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <!-- Edit Modal -->
    <b-modal v-model="editModalShow" title="Edit Trade" @ok="handleEditOk">
      <form @submit.stop.prevent="handleEditSubmit">
        <b-form-group label="Trade Name" label-for="trade-name-input">
          <b-form-input id="trade-name-input" v-model="editTradeForm.name" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import HomeFooter from '../../base-layout/footer';
import topHeader from '../../base-layout/admin-header';
import SideBar from '../../base-layout/navigation/tradesperson-sidebar';
import MobileFooter from '../../../components/mobile-nav';
import appConfig from "../../../../app.config.json";
import { userService } from "@/apis/user.service";
import { BModal, BFormGroup, BFormInput } from 'bootstrap-vue';
import { confirm } from "@/utils/functions";

export default {
  page: {
    title: "Admin My Projects",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: {
    HomeFooter,
    topHeader,
    SideBar,
    MobileFooter,
    BModal,
    BFormGroup,
    BFormInput
  },
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO,
      showSidebar: false,
      isMobile: false,
      createModalShow: false,
      createTradeForm: {
        name: ''
      },
      isLoading: false,
      services: [],
      editModalShow: false,
      editTradeForm: {
        id: null,
        name: ''
      },
      selectedTrades: [],
      selectAll: false
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.GET_USER_INFO;
    },
  },
  methods: {
    getTrades() {
      this.isLoading = true;
      userService.getTrades().then((res) => {
        this.services = res.extra;
        this.isLoading = false;
      });
    },
    openEditModal(service) {
      this.editTradeForm.id = service.id;
      this.editTradeForm.name = service.name;
      this.editModalShow = true;
    },
    handleEditOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleEditSubmit();
    },
    handleEditSubmit() {
      confirm("Are you sure?", () => {
        this.isLoading = true;
        this.editModalShow = false;
        const payload = {
          name: this.editTradeForm.name
        };
        userService.editTrade(payload, this.editTradeForm.id).then((res) => {
          this.isLoading = false;
          const { status, message, extra } = res;
          if (!status) {
            this.$store.dispatch('error', { message: message, showSwal: true });
            return;
          }
          this.$store.dispatch('success', { message: 'Trade updated successfully!', showSwal: true });
          this.getTrades();
        });
      });
    },

    openCreateModal() {
      this.createModalShow = true;
    },

    handleCreateOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleCreateSubmit();
    },

    handleCreateSubmit() {
      this.createModalShow = false;
      confirm("This action cannot be reverted", () => {
        this.isLoading = true;
        const payload = {
          name: this.createTradeForm.name
        };
        userService.createTrade(payload).then((res) => {
          this.isLoading = false;
          const { status, message,extra } = res;
          if (!status) {
            this.$store.dispatch('error', { message: message, showSwal: true });
            return;
          }
          this.$store.dispatch('success', { message: 'Trade created successfully!', showSwal: true });
          this.createTradeForm.name = '';
          this.services.unshift(extra);
        });
      });
    },
    deleteTrade(id) {
      confirm("Are you sure you want to delete this trade?", () => {
        this.isLoading = true;
        const payload ={
          ids: [id]
        }
        userService.deleteTrades(payload).then((res) => {
          this.isLoading = false;
          const { status, message } = res;
          if (!status) {
            this.$store.dispatch('error', { message: message, showSwal: true });
            return;
          }
          this.$store.dispatch('success', { message: 'Trade deleted successfully!', showSwal: true });
          this.services = this.services.filter(service => service.id !== id);
        });
      });
    },

    deleteSelectedTrades() {
      confirm("Are you sure you want to delete the selected trades?", () => {
        this.isLoading = true;
        const payload ={
          ids: this.selectedTrades
        }
        userService.deleteTrades(payload).then((res) => {
          this.isLoading = false;
          const { status, message } = res;
          if (!status) {
            this.$store.dispatch('error', { message: message, showSwal: true });
            return;
          }
          this.$store.dispatch('success', { message: 'Selected trades deleted successfully!', showSwal: true });
          this.selectedTrades = [];
          this.selectAll = false;
          this.services = this.services.filter(service => !this.selectedTrades.includes(service.id));
        });
      });
    },
    selectAllTrades() {
      if (this.selectAll) {
        this.selectedTrades = this.services.map(service => service.id);
      } else {
        this.selectedTrades = [];
      }
    }
  },
  created() {
    this.getTrades();
  },
  mounted() {
    $('#trades').addClass('active');
  },
};
</script>
