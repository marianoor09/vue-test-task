<template>
  <div class="container-fluid mt-5">
    <table class="table">
      
        <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Month</th>
          <th scope="col">Country</th>
          <th scope="col">DAU</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="item in items.items" :key="item.country">
            <td>#</td>
            <td>{{ item.period }}</td>
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

  data(){
    return {
      items: []
    };
  }, 
  methods: {
    fetchData() {
      axios.get('https://9e34429a-eba3-4e56-85f2-685706a08897.mock.pstmn.io/report/dau?dashboardUserId=abc123&periodFrom=1669852800&periodTo=1674063742&aggregateBy%5B0%5D=month&aggregateBy%5B1%5D=country')
      .then(response => {
        const data = response.data;
        const jsonString = data.replace(/}\s*{/g, '}, {');
        console.log(jsonString);
        this.items = JSON.parse(jsonString);
      })
      .catch(error => {
        console.log(error);
      });
    }
  },  
  mounted() {
    this.fetchData();
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
