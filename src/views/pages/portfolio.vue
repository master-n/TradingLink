<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5 font-weight-bold">Portfolio</h4>
    </template>

    <div class="row">
      <div class="col-md-10">
        <!-- Add Portfolio Button -->
        <div class="mb-4">
          <b-button variant="primary" @click="addPortfolio"><i class="bi bi-plus-circle"/> Add Portfolio</b-button>
        </div>

        <!-- Portfolio Cards with Draggable -->
        <draggable v-model="portfolio" class="row" :options="{ animation: 200 }" @end="onDragEnd">
          <div v-for="(item, index) in portfolio" :key="index" class="col-md-4 mb-3">
            <div
                class="card h-100 shadow-sm"
                style="cursor: pointer;"
            >
              <img
                  :src="item.file || 'https://placehold.co/400x300'"
                  class="card-img-top"
                  @click="openGallery(index)"
                  style="height: 200px; object-fit: cover;"
              >
              <div class="card-body">
                <h5 class="mb-2 p-description" @click="openGallery(index)">{{ item.title || 'Untitled' }}</h5>
                <p class="p-description" @click="openGallery(index)">{{
                    item.description || 'No description provided.'
                  }}</p>

                <!-- Edit and Delete buttons -->
                <div class="d-flex justify-content-center mt-3">
                  <b-button size="sm" class="me-2 bg-light border text-dark" @click="editPortfolio(index)"><i
                      class="bi bi-pencil"/> Edit
                  </b-button>
                  <b-button size="sm" class="btn-rounded bg-light border text-dark" @click="deletePortfolio(index)"><i
                      class="bi bi-trash"></i> Delete
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </draggable>
        <b-button
            v-if="isDirty"
            variant="primary"
            class="mb-3"
            @click="savePortfolioOrder"
        >
          Save Changes
        </b-button>


      </div>
    </div>

    <!-- Gallery Modal -->
    <b-modal v-model="galleryVisible" size="xl" hide-footer centered>
      <div class="d-flex flex-row" style="min-height: 500px;">

        <b-button
            variant="light"
            class="position-absolute btn-primary"
            style="top: 50%; left: 20px; transform: translateY(-50%); z-index: 10; border-radius: 50%; width: 50px; height: 50px;"
            @click="prevImage"
            :disabled="currentIndex === 0"
        >
          <i class="bi bi-chevron-left"></i>
        </b-button>

        <b-button
            variant="light"
            class="position-absolute btn-primary"
            style="top: 50%; right: 20px; transform: translateY(-50%); z-index: 10; border-radius: 50%; width: 50px; height: 50px;"
            @click="nextImage"
            :disabled="currentIndex === portfolio.length - 1"
        >
          <i class="bi bi-chevron-right"></i>
        </b-button>

        <!-- Left image -->
        <div class="flex-fill d-flex justify-content-center align-items-center bg-light" style="max-width: 60%;">
          <img
              :src="portfolio[currentIndex]?.file || 'https://placehold.co/400x300'"
              class="img-fluid"
              style="max-height: 80%; object-fit: contain;"
          >
        </div>

        <!-- Right text -->
        <div class="p-4" style="width: 40%;">
          <h5>{{ portfolio[currentIndex]?.title || 'Untitled' }}</h5>
          <p>{{ portfolio[currentIndex]?.description || 'No description provided.' }}</p>
        </div>

      </div>
    </b-modal>

    <!-- Add Portfolio Modal -->
    <b-modal v-model="showModal" title="Add Portfolio">
      <b-form @submit.prevent="submitPortfolio">
        <b-form-group label="Title *">
          <b-form-input v-model="newPortfolio.title" required></b-form-input>
        </b-form-group>

        <b-form-group label="Description" class="mt-2">
          <b-form-textarea v-model="newPortfolio.description" rows="3"></b-form-textarea>
        </b-form-group>

        <b-form-group label="Image *" class="my-2">
          <input type="file" @change="handleFileChange($event)" accept="image/*" required>
          <div v-if="previewImage" class="mt-2">
            <img :src="previewImage" class="img-thumbnail" style="max-height:150px;" alt="">
          </div>
        </b-form-group>

        <b-button type="submit" variant="primary" class="mt-4" block :disabled="isSubmitting">
          {{ isSubmitting ? 'Saving...' : 'Save' }}
        </b-button>
      </b-form>
    </b-modal>

    <b-modal v-model="showEditModal" title="Edit Portfolio" hide-footer>
      <b-form @submit.prevent="submitEditedPortfolio">
        <b-form-group label="Title *">
          <b-form-input v-model="portfolioInfo.title" required></b-form-input>
        </b-form-group>

        <b-form-group label="Description" class="mt-2">
          <b-form-textarea v-model="portfolioInfo.description" rows="3"></b-form-textarea>
        </b-form-group>

        <b-form-group :label="previewImage?'Image ':'Image *'" class="my-2">
          <input type="file" @change="handleFileChange($event)" accept="image/*" :required="!previewImage">
          <div v-if="previewImage" class="mt-2">
            <img :src="previewImage" class="img-thumbnail" style="max-height:150px;" alt="">
          </div>
        </b-form-group>

        <b-button type="submit" variant="primary" class="mt-4" block :disabled="isSubmitting">
          {{ isSubmitting ? 'Saving...' : 'Save' }}
        </b-button>
      </b-form>
    </b-modal>

  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../base-layout/tradesperson-dashboard';
import VueDropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";
import draggable from 'vuedraggable';
import {confirm} from "@/utils/functions";


export default {
  page: {
    title: "Portfolio",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      portfolio: [],
      isDirty: false,
      newPortfolio: {title: "", description: "", file: null},
      previewImage: null,
      showModal: false,
      showEditModal: false,
      portfolioInfo: {title: "", description: "", file: null},
      isSubmitting: false,
      galleryVisible: false,
      currentIndex: 0,
      portfolioLoader: false,
      isLoading: false,
      editIndex: null,
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
    VueDropzone,
    draggable
  },

  methods: {
    onDragEnd() {
      this.isDirty = true;
    },

    savePortfolioOrder() {
      const orderData = this.portfolio.map((item, index) => ({
        id: item.id,
        order: index + 1
      }));

      userService.savePortfolioOrder({'order': orderData}).then(res => {
        if (res.status) {
          this.isDirty = false;
          this.$store.dispatch('success', {message: 'Portfolio order saved successfully!', showSwal: true});
        } else {
          this.$store.dispatch('error', {message: res.message, showSwal: true});
        }
      });

    },
    editPortfolio(index) {
      console.log("Editing portfolio item at index:", index);
      this.previewImage = null
      const item = this.portfolio[index];
      this.editIndex = index;
      this.portfolioInfo = {
        id: item.id,
        title: item.title,
        description: item.description,
        file: item.file
      };
      this.previewImage = item.file ? item.file : null;
      this.showEditModal = true;
    },

    addPortfolio() {
      this.newPortfolio = {title: "", description: "", file: null};
      this.previewImage = null;
      this.showModal = true;
      this.isSubmitting = false;
    },

    deletePortfolio(index) {
      confirm("Are you sure you want to delete this portfolio item?", () => {
        this.isLoading = true;
        userService.deletePortfolio(this.portfolio[index].id).then((res)=>{
          this.isLoading = false;
          const {status, message} = res;
          if (!status) {
            this.$store.dispatch('error', {message: message, showSwal: true});
            return;
          }
          this.$store.dispatch('success', {message: message, showSwal: true});
          this.portfolio.splice(index, 1);
        })
      })
    },

    submitEditedPortfolio() {
      if (!this.portfolioInfo.title || (!this.portfolioInfo.file && this.editIndex === null)) {
        alert("Please fill in all required fields.");
        return;
      }
      this.isSubmitting = true;

      const formData = new FormData();
      if (typeof this.portfolioInfo.file !== 'string') { // means new file selected
        formData.append("portfolio", this.portfolioInfo.file);
      }
      formData.append("title", this.portfolioInfo.title);
      formData.append("description", this.portfolioInfo.description);

      userService.editPortfolio(formData, this.portfolioInfo.id).then(res => {
        this.isSubmitting = false;
        this.showEditModal = false;
        if (res.status) {
          this.portfolio[this.editIndex] = {
            id: this.portfolioInfo.id,
            title: this.portfolioInfo.title,
            description: this.portfolioInfo.description,
            file: typeof this.portfolioInfo.file === 'string' ? this.portfolioInfo.file : res.extra.portfolio
          };
          this.$store.dispatch('success', {message: res.message, showSwal: true});

        } else {
          this.$store.dispatch('error', {message: res.message, showSwal: true});
        }
      });
    },

    closeModal() {
      this.showModal = false;
      this.newPortfolio = {title: "", description: "", file: null};
      this.previewImage = null;
      this.isSubmitting = false;
    },
    openGallery(index) {
      this.currentIndex = index;
      this.galleryVisible = true;
    },
    prevImage() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    nextImage() {
      if (this.currentIndex < this.portfolio.length - 1) this.currentIndex++;
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (!file || !file.type.startsWith('image/')) {
        alert("Please select a valid image.");
        return;
      }
      this.newPortfolio.file = file;
      this.previewImage = URL.createObjectURL(file);
    },

    submitPortfolio() {
      if (!this.newPortfolio.title || (!this.newPortfolio.file && this.editIndex === null)) {
        alert("Please fill in all required fields.");
        return;
      }
      this.isSubmitting = true;

      const formData = new FormData();
      if (typeof this.newPortfolio.file !== 'string') {
        formData.append("portfolio", this.newPortfolio.file);
      }
      formData.append("title", this.newPortfolio.title);
      formData.append("description", this.newPortfolio.description);

      userService.addPortfolio(formData).then(res => {
        this.isSubmitting = false;
        if (res.status) {
          this.portfolio.push({
            title: this.newPortfolio.title,
            description: this.newPortfolio.description,
            file: res.extra.portfolio
          });

          this.closeModal();
        } else {
          this.$store.dispatch('error', {message: res.message, showSwal: true});
        }
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

.p-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  /*min-height: 48px;*/
}
</style>
