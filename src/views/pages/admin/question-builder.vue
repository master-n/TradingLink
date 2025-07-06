<template>
  <div>
    <topHeader/>
    <div class="container">
      <h2 class="mb-4">Add Questions for Trade</h2>

      <div class="mb-3">
        <label class="form-label">Select Trade</label>
        <select v-model="selectedTrade" class="form-select">
          <option disabled value="">Select a trade</option>
          <option v-for="trade in trades" :key="trade.id" :value="trade.id">{{ trade.name }}</option>
        </select>
      </div>

      <div class="card mb-5">
        <div class="card-body">
          <label class="form-label">Main Question</label>
          <input class="form-control mb-2" v-model="question.formLabel" placeholder="e.g. What is the issue?"/>

          <NestedOption
              v-for="(opt, index) in question.options"
              :key="index"
              :option="opt"
              @remove="question.options.splice(index, 1)"
          />

          <button class="btn btn-sm btn-secondary mt-2" @click="addOption(question)">+ Add Option</button>
        </div>
      </div>

      <button class="btn btn-primary" :disabled="!selectedTrade" @click="submitQuestions">Save</button>
    </div>
  </div>
</template>

<script>
import NestedOption from '../../../components/optionNode.vue';
import {userService} from "@/apis/user.service";
import topHeader from '../../base-layout/admin-header'

export default {
  components: {NestedOption, topHeader},
  data() {
    return {
      selectedTrade: '',
      trades: [],
      question: {
        formLabel: '',
        type: 'StandardChoiceOption',
        required: true,
        requiredErrorMessage: 'This field is required',
        options: [],
        next: null
      }
    };
  },
  created() {
    this.fetchTrades();
  },
  methods: {
    addOption(question) {
      question.options.push({
        formLabel: '',
        type: 'StandardChoiceOption',
        required: true,
        requiredErrorMessage: 'This field is required',
        options: [],
        next: null
      });
    },
    submitQuestions() {
      const payload = {
        trade_id: this.selectedTrade,
        question: this.question
      };
      userService.saveTradeQuestions(payload).then((res) => {
        const {message, status, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.$store.dispatch('success', {message: message, showSwal: true});
      });

    },
    fetchTrades() {
      this.tradeLoader = true
      userService.getTrades().then((res) => {
        this.trades = res.extra;
        this.tradeLoader = false
      });
    },
  },
  mounted() {
    $('#question-builder').addClass('active')
  },
};
</script>
