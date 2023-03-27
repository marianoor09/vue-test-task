<template>
  <div class="container-fluid">
    <div>
      <Bar v-if="chartData1.labels.length" :data="chartData1" :options="options" ref="chart" />
    </div>
    <div>
    </div>
  </div>
</template>

<script>  
import axios from 'axios';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Bar
  },
  data() {
    return {
      chartData1: {
        labels: [],
        datasets: [
            {
              label: 'US',
              data:[],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
              label: 'UA',
              data: [],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
        ],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: {
            display: true
          }
        }
     
      },
      
    }
  }, 
  methods: {
    chartData() {
      axios.get('https://9e34429a-eba3-4e56-85f2-685706a08897.mock.pstmn.io/report/dau?dashboardUserId=abc123&periodFrom=1669852800&periodTo=1674063742&aggregateBy%5B0%5D=month&aggregateBy%5B1%5D=country')
      .then(response => {
        const data = response.data;
        const jsonString = data.replace(/}\s*{/g, '}, {');
        
        const counts = [];

        const items = JSON.parse(jsonString).items;
        console.log(items);
        const usData = items.filter(d => d.country === 'US');
      const uaData = items.filter(d => d.country === 'UA');
      const months = Array.from(new Set(items.map(d => d.date)));
      this.chartData1.labels = months;
      console.log(this.chartData1.datasets[0]);
      console.log(usData.map(d => d.count));
        this.chartData1.datasets[0].data = usData.map(d => d.count);
        this.chartData1.datasets[1].data = uaData.map(d => d.count);         
        // 
      })
      .catch(error => {
        console.log(error);
      });
    }
  },  
  created () {
    this.chartData();
 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
