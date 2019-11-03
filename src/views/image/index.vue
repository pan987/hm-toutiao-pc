<template>
  <el-card>
      <div slot="header">
          <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
            <el-radio-group v-model="reqParams.collect" size="small" @change="toggleList">
                    <el-radio-button :label="false">全部</el-radio-button>
                    <el-radio-button :label="true">收藏</el-radio-button>
                    <!-- label前要加: 使里边的字符串变为变量,因为下边 v-if="!reqParams.collect" 中!reqParams.collect是一个表达式,
                    如果传入的reqParams.collect是字符串,则reqParams.collect将一直为真,元素会一直隐藏-->
            </el-radio-group>
            <el-button type="success" size="small" style="float:right" @click="openDialog">添加素材</el-button>
      </div>
      <div class="image_list">
          <div class="image_item"
          v-for="item in images"
          :key="item.id">
              <img :src="item.url">
              <div class="footer" v-if="!reqParams.collect">
                  <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="toggleStatus(item)"></span>
                  <span class="el-icon-delete" @click="deleteImage(item.id)"></span>
              </div>
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
      <el-dialog
            title="添加素材"
            :visible.sync="dialogVisible"
            width="300px">
            <el-upload
                class="avatar-uploader"
                action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleSuccess"
                name='image'>
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
      </el-dialog>
  </el-card>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      total: 0,
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      dialogVisible: false,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      imageUrl: null
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    toggleList (currentcollect) {
      this.reqParams.page = 1
      this.getImages()
    },
    async toggleStatus (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      item.is_collected = data.collect
      this.$message.success(item.is_collected ? '添加收藏成功' : '取消收藏成功')
    },
    deleteImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getImages()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSuccess (res) {
      this.$message.success('上传素材成功')
      // 获取后台给的地址  给imageUrl赋值
      // res.data.url 才是地址  res叫响应主体
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    //  打开对话框
    openDialog () {
      this.dialogVisible = true
      // 其他业务  清空预览图
      this.imageUrl = null
    }
  }
}
</script>

<style scoped lang='less'>
.btn_box{
    margin-top: 10px;
}
.image_list{
    padding-top: 20px;
    .image_item{
        width:180px ;
        height: 180px;
        border: 1px dashed #ccc;
        margin: 0 30px 20px 0;
        position: relative;
        display: inline-block;
        img{
            width: 100%;
            height: 100%;
        }
        .footer{
            width: 100%;
            height: 30px;
            line-height: 30px;
            background: rgba(0, 0, 0, .3);
            position:absolute;
            left: 0;
            bottom: 0;
            text-align: center;
            color: #fff;
            span{
                margin:0 20px;
                &.red{
                    color: red;
                }
            }
        }
    }
}

</style>
