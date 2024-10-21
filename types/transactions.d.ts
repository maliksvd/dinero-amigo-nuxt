export interface Transaction {
  id: number
  user_id: string | null
  transaction_date: string
  type: string | null
  description: string | null
  category: string | null
  account: string | null
  amount: number | null
}
