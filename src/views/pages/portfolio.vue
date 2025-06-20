<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5 font-weight-bold">Portfolio</h4>
    </template>

    <div class="row">
      <div class="col-md-8">
        <ul class="list-unstyled portfolio-list" v-if="!portfolioLoader">
          <li v-for="(image, index) in portfolio" :key="index" class="portfolio-image-item">
            <img :src="image" alt="Portfolio Image" class="img-thumbnail"/>
          </li>
        </ul>

        <ul class="list-unstyled portfolio-list" v-else>
          <li v-for="(image, index) in 2" :key="index" class="portfolio-image-item">
            <div class="lines shine mt-0" style="height: 60px;"></div>
          </li>
        </ul>

        <vue-dropzone
            id="portfolioFile"
            ref="portfolioFile"
            :use-custom-slot="true"
            :options="fileDropOptions"
            @vdropzone-file-added="handleFileUpload"
        >
          <div class="dz-message needsclick">
            <i class="bi bi-upload h3 text-muted"></i>
            <h6>Select files, drag and drop, or take a photo with your camera.</h6>
            <p class="font-weight-lighter">Drag or select your files (PNG, JPG)</p>
          </div>
        </vue-dropzone>
      </div>
    </div>

  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../base-layout/tradesperson-dashboard';
import VueDropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  page: {
    title: "Portfolio",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      portfolio: [],
      portfolioLoader: false,
      isLoading: false,
      portfolioFile: [],
      fileDropOptions: {
        url: '#',
        maxFilesize: 10, // MB
        acceptedFiles: 'image/*',
        addRemoveLinks: true,
        autoProcessQueue: false,
        maxFiles: 1
      }
    };
  },
  components: {
    BaseDashboardLayout,
    VueDropzone
  },
  methods: {
    maxFileExceeded(file) {
      this.$refs.portfolioFile.removeFile(file);
      alert('File type must be an image and size must not exceed 2MB. Please try again.');
    },
    async handleFileUpload(file) {
      if (!file.type.startsWith('image/') || file.size > 10 * 1024 * 1024) {
        this.maxFileExceeded(file);
        return;
      }
      const formData = new FormData();
      formData.append("portfolio", file);

      userService.updatePortfolio(formData).then((res) => {
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true})
          return;
        }
        this.portfolio.push(extra.portfolio);
        this.$refs.portfolioFile.removeFile(file);
      });

    },
    getPortfolio() {
      this.portfolioLoader = true;
      userService.getPortfolio().then((res) => {
        this.portfolioLoader = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.portfolio = extra.portfolio;
      });
    }
  },
  created() {
    this.getPortfolio();
  },
  mounted() {
    $('#portfolio').addClass('active')
  },
};
</script>

<style scoped>
.portfolio-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.portfolio-image-item {
  flex: 1 1 100px; /* Adjust the size as needed */
  max-width: 100px;
}

.portfolio-image-item img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
</style>
