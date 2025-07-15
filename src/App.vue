<template>
    <router-view />
</template>

<script>
import store from "@/store/store";
import {getDatabase, onValue, ref} from "firebase/database";

export default {
  name: "App",
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO || {},
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.GET_USER_INFO;
    }
  },
  methods: {
    watchAllPendingMessages() {
      const db = getDatabase();
      const userId = this.user.id;
      const rootRef = ref(db, `chat_channels`);

      onValue(rootRef, (snapshot) => {
        let totalUnread = 0;

        if (snapshot.exists()) {
          const jobs = snapshot.val();

          for (let jobId in jobs) {
            const job = jobs[jobId];

            if (job[userId] && job[userId].messages) {
              const messages = job[userId].messages;

              for (let msgKey in messages) {
                const msg = messages[msgKey];

                if (msg.to === userId && !msg.read) {
                  totalUnread++;
                }
              }
            }
          }
        }

// Emit total unread count once
        console.log('Total unread messages:', totalUnread)
        this.$store.dispatch('updateInboxCount', totalUnread);

      });
    }
  },
  created() {
    if (!this.loggedIn) return;

    const userRole = store.getters.GET_USER_INFO?.roles?.[0];
    if (userRole === 'tradesperson') {
      this.watchAllPendingMessages();
    }
  }
}
</script>