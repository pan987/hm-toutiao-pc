<template>
  <el-card>
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <el-row>
      <el-col :span="12">
        <el-form label-width="120px">
          <el-form-item label="编号:">1</el-form-item>
          <el-form-item label="手机号:">13911111111</el-form-item>
          <el-form-item label="媒体名称:">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍:">
            <el-input type="textarea" v-model="userInfo.intro" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
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
            <p style="text-align:center">修改头像</p>
      </el-col>
    </el-row>
  </el-card>

</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      userInfo: {
        name: null,
        intro: null,
        email: null
      },
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      imageUrl: null
    }
  },
  methods: {
    handleSuccess (res) {
      this.$message.success('上传头像成功')
      // 获取后台给的地址  给imageUrl赋值
      // res.data.url 才是地址  res叫响应主体
      this.imageUrl = res.data.url
    }
  }
}
</script>

<style scoped lang='less'></style>
