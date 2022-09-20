import { MagnifyingGlass } from "phosphor-react"
import { useForm } from "react-hook-form"
import { SearchFormContainer } from "./styles"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from "react"
import { TransactionsContext } from "../../../contexts/TransactionsContext"

const searchFormSchema = z.object({
    query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
    const { fetchTransactions } = useContext(TransactionsContext)

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