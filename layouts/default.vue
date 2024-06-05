<script setup>
const colorMode = useColorMode()
const { locale, setLocale, t } = useI18n()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const items = computed(() => [
  [{
    label: t('menu.profile'),
    avatar: {
      src: 'https://cdn.jsdelivr.net/gh/sukbearai/skills-graph@main/example/profile.jpeg'
    },
    click: () => navigateTo('/')
  },
  {
    label: t('menu.account'),
    icon: 'i-heroicons-wallet',
    // avatar: {
    //   src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    // },
    click: () => navigateTo('/accounts')
  }, {
    label: t('menu.logout'),
    icon: 'i-heroicons-arrow-left-end-on-rectangle-16-solid',
    // avatar: {
    //   src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    // },
    click: async () => {
      if (user) {
        const { error } = await supabase.auth.signOut()
        if (error) {
          toast.add({ title: error.message, color: 'red' })
        }
        else {
          navigateTo('/')
        }
      }
    }
  }]
])

const isLocaleEn = computed(() => locale.value === 'en')

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

function toggleLanguage() {
  setLocale(locale.value === 'en' ? 'zh-hans' : 'en')
}
</script>

<template>
  <div>
    <UContainer class="min-h-screen flex flex-col justify-center pt-4">
      <div class="mb-2 flex items-center justify-end w-full">
        <UButton
          square
          variant="ghost"
          color="black"
          :icon="$colorMode.preference === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
          @click="toggleColorMode"
        />
        <UButton
          square
          variant="ghost"
          color="black"
          icon="i-heroicons-language"
          @click="toggleLanguage"
        />
        <UDropdown
          :items="items"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            color="white"
            :label="`🤖 ${$t('toolBtn')}`"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />
        </UDropdown>
      </div>
      <NuxtPage />
      <footer class="text-center mt-2">
        <div :style="{ visibility: isLocaleEn ? 'inherit' : 'hidden' }">
          <NuxtLink
            href="https://github.com/sukbearai"
            target="_blank"
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            GitHub
          </NuxtLink>
          ·
          <NuxtLink
            href="https://twitter.com/sukbearai"
            target="_blank"
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            Twitter
          </NuxtLink>
        </div>
        <div
          class="social-media"
          :style="{ visibility: isLocaleEn ? 'hidden' : 'inherit' }"
        >
          <NuxtLink
            href="https://cdn.jsdelivr.net/gh/sukbearai/skills-graph@main/example/shipinhao.jpg"
            target="_blank"
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            视频号
          </NuxtLink>
          ·
          <NuxtLink
            href="https://cdn.jsdelivr.net/gh/sukbearai/skills-graph@main/example/xiaohongshu.jpg"
            target="_blank"
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            小红书
          </NuxtLink>
          ·
          <NuxtLink
            href="https://cdn.jsdelivr.net/gh/sukbearai/skills-graph@main/example/douyinhaojpg.jpg"
            target="_blank"
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            抖音
          </NuxtLink>
          ·
          <NuxtLink
            href="https://cdn.jsdelivr.net/gh/sukbearai/skills-graph@main/example/weixin.jpg"
            target="_blank"
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            微信
          </NuxtLink>
        </div>
        <div
          class="funding"
          :style="{ visibility: isLocaleEn ? 'hidden' : 'inherit' }"
        >
          <NuxtLink
            href="https://cdn.jsdelivr.net/gh/sukbearai/skills-graph@main/example/shoukuan01.jpg"
            target="_blank"
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            微信支付
          </NuxtLink>
          ·
          <NuxtLink
            href="https://cdn.jsdelivr.net/gh/sukbearai/skills-graph@main/example/shoukuan02.jpg"
            target="_blank"
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            支付宝
          </NuxtLink>
        </div>
      </footer>
    </UContainer>
    <UNotifications />
  </div>
</template>
