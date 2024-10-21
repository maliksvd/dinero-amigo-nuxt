<script lang="ts" setup>
  import type { Database } from '~~/types/database.types'
  import type { Transaction } from '~~/types/transactions'

  import { format } from 'date-fns'

  const date = ref(new Date())

  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()

  // Obtenir la date actuelle
  const currentDate = new Date().toISOString().split('T')[0]

  const { data: transactions } = await useAsyncData<Transaction[]>(
    'transactions',
    async () => {
      const { data } = await client
        .from('transactions')
        .select('*')
        .eq('user_id', user.value?.id || '')
        .lt('transaction_date', currentDate) // Filtrer pour les dates antérieures à aujourd'hui
        .order('transaction_date', { ascending: true })

      // Toujours retourner un tableau, même si `data` est null
      return data ?? []
    }
  )
</script>

<template>
  <div class="mt-6">
    <div class="flex flex-col gap-4 mt-6">
      <UCard v-for="transaction in transactions" :key="transaction.id" :ui="{}">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-2">
              <div
                class="w-2 h-2 rounded-full"
                :class="
                  transaction.type === 'expense' ? 'bg-red-600' : 'bg-primary'
                "
              ></div>
            </div>
            <div class="text-sm font-semibold">
              {{ transaction.description }}
            </div>
            <p class="text-xs">
              {{ format(new Date(transaction.transaction_date), 'd MMM, yyy') }}
            </p>
          </div>
          <span class="text-sm">
            <UBadge
              :color="transaction.type === 'expense' ? 'red' : 'primary'"
              variant="subtle"
              >{{ transaction.amount + '$' }}</UBadge
            >
          </span>
        </div>
      </UCard>
    </div>
  </div>
</template>
