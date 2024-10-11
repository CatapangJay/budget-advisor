"use client"

import { useState } from "react"
import { Plus, DollarSign, CreditCard, PieChart, Settings, LogOut, Menu, ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Transaction = {
  id: number
  description: string
  amount: number
  type: "income" | "expense"
}

export function BudgetTrackerComponent() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, description: "Salary", amount: 5000, type: "income" },
    { id: 2, description: "Rent", amount: 1000, type: "expense" },
    { id: 3, description: "Groceries", amount: 200, type: "expense" },
  ])

  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>({
    description: "",
    amount: 0,
    type: "expense",
  })

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const addTransaction = () => {
    if (newTransaction.description && newTransaction.amount > 0) {
      setTransactions([
        ...transactions,
        { ...newTransaction, id: transactions.length + 1 },
      ])
      setNewTransaction({ description: "", amount: 0, type: "expense" })
    }
  }

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white p-6 ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out hidden md:flex flex-col`}>
        <div className="flex items-center justify-between mb-6">
          {isSidebarOpen ? (
            <>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-6 h-6" />
                <span className="text-xl font-bold">Budget App</span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mx-auto">
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
        <nav className="space-y-2 flex-grow">
          <Button variant="ghost" className={`w-full ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
            <LayoutDashboard className="h-4 w-4" />
            {isSidebarOpen && <span className="ml-2">Dashboard</span>}
          </Button>
          <Button variant="ghost" className={`w-full ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
            <CreditCard className="h-4 w-4" />
            {isSidebarOpen && <span className="ml-2">Transactions</span>}
          </Button>
          <Button variant="ghost" className={`w-full ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
            <PieChart className="h-4 w-4" />
            {isSidebarOpen && <span className="ml-2">Reports</span>}
          </Button>
          <Button variant="ghost" className={`w-full ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
            <Settings className="h-4 w-4" />
            {isSidebarOpen && <span className="ml-2">Settings</span>}
          </Button>
        </nav>
        <Button variant="ghost" className={`w-full ${isSidebarOpen ? 'justify-start' : 'justify-center'} text-red-500`}>
          <LogOut className="h-4 w-4" />
          {isSidebarOpen && <span className="ml-2">Logout</span>}
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Budget Overview</h1>
            <Button variant="outline" size="icon" className="md:hidden" onClick={toggleSidebar}>
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="dashboard">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              {/* Dashboard Content */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0}%
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest financial activities.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(-5).reverse().map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.type}</p>
                        </div>
                        <div className={`font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transactions">
              {/* Transactions Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Add New Transaction</CardTitle>
                  <CardDescription>Enter the details of your new transaction.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        placeholder="Enter transaction description"
                        value={newTransaction.description}
                        onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={newTransaction.amount || ""}
                        onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={newTransaction.type}
                        onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value as "income" | "expense" })}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select transaction type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button onClick={addTransaction}>Add Transaction</Button>
                </CardFooter>
              </Card>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>All Transactions</CardTitle>
                  <CardDescription>A complete list of your financial activities.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.type}</p>
                        </div>
                        <div className={`font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed bottom-4 right-4 md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Budget App</SheetTitle>
            <SheetDescription>Navigate your finances</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <CreditCard className="mr-2 h-4 w-4" /> Transactions
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <PieChart className="mr-2 h-4 w-4" /> Reports
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-red-500">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}