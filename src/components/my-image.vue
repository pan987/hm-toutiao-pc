<template>
<div>
   <div @click="open" class="btn_box">
      <img :src="value || btnImage"  >
   </div>
   <el-dialog
      :visible.sync="dialogVisible"
      width="750px">
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="素材库" name="image">
                <el-radio-group v-model="reqParams.collect" size="small" @change="toggleList">
                          <el-radio-button :label="false">全部</el-radio-button>
                          <el-radio-button :label="true">收藏</el-radio-button>
                </el-radio-group>
                <div class="image_list">
                  <div class="image_item"
                      :class="{selected:item.url===selectedImageUrl}"
                      v-for="item in images"
                      :key="item.id"
                      @click="selectedImage(item.url)">
                          <img :src="item.url">
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
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
                class="avatar-uploader"
                action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleSuccess"
                name='image'>
                <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>

</div>
</template>

<script>
import local from '@/utils/local'
import defaultImage from '../assets/default.png'
export default {
  props: ['value'],
  data () {
    return {
      total: 0,
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      selectedImageUrl: null,
      uploadImageUrl: null,
      dialogVisible: false,
      activeName: 'image',
      btnImage: defaultImage
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
      this.getImages()
    },
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
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传素材成功')
    },
    confirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) {
          this.$message.warning('请选择图片')
        } else {
          // this.btnImage = this.selectedImageUrl
          this.$emit('input', this.selectedImageUrl)
          this.dialogVisible = false
        }
      } else {
        if (!this.uploadImageUrl) {
          this.$message.warning('请上传图片')
        } else {
          // this.btnImage = this.uploadImageUrl
          this.$emit('input', this.uploadImageUrl)
          this.dialogVisible = false
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
.btn_box{
        width: 150px;
        height:150px;
        border: 1px dashed #ddd;
        margin-top: 10px;
        float: left;
        margin-left: 10px;
        img{
          width: 100%;
          height: 100%;
        }
}
.image_list{
    padding-top: 20px;
    .image_item{
        width:150px ;
        height: 120px;
        border: 1px dashed #ccc;
        margin: 0 20px 20px 0;
        position: relative;
        display: inline-block;
        img{
            width: 100%;
            height: 100%;
        }
        &.selected::after{
          content: '';
          position: absolute;
          left: 0;
          top:0;
          width:100%;
          height: 100%;
          background: rgba(0,0,0,0.3) url(../assets/selected.png) no-repeat center/50px;
        }
    }
}
.dialog-footer{
  text-align: center;
  display: block;
}
</style>
