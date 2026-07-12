<template>
  <div>
    <topHeader/>
    <div class="container-fluid mt-4 mb-5">
      <h4 class="mb-4">Email Broadcast</h4>

      <div class="card" style="max-width: 640px;">
        <div class="card-body">
          <div class="mb-3">
            <label class="form-label">Send to</label>
            <select v-model="form.audience" class="form-select">
              <option value="all">Everyone</option>
              <option value="homeowners">Homeowners only</option>
              <option value="tradespeople">Tradespeople only</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Subject</label>
            <input v-model="form.subject" type="text" class="form-control" maxlength="255" />
          </div>

          <div class="mb-3">
            <label class="form-label">Message</label>
            <textarea v-model="form.body" class="form-control" rows="6" maxlength="5000"></textarea>
          </div>

          <button class="btn btn-primary-1" :disabled="sending || !canSend" @click="send">
            {{ sending ? 'Sending...' : 'Send broadcast' }}
          </button>

          <p v-if="lastResult" class="mt-3 text-success">{{ lastResult }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../../base-layout/admin-header';
import { userService } from '@/apis/user.service';

export default {
  name: 'AdminBroadcast',
  components: { topHeader },
  data() {
    return {
      form: { audience: 'all', subject: '', body: '' },
      sending: false,
      lastResult: null,
    };
  },
  computed: {
    canSend() {
      return this.form.subject.trim().length > 0 && this.form.body.trim().length > 0;
    },
  },
  methods: {
    send() {
      this.sending = true;
      this.lastResult = null;
      userService.sendBroadcast(this.form).then((res) => {
        this.sending = false;
        if (res.status) {
          this.lastResult = res.message;
          this.form.subject = '';
          this.form.body = '';
        } else {
          this.$store.dispatch('error', { message: res.message, showSwal: true });
        }
      });
    },
  },
};
</script>
