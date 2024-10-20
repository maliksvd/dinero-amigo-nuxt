<script lang="ts" setup>
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const signOut = async () => {
    await client.auth.signOut()
    navigateTo('/')
  }
</script>

<template>
  <div v-if="user" class="flex justify-between items-center">
    <h1 class="text-xl font-bold">Dinero Amigo</h1>
    <div class="flex items-center gap-4">
      <UButton
        label="Add Transaction"
        color="black"
        @click="navigateTo('/add')"
      />
      <UButton label="Sign Out" color="black" @click="signOut" />
    </div>
  </div>
</template>
