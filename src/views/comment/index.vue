<template>
  <el-card>
      <div slot="header">
          <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="articles" style="width: 100%">
          <el-table-column prop="title" label="标题" width="400">

          </el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数">

          </el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数">

          </el-table-column>
          <el-table-column  label="状态">
              <!-- 作用域插槽,子组件向父组件传值 第五条视频 -->
              <template slot-scope="scope">
                  {{scope.row.comment_status?'正常':'关闭'}}
              </template>
          </el-table-column>
          <el-table-column prop="comment_status" label="操作" width="120">
            <template slot-scope="scope">
                <el-button type="success" v-if="!scope.row.comment_status" size="small" @click="toggleStatus(scope.row.id,true)">打开评论</el-button>
                <el-button type="danger" v-if="scope.row.comment_status" size="small"  @click="toggleStatus(scope.row.id,false)">关闭评论</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager">
      </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    toggleStatus (id, status) {
      const text = status ? '确认要打开评论吗?' : '确定要关闭评论吗?'
      this.$confirm(text, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(
        async () => {
          const { data: { data } } = await this.$http.put(`comments/status?article_id=${id}`, { allow_comment: status })
          this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
          this.getArticles()
        }
      )
        .catch(() => {})
    }
  }
}

</script>

<style scoped lang='less'></style>
