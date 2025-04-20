import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Transaction {
  id: string
  amount: number
  status: string
  paymentMethod: string | null
  createdAt: Date
}

interface ProjectTransactionsProps {
  transactions: Transaction[]
  projectId: string
}

export default function ProjectTransactions({ transactions, projectId }: ProjectTransactionsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-500"
      case "PENDING":
        return "text-yellow-500"
      case "FAILED":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>View payment history for this project</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No transactions recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Payment Method</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-3 px-4">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-medium">{formatCurrency(transaction.amount)}</td>
                    <td className="py-3 px-4">{transaction.paymentMethod || "N/A"}</td>
                    <td className="py-3 px-4">
                      <span className={getStatusColor(transaction.status)}>
                        {transaction.status.charAt(0) + transaction.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

