<template>
  <div class="mt-6">
    <UTabs :items="tabs">
      <template #item="{ item }">
        <div v-if="item.key === 'summary'">
          <div class="grid grid-cols-3 gap-4">
            <UCard>
              <h2 class="text-xs">Food & Drinks</h2>
              <p class="text-xl font-bold">{{ categories.get('food') }}$</p>
            </UCard>
            <UCard>
              <h2 class="text-xs">Restaurant</h2>
              <p class="text-xl font-bold">
                {{ parseFloat(categories.get('restaurant')).toFixed(2) }}$
              </p>
            </UCard>
            <UCard>
              <h2 class="text-xs">Groceries</h2>
              <p class="text-xl font-bold">
                {{ categories.get('groceries') }}$
              </p>
            </UCard>
            <UCard>
              <h2 class="text-xs">Transport</h2>
              <p class="text-xl font-bold">
                {{ categories.get('public_transport') }}$
              </p>
            </UCard>
            <UCard>
              <h2 class="text-xs">Subscription</h2>
              <p class="text-xl font-bold">
                {{ categories.get('subscription') }}$
              </p>
            </UCard>
          </div>
        </div>
        <div v-else-if="item.key === 'quarter'">
          <p>Quarter</p>
        </div>
        <div v-else-if="item.key === 'month'">
          <p>Month</p>
        </div>
      </template>
    </UTabs>
  </div>
</template>

<script lang="ts" setup>
  import type { Database } from '~~/types/database.types'
  import type { Transaction } from '~~/types/transactions'

  import { VisXYContainer, VisGroupedBar } from '@unovis/vue'

  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()

  const { data } = await useAsyncData<Transaction[]>(
    'transactions',
    async () => {
      const { data } = await client
        .from('transactions')
        .select('*')
        .eq('user_id', user.value?.id || '')
      return data ?? []
    }
  )

  const x = (d: { category: string }) => d.category
  const y = (d: { amount: number }) => d.amount

  const tabs = [
    {
      label: 'Summary',
      icon: 'i-heroicons-information-circle',
      key: 'summary'
    },
    {
      label: 'Quarter',
      icon: 'i-heroicons-arrow-down-tray',
      key: 'quarter'
    },
    {
      label: 'Month',
      icon: 'i-heroicons-information-circle',
      key: 'month'
    }
  ]

  // get all amount for each category
  const categories = computed(() => {
    const categories = new Map<string, number>()
    data.value?.forEach((transaction) => {
      if (!categories.has(transaction.category)) {
        categories.set(transaction.category, 0)
      }
      categories.set(
        transaction.category,
        categories.get(transaction.category)! + transaction.amount
      )
    })
    return categories
  })
</script>
