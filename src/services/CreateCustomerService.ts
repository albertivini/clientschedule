import { ICreateCustomer } from "../dto/ICreateCustomer";
import { client } from "../prisma/client"
import dayjs from "dayjs"

export class CreateCustomerService {

    async execute({name, cpf, birthday, email, telefone}: ICreateCustomer) {

        const userAlreadyExists = await client.customer.findFirst({
            where: {
                cpf: cpf
            }
        })

        if (userAlreadyExists) {
            throw new Error("Cliente já está cadastrado")
        }

        const emailAlreadyExists = await client.customer.findFirst({
            where: {
                email: email
            }
        })

        if (emailAlreadyExists) {
            throw new Error("E-mail já está cadastrado")
        }

        const birthdayCC = dayjs(birthday).format('DD-MM-YYYY')

        const nameLowerCase = name.toLowerCase()

        await client.customer.create({
            data: {
                name: nameLowerCase,
                cpf,
                email,
                birthday: birthdayCC,
                telefone
            }
        })

        return 
    }
}