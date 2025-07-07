<template>
  <div class="container">
    <top-header/>
    <div class="mt-4 text-end pe-4">
      <a @click="$router.go(-1)" class="cursor-pointer mb-4">
        <i class="bi bi-chevron-left"></i> Go Back
      </a>
    </div>

    <h4 class="title mb-5 font-weight-bold mt-5">Messages</h4>

    <div class="row mt-4 mb-5">

      <div class="col-md-3">
        <div class="card">
          <div class="card-body" style="height: 550px; overflow-y: auto;">
            <div class="media mb-3">
              <div class="media-body d-flex justify-content-start align-items-center">
                <h5 class="mt-0 mb-0">
                  <router-link to="/contacts/profile" class="text-capitalize me-2"
                  >{{ user.name }}
                  </router-link
                  >
                </h5>
                <div><small>(Online)</small></div>
              </div>
              <div>
                <a href="javascript: void(0);" class="text-reset font-20">
                  <i class="mdi mdi-cog-outline"></i>
                </a>
              </div>
            </div>

            <small class="text-muted text-uppercase fw-lighter">Chats</small>
            <!-- users -->
            <div class="row mt-4">
              <div class="col">
                <a
                    href="javascript:void(0);"
                    class="text-body"
                    v-for="(item, index) in invites"
                    :key="index"
                    @click="chatJobOwner(item)"
                >
                  <div class="media border-bottom">
                    <div class="media-body">
                      <h5 class="mt-0 mb-0 font-14">
                        <div
                            class="float-right text-muted font-weight-normal font-12"
                        >
                          <template v-if="item['pendingSupportMessagesForAdmin'] > 0">
                            <br>
                            <span
                                class="badge badge-pill badge-success float-right mt-2"> {{
                                item['pendingSupportMessagesForAdmin']
                              }}</span>
                          </template>
                        </div
                        >
                        <span class="text-capitalize">{{ item.service.headline }}</span>
                      </h5>
                      <p class="mt-1 mb-0 text-muted fw-lighter">
                        <span class="w-75">{{ !item.lastMessage ? 'Click to start chatting' : item.lastMessage }}</span>
                      </p>
                    </div>
                  </div>
                </a>

                <div v-if="isLoading">
                  <div class="lines shine"></div>
                  <div class="lines shine"></div>
                  <div class="lines shine"></div>
                  <div class="lines shine"></div>
                </div>

              </div>
              <!-- End col -->
            </div>
            <!-- end users -->
          </div>
          <!-- end card-body-->
        </div>
        <!-- end card-->
      </div>

      <div class="col-md-6">
        <!-- Chat area -->
        <div class="card">
          <div class="card-header bg-primary-1 text-white">
            {{ serviceSelected.service ? serviceSelected.service.headline : 'Select a job to start chatting' }}
          </div>
          <div class="card-body" ref="chatBody" style="height: 400px; overflow-y: auto;">
            <div v-for="(message, index) in messages" :key="index" class="mb-3">
              <div :class="message.from === user.id ? 'text-end' : 'text-start'">
                <div
                    :class="message.from === user.id ? 'bg-primary-1 text-white p-2 rounded d-inline-block' : 'bg-light p-2 rounded d-inline-block'">
                  {{ message.text }}
                </div>
              </div>
            </div>
            <div v-if="!messages.length">
              <h6 class="text-center fw-lighter">Be the first to send a message</h6>
            </div>
          </div>
          <div class="card-footer d-flex">
            <input v-model="newMessage" @keyup.enter="sendMessage" type="text" class="form-control me-2"
                   placeholder="Type your message...">
            <button class="btn btn-primary" @click="sendMessage">Send</button>
          </div>
        </div>
        <!-- End Chat area -->
      </div>

      <div class="col-md-3">
        <div class="card">
          <div class="card-body" style="height: 560px; overflow-y: auto;" v-if="serviceSelected">
            <div class="mb-3">
              <div>
                <h5 class="mb-0">{{ serviceSelected.service.headline }}</h5>
                <small class="text-capitalize">{{ serviceSelected.service.created_at | toHumanDate }}</small>
              </div>
            </div>
            <hr>
            <div class="mb-3">
              <h6 class="card-title">Job Description</h6>

              <div class="fw-lighter">
                <div class="row mt-3">
                  <div class="col-md-4">Job ID:</div>
                  <div class="col-md-8 text-left">{{ serviceSelected.service.id }}</div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-4">Job type:</div>
                  <div class="col-md-8 text-left">
                    {{ serviceSelected.service.trade ? serviceSelected.service.trade.name : 'N/A' }}
                  </div>
                </div>
                <div class="row mt-3" v-if="serviceSelected.service.questions.length>0">
                  <div class="col-md-4">Category:</div>
                  <div class="col-md-8 text-left">{{ serviceSelected.service.questions[0]['answers'] }}</div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-4">Location:</div>
                  <div class="col-md-8 text-left"><i class="bi bi-pin-map"></i> {{ serviceSelected.service.city_name }}
                    {{ serviceSelected.service.parish_name ? '~ ' + serviceSelected.service.parish_name : '' }}
                  </div>
                </div>
              </div>

              <hr>
              <div class="accordion mt-3" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <span class="text-primary-1">Additional Information</span>
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show"
                       aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <div v-for="(question,i) in serviceSelected.service.questions" :key="i">
                        <h6>{{ question.formLabel }}</h6>
                        <p class="fw-light">{{ question.answers }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <router-link :to="`/job-lead-details/${serviceSelected.service.city_name}/${serviceSelected.service.id}`"
                         class="card-link">View full job description
            </router-link>
          </div>

          <div class="card-body" style="height: 560px;" v-if="isLoading">
            <div class="lines shine"></div>
            <div class="lines shine"></div>
            <div class="lines shine"></div>
            <div class="lines shine"></div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseDashboardLayout from '../base-layout/tradesperson-dashboard';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";
import topHeader from '../base-layout/header-2';

import {getDatabase, ref, push, off, onChildAdded} from "firebase/database";

export default {
  name: "Chat",
  page: {
    title: "Chat",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      isLoading: false,
      invites: [],
      user: this.$store.getters.GET_USER_INFO || {},
      serviceSelected: '',
      messages: [],
      newMessage: '',
    };
  },
  components: {
    BaseDashboardLayout,
    topHeader
  },
  methods: {

    chatJobOwner(service) {
      this.serviceSelected = service
      const jobId = this.serviceSelected.id;
      const toId = this.serviceSelected.service.user_id;

      this.listenToMessages(jobId, toId);
    },


    listenToMessages(jobId, jobOwnerId) {
      const db = getDatabase();
      const messagesRef = ref(db, `chat_channels/${jobId}/${jobOwnerId}/messages`);

      // Reset current messages before loading new ones
      this.messages = [];

      // Detach any previous listener
      if (this.unsubscribeMessages) {
        this.unsubscribeMessages(); // properly defined below
      }

      // Define handler function once so it can be referenced during off()
      const handleNewMessage = (snapshot) => {
        const msg = snapshot.val();
        this.messages.push(msg);
        this.scrollToBottom();
      };

      // Attach new listener
      onChildAdded(messagesRef, handleNewMessage);

      // Save unsubscribe function
      this.unsubscribeMessages = () => {
        off(messagesRef, 'child_added', handleNewMessage);
      };
    },


    getServiceInvites() {
      this.isLoading = true;
      userService.getServiceInvites().then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.invites = extra;
        const inviteId = this.$route.query.id
        if (inviteId) {
          const invite = this.invites.find(s => Number(s.id) === Number(inviteId));
          if (invite) {
            this.chatJobOwner(invite);
          }
        } else if (this.invites.length > 0) {
          this.chatJobOwner(this.invites[0]);
        }
      });
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const el = this.$refs.chatBody;
        if (el) el.scrollTop = el.scrollHeight;
      });
    },

    sendMessage() {
      if (this.newMessage.trim() === '') return;
      const db = getDatabase();
      const jobId = this.serviceSelected.id;
      const fromId = this.user.id;
      const toId = this.serviceSelected.service.user_id;

      const message = {
        from: fromId,
        to: toId,
        text: this.newMessage.trim(),
        timestamp: Date.now()
      };

      const messagesRef = ref(db, `chat_channels/${jobId}/${toId}/messages`);
      push(messagesRef, message).then(() => {
        this.newMessage = '';
        this.scrollToBottom();
      });
    },

  },
  created() {
    this.getServiceInvites();
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
