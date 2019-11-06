<template>
  <el-card>
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <el-row>
      <el-col :span="12">
        <el-form label-width="120px">
          <el-form-item label="编号:">{{userInfo.id}}</el-form-item>
          <el-form-item label="手机号:">{{userInfo.mobile}}</el-form-item>
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
            <el-button type="primary" @click="saveInfo">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
         <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="savePhoto"
                name='image'>
                <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p style="text-align:center">修改头像</p>
      </el-col>
    </el-row>
  </el-card>

</template>

<script>
import local from '@/utils/local'
import EventBus from '@/EventBus'
export default {
  data () {
    return {
      userInfo: {
        name: null,
        intro: null,
        email: null,
        photo: null
      }
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    async getInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userInfo = data
    },
    async saveInfo () {
      const { name, intro, email } = this.userInfo
      await this.$http.patch('user/profile', { name, intro, email })
      // 修改session中的name
      const user = local.getUser()
      user.name = name
      local.setUser(user)
      // 修改home中头部name值
      EventBus.$emit('uploadName', name)
    },
    // {file}=results
    async savePhoto ({ file }) {
      console.log(file)
      const formData = new FormData()
      formData.append('photo', file)
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      this.$message.success('修改头像成功')
      this.userInfo.photo = data.photo
      // 修改session中的name
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
      // 修改home中头部name值
      EventBus.$emit('uploadPhoto', data.photo)
    }
  }
}
</script>

<style scoped lang='less'></style>
