<template>
  <el-card>
      <div slot="header">
          <my-bread>粉丝管理</my-bread>
      </div>
       <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="粉丝列表" name="list">
                <div class="fans_list">
                    <div class="fans_item" v-for="item in fans" :key="item.id.toString()">
                        <el-avatar :size="80" :src="item.photo"></el-avatar>
                        <p>item.name</p>
                        <el-button type="primary" plain size="small">+关注</el-button>
                    </div>
                </div>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="reqParams.per_page"
                    :current-page="reqParams.page"
                    @current-change="pager">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="粉丝画像" name="pics">
                   <div ref="main" style="width: 600px;height:400px;"></div>
                   <!-- var myChart = echarts.init(document.getElementById('main')); -->
            </el-tab-pane>
       </el-tabs>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      fans: [],
      activeName: 'list',
      reqParams: {
        page: 1,
        per_page: 21
      },
      total: 0
    }
  },
  created () {
    this.getFans()
  },
  methods: {
    async getFans () {
      const { data: { data } } = await this.$http.get('followers', { params: this.reqParams })
      this.fans = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getFans()
    }
  },
  mounted () {
    const myChart = echarts.init(this.$refs.main)
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myChart.setOption(option)
  }
}
</script>

<style scoped lang='less'>
.fans_list{
    .fans_item{
        width: 120px;
        height:190px ;
        border: 1px dashed #ddd;
        text-align: center;
        padding-top: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
        display: inline-block;
    }
}

</style>
