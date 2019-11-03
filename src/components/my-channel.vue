<template>
  <el-form-item label="频道:">
        <el-select :value="value" @change="fn" placeholder="请选择" clearable>
          <el-option  v-for="item in channelOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
          ></el-option>
        </el-select>
  </el-form-item>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
    //   value: null,
      channelOptions: []
    }
  },
  methods: {
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (channelId) {
      if (channelId === '') { channelId = null }
      this.$emit('input', channelId)
    }
  },
  created () {
    this.getChannelOptions()
  }

}
</script>

<style scoped lang='less'></style>
