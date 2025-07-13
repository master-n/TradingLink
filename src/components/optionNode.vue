<template>
  <div class="ms-3 my-3">
    <div class="d-flex gap-2 mb-1 align-items-center">
<!--      <select v-model="option.type" class="form-select w-auto">-->
<!--        <option value="StandardChoiceOption">Radio</option>-->
<!--        <option value="StandardCheckOption">Checkbox</option>-->
<!--        <option value="StandardTextAreaOption">TextArea</option>-->
<!--      </select>-->
      <span class="input-group-text">{{ index + 1 }}.</span>
      <input v-model="option.formLabel" class="form-control" :placeholder="option.type ==='StandardTextAreaOption' ? 'Placeholder text description' : 'Option label'" />
      <button class="btn btn-sm btn-danger" @click="$emit('remove')">×</button>
    </div>

    <button v-if="!option.next" class="btn btn-primary my-2" @click="addNestedQuestion">Next question</button>

    <div v-if="option.next" class="border-start ps-3 ms-3 my-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <label class="form-label mb-0">Follow-up Question</label>
        <button class="btn btn-sm btn-outline-danger" @click="removeNestedQuestion">Remove Follow-up</button>
      </div>
      <div class="row">
        <div class="col-md-9">
          <small><label class="form-label">State the Question</label></small>
          <input class="form-control mb-1" v-model="option.next.formLabel" placeholder="Follow-up question label" />
        </div>
        <div class="col-md-3">
          <small><label class="form-label">Option Type</label></small>
          <select v-model="option.next.type" class="form-select">
            <option value="StandardChoiceOption">Select One</option>
            <option value="StandardCheckOption">Multiple Select</option>
            <option value="StandardTextAreaOption">Text Area</option>
          </select>
        </div>

      </div>

      <div v-for="(opt, idx) in option.next.options" :key="idx">
        <NestedOption :option="opt" :index="idx" @remove="option.next.options.splice(idx, 1)" />
      </div>

      <button class="btn btn-sm btn-secondary my-2" v-if="option.next.type !== 'StandardTextAreaOption'" @click="addOption(option.next)">Add Option</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NestedOption',
  props: {
    option: Object,
    index: Number
  },
  watch: {
    // Watch for changes in the follow-up question type
    'option.next.type': function(newType) {
      if (this.option.next && this.option.next.options) {
        this.updateOptionsType(this.option.next, newType);
      }
    }
  },
  methods: {
    updateOptionsType(question, newType) {
      // Update the type of each option to match the new question type
      question.options.forEach(option => {
        option.type = newType;
      });
    },
    addOption(question) {
      if (!question.formLabel || question.formLabel.trim() === '') {
        alert('Please enter a label for the follow-up question before adding options.');
        return;
      }

      question.options.push({
        formLabel: '',
        type: question.type,
        required: true,
        requiredErrorMessage: 'This field is required',
        options: [],
        next: null
      });
    },
    addNestedQuestion() {
      this.option.next = {
        formLabel: '',
        type: 'StandardChoiceOption',
        required: true,
        requiredErrorMessage: 'This field is required',
        options: [],
        next: null
      };
    },
    removeNestedQuestion() {
      this.option.next = null;
    }
  }
}
</script>
