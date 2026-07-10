<template>
  <div>
    <topHeader/>
    <div class="container mt-4 mb-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="fw-bold mb-0">Pricing Insights</h4>
        <div>
          <label class="me-2 text-muted" style="font-size:13px;">Filter:</label>
          <select class="form-control d-inline-block w-auto" v-model="statusFilter" @change="loadPricing">
            <option value="">All Quotes</option>
            <option value="accepted">Accepted Only</option>
          </select>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="text-muted mt-2">Loading pricing data...</p>
      </div>

      <div v-else-if="!breakdown.length" class="card p-5 text-center text-muted">
        <i class="bi bi-bar-chart-line" style="font-size:40px; color:#ccc;"></i>
        <p class="mt-3 mb-1 fw-bold">No pricing data yet</p>
        <p style="font-size:13px;">
          Pricing data will appear here once tradespeople start submitting quotes.
          This requires the quotes feature to be active on the platform.
        </p>
      </div>

      <div v-else>
        <!-- Bar Chart -->
        <div class="card p-4 mb-4">
          <h6 class="fw-bold mb-3">Average Price by Trade (JMD)</h6>
          <apexchart
            type="bar"
            height="320"
            :options="chartOptions"
            :series="chartSeries"
          />
        </div>

        <!-- Data Table -->
        <div class="card p-4">
          <h6 class="fw-bold mb-3">Detailed Breakdown</h6>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="bg-primary-1 text-white">
                <tr>
                  <th>Trade</th>
                  <th class="text-end">Quotes</th>
                  <th class="text-end">Avg Total (JMD)</th>
                  <th class="text-end">Avg Materials (JMD)</th>
                  <th class="text-end">Avg Labour (JMD)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in breakdown" :key="row.trade_id">
                  <td class="fw-bold">{{ row.trade_name }}</td>
                  <td class="text-end">{{ row.quote_count }}</td>
                  <td class="text-end text-primary-1 fw-bold">{{ formatJMD(row.avg_total_price) }}</td>
                  <td class="text-end">{{ formatJMD(row.avg_materials_cost) }}</td>
                  <td class="text-end">{{ formatJMD(row.avg_labour_cost) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-muted mt-2" style="font-size:12px;">
            * Averages are calculated from all quotes submitted on the platform.
            Switch the filter above to "Accepted Only" to see agreed prices only.
          </p>
        </div>
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
  name: 'AdminPricingInsights',
  page: {
    title: 'Pricing Insights',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { topHeader, apexchart: VueApexCharts },
  data() {
    return {
      isLoading: true,
      statusFilter: '',
      breakdown: [],
      chartOptions: {
        chart: { type: 'bar', toolbar: { show: false } },
        xaxis: { categories: [] },
        colors: ['#00A7AC', '#FFC107', '#F97316'],
        plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
        dataLabels: { enabled: false },
        yaxis: {
          labels: {
            formatter: val => val ? 'J$' + Math.round(val).toLocaleString() : '-',
          },
        },
        tooltip: {
          y: {
            formatter: val => val ? 'J$' + Math.round(val).toLocaleString() : 'N/A',
          },
        },
        legend: { position: 'top' },
      },
      chartSeries: [],
    };
  },
  methods: {
    formatJMD(val) {
      if (val === null || val === undefined) return '—';
      return 'J$' + Number(val).toLocaleString('en-JM', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    },
    loadPricing() {
      this.isLoading = true;
      userService.getAdminPricingStats(this.statusFilter).then(res => {
        this.isLoading = false;
        if (res.extra) {
          this.breakdown = res.extra.breakdown || [];
          this.chartOptions = {
            ...this.chartOptions,
            xaxis: { categories: res.extra.categories || [] },
          };
          this.chartSeries = res.extra.series || [];
        }
      });
    },
  },
  created() {
    this.loadPricing();
  },
  mounted() {
    $('#pricing-insights').addClass('active');
  },
};
</script>

<style scoped>
.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
</style>
