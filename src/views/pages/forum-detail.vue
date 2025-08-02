<!-- ForumDetails.vue -->
<template>
  <div>

    <RoleBasedHeader :userRole="userRole" />


    <div class="container py-5">
      <h3 class="mb-4 text-center">{{query}}</h3>
      <div v-if="question" class="mb-5 border p-4 rounded bg-white shadow-sm">
        <div class="mb-3">
          <h5 class="fw-lighter small">{{ question.user.name }}</h5>
          <div class="text-muted small fw-lighter">{{ formatDate(question.created_at) }}</div>
          <p class="mt-2">{{ question.content }}</p>
        </div>

        <!-- Answer Form -->
        <div class="mb-3">
              <textarea v-model="question.newAnswer" rows="2" class="form-control"
                        placeholder="Write an answer..."></textarea>
          <button class="btn btn-primary btn-sm mt-3" @click="submitAnswer()">
            <i class="bi bi-send me-1"></i>Submit Answer
          </button>
        </div>

        <!-- Answers -->
        <div v-if="question.answers.length" class="mt-4 border-top pt-3">
          <h4 class="text-muted mb-3">Answers</h4>
          <div v-for="answer in question.answers" :key="answer.id" class="mb-4 ps-3 border-start">

            <p class="mb-1 small fw-lighter">{{ answer.user.name }}</p>
            <div class="text-muted small fw-lighter">answered {{ formatDate(answer.created_at) }}</div>
            <p class="mt-2">{{ answer.content }}</p>

            <!-- Reply Button -->
            <button class="btn btn-link text-primary-1 p-0 small" @click="toggleReplyInput(answer)">
              <i class="bi bi-reply me-1"></i>Reply
            </button>

            <!-- Reply Input -->
            <div v-if="answer.showReplyInput" class="mt-2">
                  <textarea v-model="answer.newReply" class="form-control form-control-sm mb-2" rows="2"
                            placeholder="Write a comment..."></textarea>
              <button class="btn btn-outline-primary-1 btn-sm" @click="submitReply(answer)">
                Reply
              </button>
            </div>

            <!-- Replies -->
            <div v-if="answer.replies.length" class="mt-3 ps-3">
              <h6 class="fw-bold text-muted mb-3 mt-4">Replies</h6>
              <div v-for="reply in answer.replies" :key="reply.id" class="text-muted small mb-2">
                <strong>{{ reply.user.name }}</strong>:
                {{ reply.content }} <br>
                <span class="text-muted small fw-lighter">{{ formatDate(reply.created_at) }}</span>
                <hr>
              </div>
            </div>
          </div>
        </div>
        <!-- End Answers -->
      </div>

    </div>

  </div>
</template>

<script>
import {userService} from "@/apis/user.service";
import topHeader from "@/views/base-layout/navigation/homeowner-menu";
import homeOwnerHeader from "@/views/base-layout/navigation/homeowner-menu";
import store from "@/store/store";
import RoleBasedHeader from "@/views/base-layout/roleBasedHeader";

export default {
  name: "ForumDetails",
  data() {
    return {
      question: null,
      query: this.$route.query.q,
      newAnswer: ""
    };
  },
  components: {
    topHeader,
    homeOwnerHeader,
    RoleBasedHeader
  },
  computed: {
    userRole() {
      const loggedUser = store.getters.GET_USER_INFO;
      if(!loggedUser){
        return '';
      }
      return loggedUser?.roles?.[0] || '';
    },
  },
  methods: {
    fetchDetails() {
      const id = this.$route.params.id;
      this.questionLoader = true;
      userService.getForumQuestionDetails(id).then((res) => {
        this.questionLoader = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        const data = res.extra;
        this.question = {
          ...data,
          newAnswer: '',
          answers: data.comments.map(a => ({
            ...a,
            replies: a.replies || [],
            newReply: '',
            showReplyInput: false
          }))
        };
      });
    },
    async submitAnswer() {
      if (!this.question.newAnswer.trim()) return;
      const res = await userService.submitQuestionComment(this.question.id, {content: this.question.newAnswer});
      if (res.status) {
        this.newAnswer = "";
        this.fetchDetails();
      }
    },
    toggleReplyInput(answer) {
      answer.showReplyInput = !answer.showReplyInput;
    },

    async submitReply(answer) {
      if (!answer.newReply.trim()) return;
      const payload = {content: answer.newReply};

      userService.submitReply(answer.id, payload).then(async (res) => {
        const {status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.fetchDetails();
      });
    },
    formatDate(dateStr) {
      return new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(dateStr));
    }
  },
  mounted() {
    this.fetchDetails();
  }
};
</script>
