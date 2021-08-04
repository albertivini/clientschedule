import { client } from "../prisma/client";


export class ListCustomerService {

    async execute () {

        const customers = await client.customer.findMany()

        return customers.map(customer => {
            return {
                name: customer.name,
                cpf: customer.cpf,
                birthday: customer.birthday,
                email: customer.email,
                phone: customer.telefone
            }
        })
    }
}