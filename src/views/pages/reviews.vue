<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Reviews</h4>
    </template>
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body" v-if="isLoading">
            <div class="lines shine" v-for="(item,i) in 3" :key="i"></div>
          </div>
          <div class="card-body" v-else>
            <h6 class="reviews-title">Overall rating</h6>
            <div class="rating-container">
              <span class="rating-value">{{rating}}</span>
              <div class="rating-stars">
                <i v-for="i in 5"
                   :key="i"
                   :class="getStarClass(i)">
                </i>
              </div>


              <span class="review-count">({{total_rating}} reviews)</span>
            </div>
<!--            <button class="request-review-btn">Request a review</button>-->
          </div>
        </div>
        <h6 class="fw-bold mt-4">Reviews ({{ total_rating }})</h6>

        <div
            v-for="(review, index) in reviews"
            :key="index"
            class="review-card card mb-3"
        >
          <div class="card-body d-flex">
            <!-- Image -->
            <img
                :src="review.image"
                :alt="review.rater.name"
                class="review-image rounded-circle"
                v-if="review.rater.photo"
            />
            <div v-else class="profile-image cursor-pointer rounded-circle" style="width: 50px; height: 50px;">
              <i class="bi bi-person-fill"></i>
            </div>

            <!-- Content -->
            <div class="review-content ml-3">
              <h6 class="review-title text-primary-1 font-weight-bold text-decoration-underline">
                {{ review.service_request.headline }}
              </h6>
              <div class="review-by text-muted">
                Rated by {{ review.rater.name }}
              </div>
              <div class="review-description mt-2 text-dark">
                “{{ review.comment }}”
              </div>
            </div>

            <!-- Rating -->
            <div class="review-rating ml-auto text-right">
              <div>
                <i
                    v-for="n in 5"
                    :key="n"
                    :class="['bi', n <= review.rating ? 'bi-star-fill text-primary-1' : 'bi-star']"
                ></i>
              </div>
            </div>
          </div>
        </div>


        <div v-if="!reviews.length && !isLoading" class="text-muted mt-3">
          No reviews available.
        </div>

      </div>
    </div>

  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../base-layout/tradesperson-dashboard';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  name: "Reviews",
  page: {
    title: "Reviews",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      reviews: [],
      rating: '',
      total_rating: '',
      isLoading: false,
      user: this.$store.getters.GET_USER_INFO || {},
    };
  },
  components: {
    BaseDashboardLayout
  },
  methods: {
    getStarClass(index) {
      if (this.rating >= index) return 'bi bi-star-fill';
      if (this.rating >= index - 0.5) return 'bi bi-star-half';
      return 'bi bi-star';
    },
    getRatings() {
      this.isLoading = true;
      userService.getRatings(this.user.id).then((res) => {
        this.isLoading = false;
        const {extra, status} = res;
        if (status) {
          this.reviews = extra.reviews;
          this.rating = extra.average_rating;
          this.total_rating = extra.total_rating;
        }
      });
    },

  },
  created() {
    this.getRatings();
  },
  mounted() {
    $('#reviews').addClass('active')
  },
};
</script>

<style scoped>
/* Add any custom styles here */

.rating-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.rating-value {
  font-size: 18px;
  margin-right: 10px;
  font-weight: bold;
}

.rating-stars {
  color: #ffc107;
  margin-right: 5px;
  font-size: 13px;
}

.review-count {
  color: #6c757d;
  margin-left: 5px;
}

.request-review-btn {
  background-color: var(--primary-color1);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  width: 100%;
}

.reviews-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.review-card {
  border: 1px solid #e2e2e2;
  border-radius: 8px;
}

.review-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.review-content {
  flex: 1;
}

.review-title {
  font-size: 16px;
}

.review-by {
  font-size: 14px;
}

.review-description {
  font-size: 15px;
  margin-top: 5px;
}

.review-rating i {
  font-size: 16px;
  margin-left: 2px;
}

</style>
