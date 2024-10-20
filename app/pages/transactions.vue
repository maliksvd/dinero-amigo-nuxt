<script lang="ts" setup>
  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()
</script>

<template>
  <div>
    <h1>Transactions</h1>
    <TransactionList />
  </div>
</template>
