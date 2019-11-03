<template>
  <div class='container-article'>
    <el-card>
        <div slot="header">
            <my-bread>内容管理</my-bread>
        </div>
        <div>
          <el-form  label-width="80px" size="small" >
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道组件 -->
        <my-channel v-model="reqParams.channel_id"></my-channel>
        <el-form-item label="日期:">
            <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
             @change="changeDate"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="search" >筛选</el-button>
        </el-form-item>
      </el-form>
        </div>
    </el-card>
    <el-card class="box-card" style="margin-top:20px">
        <div slot="header">
          <span>根据筛选条件共查询到 {{total}} 条结果</span>
        </div>
         <el-table
          :data="articles"
          style="width: 100%">
          <el-table-column
            label="封面"
           >
             <template slot-scope="scope">
                 <el-image
                  style="width: 150px; height: 100px"
                  :src="scope.row.cover.images[0]"
                  fit="fit">
                  <div slot="error" >
                    <img src="../../assets/error.gif" width="150" height="100">
                  </div>
                  </el-image>
             </template>
          </el-table-column>
          <el-table-column
            label="标题"
            prop="title">
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
              <el-tag v-if="scope.row.status===1">待审核</el-tag>
              <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
              <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
              <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="发布时间"
            prop="pubdate">
          </el-table-column>
          <el-table-column
            label="操作" width="120px">
            <template slot-scope="scope">
              <el-button @click="toEdit(scope.row.id)" type="primary" icon="el-icon-edit" plain circle></el-button>
              <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" plain circle></el-button>
            </template>
          </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:20px"
      background
      layout="prev, pager, next"
       :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        :total="total"
        @current-change="pager"
      >
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      total: 0,
      articles: [],
      // channelOptions: [],
      dateArr: []
    }
  },
  methods: {
    // async getChannelOptions () {
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    // 分页功能
    pager (newPage) {
      // 根据新的页码和当前的筛选条件 重新查询数据即可
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 筛选查询
    search () {
      // 准备日期数据
      // 进行数据获取
      // 如果频道的值 '' 时候 修改为 null
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      // 回到第一页
      this.reqParams.page = 1
      this.getArticles()
    },
    changeDate (dateArr) {
      // dateArr 的数据格式：[date,date]
      // 后端需要的是字符串格   dateArr 的数据格式：[string,string]
      // 注意：清除选择的日期后  dateArr的值 null
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    toEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除
    async del (id) {
      // 请求
      await this.$http.delete(`articles/${id}`)
      // 提示
      this.$message.success('删除文章成功')
      // 更新列表
      this.getArticles()
    }
  },
  created () {
    // this.getChannelOptions()
    this.getArticles()
  }
}
</script>

<style scoped lang='less'></style>
