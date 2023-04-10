<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { NSpin } from 'naive-ui'
import { fetchChatConfig } from '@/api'
import pkg from '@/../package.json'

interface ConfigState {
  timeoutMs?: number
  reverseProxy?: string
  apiModel?: string
  socksProxy?: string
  httpsProxy?: string
  balance?: string
}

// const authStore = useAuthStore()

const loading = ref(false)

const config = ref<ConfigState>()

// const isChatGPTAPI = computed<boolean>(() => !!authStore.isChatGPTAPI)

async function fetchConfig() {
  try {
    loading.value = true
    const { data } = await fetchChatConfig<ConfigState>()
    config.value = data
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchConfig()
})
</script>>

<script lang='ts'>
export default {
  data() {
    // 使用对象解构和简化属性名
    return {
      Key: window.localStorage.apiKey,
      inputValue: window.localStorage.apiKey,
    }
  },
  methods: {
    updateKey() {
      localStorage.apiKey = this.inputValue
      this.Key = this.inputValue
    },
  },
}
</script>

<template>
  <NSpin :show="loading">
    <div class="p-4 space-y-4" @keyup.enter="updateKey">
      <h2 class="text-xl font-bold">
        Version - {{ pkg.version }}
      </h2>
      <!-- 需要在Input框后面加上一个按钮，当我点击按钮或者敲回车之后，上述的P标签内显示内容
      同时，console.log一个"尊敬的用户 您的余额为xxx条/元/字数，祝您玩得开心"/"尊敬的用户，您的余额为0，请联系管理员充值"
      -->
      <div class="p-2 space-y-2 rounded-md bg-neutral-100 dark:bg-neutral-700">
        <input v-model="inputValue" placeholder="请输入您的密钥" class="input-box w-60" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc;">
        <button class="submit-btn w-13 h-11" style="margin-left: 10px; background-color: #fff; color: #ccc; border: 1px solid #ccc; border-radius: 5px; padding: 10px;" @click="updateKey">
          提交
        </button>
      </div>
      <div>
        <p>{{ $t("setting.api") }}：{{ Key }}</p>
        <!-- <p v-if="isChatGPTAPI">
          {{ $t("setting.balance") }}：{{ config?.balance ?? '-' }}
        </p> -->
      </div>
      <!-- <p v-if="!isChatGPTAPI">
        {{ $t("setting.reverseProxy") }}：{{ config?.reverseProxy ?? '-' }}
      </p>
      <p>{{ $t("setting.timeout") }}：{{ config?.timeoutMs ?? '-' }}</p>
      <p>{{ $t("setting.socks") }}：{{ config?.socksProxy ?? '-' }}</p>
      <p>{{ $t("setting.httpsProxy") }}：{{ config?.httpsProxy ?? '-' }}</p> -->
    </div>
  </NSpin>
</template>
