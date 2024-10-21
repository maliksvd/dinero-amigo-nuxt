<script lang="ts" setup>
  import type { Database } from '~~/types/database.types'

  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()
</script>

<template>
  <div>
    <TransactionsList />
  </div>
</template>
