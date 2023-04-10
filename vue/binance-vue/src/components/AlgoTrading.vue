<template>
  <div class="container">
    <p></p>
    <BootstrapCard>
      <BootstrapCardHeader header="Algotrading">
        <BootstrapBadge :value="totalVolume.toFixed(0)"
                        color="bg-warning"/>
        <button @click="toggleMonitoring"
                :class="monitorButtonClass">{{ monitorButtonLabel }}
        </button>
      </BootstrapCardHeader>
      <BootstrapCardBody>
        <Line
            :chart-options="chartOptions"
            :chart-data="volumeChartData"
            :width="512"
            :height="512"
            chartId="1"
        />
        <BootstrapTable>
          <BootstrapTableHeader :headers="['No','Price','Quantity','Volume','Timestamp']"></BootstrapTableHeader>
          <tbody>
          <tr v-for="(trade,index) in trades" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ Number(trade.price).toFixed(0) }}</td>
            <td>{{ trade.quantity }}</td>
            <td>{{ trade.volume.toFixed(0) }}</td>
            <td>{{ new Date(trade.timestamp).toLocaleString() }}</td>
          </tr>
          </tbody>
        </BootstrapTable>
      </BootstrapCardBody>
    </BootstrapCard>
  </div>
</template>

<script>
import {io} from "socket.io-client";
import {Line} from 'vue-chartjs';
import BootstrapCardBody from "@/components/BootstrapCardBody";
import BootstrapCard from "@/components/BootstrapCard";
import BootstrapCardHeader from "@/components/BootstrapCardHeader";
import BootstrapTable from "@/components/BootstrapTable";
import BootstrapTableHeader from "@/components/BootstrapTableHeader";
import {Chart, registerables} from "chart.js";
import BootstrapBadge from "@/components/BootstrapBadge";

Chart.register(...registerables);

export default {
  name: "AlgoTrading",
  components: {
    BootstrapBadge,
    BootstrapCardBody, BootstrapCard, BootstrapCardHeader, BootstrapTable, BootstrapTableHeader, Line
  },
  methods: {
    toggleMonitoring() {
      if (this.isMonitoring) {
        this.isMonitoring = false;
        this.monitorButtonLabel = "Start Monitoring";
        this.monitorButtonClass= "btn btn-success";
      } else {
        this.isMonitoring = true;
        this.monitorButtonLabel = "Pause Monitoring";
        this.monitorButtonClass= "btn btn-danger";
      }
    }
  },
  data: function () {
    return {
      monitorButtonLabel: "Pause Monitoring",
      monitorButtonClass: "btn btn-danger",
      isMonitoring: true,
      wsClient: null,
      trades: [],
      totalVolume: 0,
      chartOptions: {
        responsive: true,
        animation: false
      },
      volumeChartData: {
        labels: [],
        datasets: [
          {data: [], label: "Volume"}
        ]
      }
    };
  }, mounted() {
    this.wsClient = io("ws://localhost:5555");
    this.wsClient.on("connect", () => {
      this.wsClient.on("ticker", trade => {
        if (!this.isMonitoring) return;
        let volume = Number(trade.price) * Number(trade.quantity);
        this.totalVolume += volume;
        this.trades.push({...trade, volume});
        if (this.trades.length > 50) {
          this.trades.splice(this.trades.length - 50, this.trades.length - 50);
        }
        let volumeChartData = {
          labels: [...this.volumeChartData.labels],
          datasets: [
            {data: [...this.volumeChartData.datasets[0].data], label: "Volume"}
          ]
        };
        volumeChartData.labels.push(trade.timestamp);
        if (volumeChartData.labels.length > 50) {
          volumeChartData.labels.splice(volumeChartData.labels.length - 50, volumeChartData.labels.length - 50);
        }
        volumeChartData.datasets[0].data.push(volume);
        if (volumeChartData.datasets[0].data.length > 50) {
          volumeChartData.datasets[0].data.splice(volumeChartData.datasets[0].data.length - 50, volumeChartData.datasets[0].data.length - 50);
        }
        this.volumeChartData = volumeChartData;
      });
    });
  },
  unmounted() {
    if (this.wsClient)
      this.wsClient.close();
  }
}
</script>

<style scoped>

</style>