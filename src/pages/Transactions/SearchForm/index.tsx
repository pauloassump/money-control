import { MagnifyingGlass } from "phosphor-react"
import { useForm } from "react-hook-form"
import { SearchFormContainer } from "./styles"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from "../../../contexts/TransactionsContext"
import { memo } from 'react'

const searchFormSchema = z.object({
    query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

function SearchFormComponent() {
    const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions
    })

    const { register, handleSubmit } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    function handleSearchTransactions(data: SearchFormInputs) {
        fetchTransactions(data.query)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Busque por transações"
                {...register('query')} 
            />

            <button type="submit">
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}

export const SearchForm = memo(SearchFormComponent)