<template>
  <div class="card job-intake-chat">
    <div class="card-header d-flex justify-content-between align-items-center">
      <strong>Tell us about your job</strong>
      <button type="button" class="btn btn-sm btn-link p-0" @click="$emit('skip')">
        Skip and fill in the form instead
      </button>
    </div>

    <div class="card-body" ref="chatBody" style="height: 400px; overflow-y: auto;">
      <div v-for="(message, index) in messages" :key="index" class="mb-3">
        <div :class="message.from === 'user' ? 'text-end' : 'text-start'">
          <div
              :class="message.from === 'user' ? 'bg-primary-1 text-white p-2 rounded d-inline-block' : 'bg-gold p-2 rounded d-inline-block'">
            {{ message.text }}
          </div>
        </div>
      </div>

      <div v-if="sending" class="mb-3">
        <div class="text-start">
          <div class="bg-gold p-2 rounded d-inline-block">
            <b-spinner small></b-spinner> typing…
          </div>
        </div>
      </div>

      <!-- Confirmation card once the job is ready -->
      <div v-if="finishedJob" class="mt-3 p-3 border rounded bg-white">
        <h6 class="mb-2">Here's your job</h6>
        <p class="mb-1"><strong>{{ finishedJob.title }}</strong></p>
        <p class="mb-1 text-muted">{{ finishedJob.trade }} — {{ finishedJob.parish_name }}, {{ finishedJob.city_name }}</p>
        <p class="mb-2">{{ finishedJob.description }}</p>
        <p class="mb-2"><em>Urgency:</em> {{ finishedJob.urgency }}</p>

        <p v-if="price" class="price-guide mb-3">
          Typical range in Jamaica: {{ currency }}{{ formatNum(price.low) }}–{{ currency }}{{ formatNum(price.high) }}<span v-if="price.unit"> ({{ price.unit }})</span>.
          This is a guide only — your tradesperson will confirm the price after seeing the job.
        </p>

        <!-- Benefit-led sign-up nudge for anonymous users.
             NOTE: notification wording below is pending Nathan's confirmation of how
             homeowners are actually notified (email vs push). Neutral placeholder for now. -->
        <p v-if="!isLoggedIn" class="signup-benefit mb-3">
          Create your free account to post it — then vetted tradespeople can send you quotes to compare and choose from.
        </p>

        <button type="button" class="btn btn-primary me-2" @click="$emit('confirm', { job: finishedJob, price })">
          {{ isLoggedIn ? 'Post this job' : 'Create account & post my job' }}
        </button>
        <button type="button" class="btn btn-outline-secondary" @click="$emit('skip')">
          Edit in the form instead
        </button>
      </div>
    </div>

    <div class="card-footer d-flex" v-if="!finishedJob">
      <input v-model="input" @keyup.enter="send" type="text" class="form-control me-2"
             placeholder="Type your answer..." :disabled="sending">
      <button class="btn btn-primary" @click="send" :disabled="sending || !input.trim()">Send</button>
    </div>
  </div>
</template>

<script>
import {userService} from "@/apis/user.service";
import {getRecaptchaToken} from "@/utils/recaptcha";

export default {
  name: "JobIntakeChat",
  props: {
    // Drives the end-of-chat copy: anonymous users get the sign-up nudge + button.
    isLoggedIn: {type: Boolean, default: false},
  },
  data() {
    return {
      messages: [{from: 'ai', text: "Hi! Tell me in a few words what you need done."}],
      input: '',
      sending: false,
      finishedJob: null,
      price: null,
      currency: process.env.VUE_APP_CURRENCY || '$',
    };
  },
  methods: {
    formatNum(n) {
      return Number(n).toLocaleString();
    },
    // The backend is stateless, so we send the full transcript each turn.
    buildConversation() {
      return this.messages
          .filter((m) => m.from === 'ai' || m.from === 'user')
          .map((m) => ({role: m.from === 'user' ? 'user' : 'assistant', content: m.text}))
          // Drop the very first greeting so the transcript starts with the user's first message.
          .slice(1);
    },
    async send() {
      const text = this.input.trim();
      if (!text || this.sending) return;
      this.messages.push({from: 'user', text});
      this.input = '';
      this.sending = true;
      this.$nextTick(this.scrollDown);

      let token = '';
      try {
        token = await getRecaptchaToken('job_intake');
      } catch (e) {
        token = '';
      }

      const res = await userService.jobIntake(this.buildConversation(), token);
      this.sending = false;

      if (res.limited) {
        this.messages.push({from: 'ai', text: res.message || "Let's use the form instead."});
        this.$emit('skip');
        return;
      }
      if (res.done) {
        this.finishedJob = res.job;
        this.price = res.price || null;
      } else {
        this.messages.push({from: 'ai', text: res.message});
      }
      this.$nextTick(this.scrollDown);
    },
    scrollDown() {
      const el = this.$refs.chatBody;
      if (el) el.scrollTop = el.scrollHeight;
    },
  },
};
</script>

<style scoped>
.card-body {
  background: #f8f9fa;
}

.price-guide {
  background: #f6f6f6;
  padding: 10px;
  border-radius: 8px;
}

.signup-benefit {
  font-weight: 500;
}
</style>
