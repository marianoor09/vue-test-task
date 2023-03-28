<template>
  <div class="table-element">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th @click="sortTable('date')" scope="col">Month</th>
          <th @click="sortTable('country')" scope="col">Country</th>
          <th @click="sortTable('count')" scope="col">DAU</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sortedData" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.country }}</td>
          <td>{{ item.count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',

  data() {
    return {
      data: [],
      sortBy: null,
      sortDesc: false
    };
  },
  computed: {
    sortedData() {
      if (!Array.isArray(this.data)) {
        return [];
      }
      let sorted = [...this.data];
      if (this.sortBy) {
        sorted.sort((a, b) => {
          let modifier = this.sortDesc ? -1 : 1;
          if (a[this.sortBy] < b[this.sortBy]) return -1 * modifier;
          if (a[this.sortBy] > b[this.sortBy]) return 1 * modifier;
          return 0;
        });
      }
      return sorted;
    }
  },
  methods: {
    sortTable(column) {
      if (this.sortBy === column) {
        this.sortDesc = !this.sortDesc;
      } else {
        this.sortBy = column;
        this.sortDesc = false;
      }
      // Handle the case when this.sortBy is null
      if (this.sortBy === null) {
        this.data.reverse();
      }
    },
    fetchData() {
      axios
        .get(
          'https://9e34429a-eba3-4e56-85f2-685706a08897.mock.pstmn.io/report/dau?dashboardUserId=abc123&periodFrom=1669852800&periodTo=1674063742&aggregateBy%5B0%5D=month&aggregateBy%5B1%5D=country'
        )
        .then(response => {
          const data = response.data;
          const jsonString = data.replace(/}\s*{/g, '}, {');
          this.data = JSON.parse(jsonString).items;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

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