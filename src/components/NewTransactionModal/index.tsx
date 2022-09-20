import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import * as z from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../lib/axios'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
    const { createNewTransaction} = useContext(TransactionsContext)

    const { register, handleSubmit, control, reset } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })

    function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        const { description, price, category, type } = data
        createNewTransaction({ 
            description, 
            price, 
            category, 
            type
        })

        reset()
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <Dialog.Title>Nova transação</Dialog.Title>
                <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type="text" 
                        placeholder="Descrição" 
                        required
                        {...register('description')}
                    />
                    <input 
                        type="number" 
                        placeholder="Preço" 
                        required
                        {...register('price', { valueAsNumber: true })}
                    />
                    <input 
                        type="text" 
                        placeholder="Categoria" 
                        required
                        {...register('category')}
                    />

                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => {
                            console.log(field) 
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton value="income" variant="income">
                                        <ArrowCircleUp size={24} />
                                            Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton value="outcome" variant="outcome">
                                        <ArrowCircleDown size={24} />
                                            Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                     />

                    <button type="submit">
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}