<template>
  <div>
    <topHeader/>
    <div class="container">
      <h2 class="mb-4">Add Questions for Trade</h2>

      <div class="mb-3">
        <label class="form-label">Select Trade</label>
        <select v-model="selectedTrade" class="form-select" @change="loadQuestions">
          <option disabled value="">Select a trade</option>
          <option v-for="trade in trades" :key="trade.id" :value="trade.id">{{ trade.name }}</option>
        </select>
      </div>

      <div class="card mb-5">
        <div class="card-body">
          <div class="row">
            <div class="col-md-9">
              <label class="form-label">Main Question</label>
              <input class="form-control mb-2" v-model="question.formLabel" placeholder="e.g. What is the issue?"/>
            </div>
            <div class="col-md-3">
              <label class="form-label">Option Type</label>
              <select v-model="question.type" class="form-select mb-3">
                <option value="StandardChoiceOption">Select One</option>
                <option value="StandardCheckOption">Multiple Select</option>
                <option value="StandardTextAreaOption">Text Area</option>
              </select>
            </div>
          </div>

          <div v-if="isLoading">
            Loading Questions...
          </div>
          <div v-else>
            <NestedOption
                v-for="(opt, index) in question.options"
                :key="index"
                :option="opt"
                :index="index"
                @remove="question.options.splice(index, 1)"
            />
          </div>
          <button class="btn btn-sm btn-secondary mt-2" @click="addOption(question)">+ Add Option</button>
        </div>
      </div>

      <button class="btn btn-primary" :disabled="!selectedTrade || isSaving" @click="submitQuestions">
        <b-spinner small v-if="isSaving"></b-spinner>
        {{ isSaving ? 'Saving..' : 'Save' }}
      </button>
    </div>
  </div>
</template>

<script>
import NestedOption from '../../../components/optionNode.vue';
import {userService} from "@/apis/user.service";
import topHeader from '../../base-layout/admin-header'
import appConfig from "../../../../app.config.json";

export default {
  page: {
    title: "Question Builder",
    meta: [{name: "description", content: appConfig.description}]
  },
  components: {NestedOption, topHeader},
  name: 'QuestionBuilder',

  data() {
    return {
      selectedTrade: '',
      trades: [],
      isLoading: false,
      tradeLoader: false,
      isSaving: false,
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
  watch: {
    // Watch for changes in the question type
    'question.type': function (newType) {
      this.updateOptionsType(newType);
    }
  },
  created() {
    this.fetchTrades();
  },
  methods: {
    loadQuestions() {
      const tradeObj = this.trades.find(t => t.id === this.selectedTrade);
      if (tradeObj) this.selectedTradeName = tradeObj.name;
      this.fetchQuestions();
    },
    fetchQuestions() {
      this.isLoading = true;
      this.question = {
        formLabel: '',
        type: 'StandardChoiceOption',
        required: true,
        requiredErrorMessage: 'This field is required',
        options: [],
        next: null
      };
      userService.getTradeQuestion(this.selectedTrade).then((res) => {
        this.isLoading = false;
        if (!Array.isArray(res.extra)) {
          this.question = res.extra;
        }
      });
    },

    updateOptionsType(newType) {
      if (this.question.options) {
        this.question.options.forEach(option => {
          option.type = newType;
        });
      }
    },
    addOption(question) {
      question.options.push({
        formLabel: '',
        type: this.question.type,
        required: true,
        requiredErrorMessage: 'This field is required',
        options: [],
        next: null
      });
    },
    submitQuestions() {
      if (!this.question.formLabel || this.question.formLabel.trim() === '') {
        this.$store.dispatch('error', {message: 'Please enter the main question.', showSwal: true});
        return;
      }

      this.isSaving = true;
      const payload = {
        trade_id: this.selectedTrade,
        question: this.question
      };
      userService.saveTradeQuestions(payload).then((res) => {
        this.isSaving = false;
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
