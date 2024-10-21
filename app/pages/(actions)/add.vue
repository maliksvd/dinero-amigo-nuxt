<script lang="ts" setup>
  import type { Database } from '~~/types/database.types'
  import { z } from 'zod'
  import type { FormSubmitEvent } from '#ui/types'

  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()

  const transactionSchema = z.object({
    description: z.string().min(1),
    amount: z.string().refine((value) => value.length > 0),
    transaction_date: z.string().refine((value) => value.length > 0),
    type: z.enum(['expense', 'income']),
    category: z.enum(['food', 'transport', 'entertainment']),
    account: z.enum(['credit', 'debit'])
  })

  type Schema = z.output<typeof transactionSchema>

  const state = reactive({
    description: undefined,
    transaction_date: undefined,
    amount: undefined,
    type: undefined,
    category: undefined,
    account: undefined
  })

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { data } = await client
      .from('transactions')
      .insert([
        {
          user_id: user.value?.id || '',
          transaction_date: state.transaction_date,
          description: state.description,
          amount: state.amount,
          type: state.type,
          category: state.category,
          account: state.account
        }
      ])
      .select('*')
      .single()

    navigateTo('/transactions')
  }
</script>

<template>
  <div class="mt-6">
    <UCard class="w-full max-w-md">
      <UForm
        :schema="transactionSchema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Transaction Date" name="transaction_date">
          <UInput v-model="state.transaction_date" type="date" />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
          <UInput v-model="state.description" />
        </UFormGroup>
        <UFormGroup label="Amount" name="amount">
          <UInput v-model="state.amount" />
        </UFormGroup>
        <UFormGroup label="Type" name="type" as="select">
          <USelect v-model="state.type" :options="['expense', 'income']" />
        </UFormGroup>
        <UFormGroup label="Category" name="category" as="select">
          <USelect
            v-model="state.category"
            :options="['food', 'transport', 'entertainment']"
          />
        </UFormGroup>
        <UFormGroup label="Account" name="account">
          <USelect v-model="state.account" :options="['credit', 'debit']" />
        </UFormGroup>
        <UButton label="Add" color="primary" type="submit" />
      </UForm>
    </UCard>
  </div>
</template>
