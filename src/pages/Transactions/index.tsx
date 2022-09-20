import { useContext, useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './SearchForm'
import { PriceHighLight, TransactionsContainer, TransactionsTable } from './styled'

export function Transactions() {
    const { transactions } = useContext(TransactionsContext)

    return (
        <>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td>
                                        <PriceHighLight variant={transaction.type}>
                                            {transaction.type === 'outcome' && '- '}
                                            {priceFormatter.format(transaction.price)}
                                        </PriceHighLight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                                </tr>
                            )
                        })} 
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </>
    )
}