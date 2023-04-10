<template>
  <div class="container">
    <p></p>
    <BootstrapCard>
      <BootstrapCardHeader header="Business Activity Monitoring (BAM)"></BootstrapCardHeader>
      <BootstrapCardBody>
        <BootstrapTable>
          <BootstrapTableHeader
              :headers="['No','Cover','ISBN','Title','Author','Price','Quantity','Total']"></BootstrapTableHeader>
          <tbody>
          <tr v-for="(item,index) in purchases" :key="index">
            <td>{{ index + 1 }}</td>
            <td><img class="img-thumbnail" style="width: 32px" v-bind:src="item.book.cover"></td>
            <td>{{ item.book.isbn }}</td>
            <td>{{ item.book.title }}</td>
            <td>{{ item.book.author }}</td>
            <td>{{ item.book.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
          </tr>
          <tr>
            <td colspan="6"></td>
            <td>{{purchases.reduce((sum,item) => sum + item.quantity , 0)}}</td>
            <td>{{purchases.reduce((sum,item) => sum + item.price , 0)}}</td>
          </tr>
          </tbody>
        </BootstrapTable>
        <p></p>
        <Bar  :chart-data="bookQuantityChartData"
              :chart-options="chartOptions"
              :width="256"
              :height="256"
              chartId="1"
        />
        <p></p>
        <Line  :chart-data="bookPriceChartData"
              :chart-options="chartOptions"
              :width="256"
              :height="256"
              chartId="2"
        />
      </BootstrapCardBody>
    </BootstrapCard>
  </div>
</template>
<script>
import BootstrapCard from "@/components/BootstrapCard";
import BootstrapCardHeader from "@/components/BootstrapCardHeader";
import BootstrapCardBody from "@/components/BootstrapCardBody";
import {io} from "socket.io-client";
import BootstrapTable from "@/components/BootstrapTable";
import BootstrapTableHeader from "@/components/BootstrapTableHeader";
import {Bar, Line} from "vue-chartjs";
import {Chart, registerables} from "chart.js"

Chart.register(...registerables);

export default {
  name: "BookstoreBam",
  components: {BootstrapCardBody, BootstrapCardHeader, BootstrapCard,BootstrapTable,BootstrapTableHeader,Bar, Line},
  mounted() {
    this.wsClient = io("ws://localhost:9001");
    this.wsClient.on("connect", () => {
      this.wsClient.on("bam", purchase => {
        purchase.forEach(item => {
          let isbn = item.book.isbn;
          if(!this.books[isbn]){
             this.books[isbn] = item;
           } else {
             this.books[isbn].quantity += item.quantity;
             this.books[isbn].price += item.price;
          }
        });
        let aggregatedPurchases = [];
        let chartData = {
          labels: [],
          datasets: [
            {data: [], label: "Quantity"},
            {data: [], label: "Total"}
          ]
        }
        let total = purchase.reduce((sum,item) => sum + item.price, 0);
        let priceChartData = {
          labels: [...this.bookPriceChartData.labels, new Date().toLocaleString()],
          datasets: [
            {data: [...this.bookPriceChartData.datasets[0].data, total], label: "Price"}
          ]
        };
        for (let isbn in this.books){
          let item = this.books[isbn];
          chartData.labels.push(item.book.title);
          chartData.datasets[0].data.push(item.quantity);
          chartData.datasets[1].data.push(item.price);
          aggregatedPurchases.push(item);
        }
        this.bookQuantityChartData = chartData;
        this.bookPriceChartData = priceChartData;
        this.purchases = aggregatedPurchases;
      });
    });
  },
  unmounted() {
    if (this.wsClient)
      this.wsClient.close();
  },
  data: function () {
    return {
      purchases: [],
      books: new Object(),
      wsClient: null,
      chartOptions: {
          responsive: true
      },
      bookQuantityChartData: {
        labels: [],
        datasets: [
          {data: [], label: "Quantity"}
        ]
      },
      bookPriceChartData: {
        labels: [],
        datasets: [
          {data: [], label: "Price"}
        ]
      }
    };
  }
}
</script>

<style scoped>

</style>