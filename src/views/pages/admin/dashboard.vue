<template>
  <div>
    <topHeader/>
    <div class="container mt-4 mb-5">
      <h4 class="fw-bold mb-4">Admin Dashboard</h4>

      <!-- Summary Cards -->
      <div class="row g-3 mb-5">
        <!-- Active Tradespeople -->
        <div class="col-6 col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-teal">
              <i class="bi bi-people-fill"></i>
            </div>
            <div class="stat-value" v-if="!loadingTradesperson">{{ tradespersonStats.total_tradespeople || 0 }}</div>
            <div class="lines shine stat-value-loader" v-else></div>
            <div class="stat-label">Total Tradespeople</div>
          </div>
        </div>

        <!-- Open Jobs -->
        <div class="col-6 col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-blue">
              <i class="bi bi-briefcase-fill"></i>
            </div>
            <div class="stat-value" v-if="!loadingJobs">{{ jobStats.snapshot ? jobStats.snapshot.open : 0 }}</div>
            <div class="lines shine stat-value-loader" v-else></div>
            <div class="stat-label">Open Jobs</div>
          </div>
        </div>

        <!-- In Progress Jobs -->
        <div class="col-6 col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-orange">
              <i class="bi bi-tools"></i>
            </div>
            <div class="stat-value" v-if="!loadingJobs">{{ jobStats.snapshot ? jobStats.snapshot.in_progress : 0 }}</div>
            <div class="lines shine stat-value-loader" v-else></div>
            <div class="stat-label">In Progress</div>
          </div>
        </div>

        <!-- Completed Jobs -->
        <div class="col-6 col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-green">
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <div class="stat-value" v-if="!loadingJobs">{{ jobStats.snapshot ? jobStats.snapshot.completed : 0 }}</div>
            <div class="lines shine stat-value-loader" v-else></div>
            <div class="stat-label">Completed Jobs</div>
          </div>
        </div>
      </div>

      <!-- Job Volume Chart -->
      <div class="row g-3 mb-4">
        <div class="col-md-7">
          <div class="card p-4">
            <h6 class="fw-bold mb-3">Jobs This Year</h6>
            <div v-if="loadingJobs" class="text-center py-4">
              <div class="spinner-border text-primary" role="status"></div>
            </div>
            <div v-else>
              <apexchart
                type="bar"
                height="280"
                :options="jobChartOptions"
                :series="jobStats.series || []"
              />
            </div>
          </div>
        </div>

        <!-- Tradespeople by Parish -->
        <div class="col-md-5">
          <div class="card p-4">
            <h6 class="fw-bold mb-3">Tradespeople by Parish</h6>
            <div v-if="loadingTradesperson" class="text-center py-4">
              <div class="spinner-border text-primary" role="status"></div>
            </div>
            <div v-else-if="parishData.length">
              <div
                v-for="row in parishData.slice(0, 8)"
                :key="row.parish_name"
                class="parish-row"
              >
                <span class="parish-name">{{ row.parish_name }}</span>
                <div class="parish-bar-wrap">
                  <div
                    class="parish-bar"
                    :style="{ width: barWidth(row.tradesperson_count) + '%' }"
                  ></div>
                </div>
                <span class="parish-count">{{ row.tradesperson_count }}</span>
              </div>
            </div>
            <p v-else class="text-muted">No data yet.</p>
          </div>
        </div>
      </div>

      <!-- Tradespeople by Trade -->
      <div class="card p-4">
        <h6 class="fw-bold mb-3">Tradespeople by Trade Category</h6>
        <div v-if="loadingTradesperson" class="text-center py-4">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
        <div v-else-if="tradeData.length">
          <apexchart
            type="bar"
            height="260"
            :options="tradeChartOptions"
            :series="tradespersonStats.by_trade ? tradespersonStats.by_trade.series : []"
          />
        </div>
        <p v-else class="text-muted">No trade data yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../../base-layout/admin-header';
import appConfig from '../../../../app.config.json';
import { userService } from '@/apis/user.service';
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'AdminDashboard',
  page: {
    title: 'Admin Dashboard',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { topHeader, apexchart: VueApexCharts },
  data() {
    return {
      loadingJobs: true,
      loadingTradesperson: true,
      jobStats: {},
      tradespersonStats: {},
      jobChartOptions: {
        chart: { type: 'bar', toolbar: { show: false } },
        xaxis: { categories: [] },
        colors: ['#00A7AC', '#FFC107'],
        plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
        legend: { position: 'top' },
        dataLabels: { enabled: false },
      },
      tradeChartOptions: {
        chart: { type: 'bar', toolbar: { show: false } },
        xaxis: { categories: [] },
        colors: ['#00A7AC'],
        plotOptions: { bar: { borderRadius: 4, horizontal: true } },
        dataLabels: { enabled: false },
      },
    };
  },
  computed: {
    parishData() {
      return this.tradespersonStats.by_parish
        ? this.tradespersonStats.by_parish.breakdown
        : [];
    },
    tradeData() {
      return this.tradespersonStats.by_trade
        ? this.tradespersonStats.by_trade.breakdown
        : [];
    },
    maxParishCount() {
      if (!this.parishData.length) return 1;
      return Math.max(...this.parishData.map(r => r.tradesperson_count));
    },
  },
  methods: {
    barWidth(count) {
      return Math.round((count / this.maxParishCount) * 100);
    },
    loadJobStats() {
      userService.getAdminDashboardStats().then(res => {
        this.loadingJobs = false;
        if (res.extra) {
          this.jobStats = res.extra;
          this.jobChartOptions = {
            ...this.jobChartOptions,
            xaxis: { categories: res.extra.categories || [] },
          };
        }
      });
    },
    loadTradespersonStats() {
      userService.getAdminTradespersonStats().then(res => {
        this.loadingTradesperson = false;
        if (res.extra) {
          this.tradespersonStats = res.extra;
          this.tradeChartOptions = {
            ...this.tradeChartOptions,
            xaxis: {
              categories: res.extra.by_trade ? res.extra.by_trade.categories : [],
            },
          };
        }
      });
    },
  },
  created() {
    this.loadJobStats();
    this.loadTradespersonStats();
  },
  mounted() {
    $('#dashboard').addClass('active');
  },
};
</script>

<style scoped>
.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  text-align: center;
}

.stat-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
}

.bg-teal   { background: #00A7AC; }
.bg-blue   { background: #3B82F6; }
.bg-orange { background: #F97316; }
.bg-green  { background: #22C55E; }

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.1;
}

.stat-value-loader {
  height: 32px;
  width: 60px;
  margin: 0 auto;
  border-radius: 4px;
}

.stat-label {
  font-size: 13px;
  color: #6c757d;
  margin-top: 4px;
}

.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}

.parish-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 13px;
}

.parish-name {
  width: 130px;
  flex-shrink: 0;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.parish-bar-wrap {
  flex: 1;
  background: #f0f0f0;
  border-radius: 4px;
  height: 10px;
}

.parish-bar {
  height: 10px;
  background: #00A7AC;
  border-radius: 4px;
  transition: width 0.4s ease;
}

.parish-count {
  width: 28px;
  text-align: right;
  color: #555;
  font-weight: 600;
}
</style>
