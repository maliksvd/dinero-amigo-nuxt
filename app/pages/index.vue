<script lang="ts" setup>
  const user = useSupabaseUser()
  const { auth } = useSupabaseClient()

  const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

  // if user is logged in, redirect to /find (default page)
  watchEffect(() => {
    if (user.value) {
      navigateTo('/transactions')
    }
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h2 class="my-6 text-center text-xl font-bold">Sign in to your account</h2>
    <UButton
      class="mt-3"
      icon="i-mdi-github"
      label="Github"
      color="gray"
      variant="solid"
      @click="
        auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })
      "
    />
  </div>
</template>
