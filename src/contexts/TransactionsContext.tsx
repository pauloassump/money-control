import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number,
    description: string,
    type: 'income' | 'outcome',
    price: number,
    category: string,
    createdAt: string
}

interface NewTransactionCreate {
    description: string,
    price: number,
    category: string,
    type: 'income' | 'outcome'
}

interface TransactionContextType {
    transactions: Transaction[],
    fetchTransactions: (query?: string) => Promise<void>,
    createNewTransaction: (data: NewTransactionCreate) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function fetchTransactions(query?: string) {
        const response = await api.get('/transactions', {
            params: { 
                q: query
            }
        })

        setTransactions(response.data)

    }

    async function createNewTransaction(data: NewTransactionCreate) {
        const { description, price, category, type } = data

        const response = await api.post('/transactions', {
            description,
            price,
            category,
            type,
            createdAt: new Date()
        })

        setTransactions(state => [...state, response.data])
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <TransactionsContext.Provider 
            value={{ 
                transactions,
                fetchTransactions,
                createNewTransaction
             }}
        >
            {children}
        </TransactionsContext.Provider>
    )
}