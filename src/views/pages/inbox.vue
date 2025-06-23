<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5 font-weight-bold">Inbox</h4>
    </template>

    <h5>Inbox</h5>

    <div class="row mt-4 mb-5">
      <div class="col-md-8">
        <div v-if="guaranteeLoader">
          <div v-for="(item,i) in 2" :key="i">
            <div class="card mb-3">
              <div class="card-body">
                <div class="lines shine"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat area -->
        <div class="card">
          <div class="card-header bg-primary-1 text-white">
            Chat
          </div>
          <div class="card-body" style="height: 400px; overflow-y: auto;">
            <div v-for="(message, index) in messages" :key="index" class="mb-3">
              <div :class="message.from === 'me' ? 'text-end' : 'text-start'">
                <div :class="message.from === 'me' ? 'bg-primary-1 text-white p-2 rounded d-inline-block' : 'bg-light p-2 rounded d-inline-block'">
                  {{ message.text }}
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <input v-model="newMessage" @keyup.enter="sendMessage" type="text" class="form-control me-2" placeholder="Type your message...">
            <button class="btn btn-primary" @click="sendMessage">Send</button>
          </div>
        </div>
        <!-- End Chat area -->

      </div>
    </div>
  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../base-layout/tradesperson-dashboard';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  name: "InboxPage",
  page: {
    title: "Company Description",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      guarantee: '',
      isLoading: false,
      guaranteeLoader: false,
      messages: [
        { from: 'other', text: 'Hello! How can I help you?' },
        { from: 'me', text: 'I need assistance with my project.' }
      ],
      newMessage: '',
    };
  },
  components: {
    BaseDashboardLayout
  },
  methods: {
    async save() {
      this.isLoading = true;
      userService.updateGuarantee({
        guarantee: this.guarantee,
      }).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.$store.dispatch('success', {message, showSwal: true});
      });
    },
    getGuarantee() {
      this.guaranteeLoader = true;
      userService.getGuarantee().then((res) => {
        this.guaranteeLoader = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.guarantee = extra.guarantee;
      });
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({ from: 'me', text: this.newMessage.trim() });
        this.newMessage = '';
        // Here you can add API call to actually send the message
      }
    }
  },
  created() {
    this.getGuarantee();
  },
  mounted() {
    $('#inbox').addClass('active')
  },
};
</script>

<style scoped>
.card-body {
  background: #f8f9fa;
}
</style>
