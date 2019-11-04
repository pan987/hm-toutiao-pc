<template>
  <el-card>
      <div slot="header">
          <my-bread>{{$route.query.id?'编辑文章':'发布文章'}}</my-bread>
      </div>
      <el-form label-width="120px">
          <el-form-item label="标题:">
              <el-input style="width:300px" v-model="articleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容:">
               <quill-editor v-model="articleForm.content" :options="editorOption">
                </quill-editor>
          </el-form-item>
          <el-form-item label="封面:">
              <el-radio-group v-model="articleForm.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
              <div v-if="articleForm.cover.type===1">
               <my-image v-model="articleForm.cover.images[0]"></my-image>
              </div>
              <div v-if="articleForm.cover.type===3">
               <my-image v-for="i in 3" :key="i" v-model="articleForm.cover.images[i-1]"></my-image>
              </div>
          </el-form-item>
          <my-channel v-model="articleForm.channel_id"></my-channel>
          <el-form-item v-if="$route.query.id">
            <el-button type="primary" @click="upload(false)">编辑</el-button>
            <el-button @click="upload(true)">存入草稿</el-button>
          </el-form-item>
          <el-form-item v-else>
            <el-button type="primary" @click="create(false)">发表</el-button>
            <el-button @click="create(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  watch: {
    '$route.query.id': function () {
      this.toggleArticleStatus()
    }
  },
  created () {
    this.toggleArticleStatus()
  },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  methods: {
    async create (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$router.push('/article')
    },
    async getArticle (articleId) {
      const { data: { data } } = await this.$http.get(`articles/${articleId}`)
      this.articleForm = data
    },
    async upload (draft) {
      await this.$http.put(`articles?draft=${draft}`, this.articleForm)
      this.$router.push('/article')
    },
    toggleArticleStatus () {
      const articleId = this.$route.query.id
      if (articleId) {
        this.getArticle(articleId)
      } else {
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
.el-form-item{
    margin-bottom: 20px;
}

</style>
