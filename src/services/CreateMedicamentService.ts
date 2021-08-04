import { ICreateMedicament } from "../dto/ICreateMedicament";
import { client } from "../prisma/client";
import validator from "validator"

export class CreateMedicamentService {

    async execute({ name, appointmentId}: ICreateMedicament) {

        if (validator.isEmpty(name)) {
            throw new Error("Nome do medicamento não pode estar vazio")
        }

        const findAppointment = await client.appointment.findFirst({
            where: {
                id: appointmentId
            },
            include: {
                customer: true
            }
        })

        if (!findAppointment) {
            throw new Error("Consulta não encontrada")
        }

        const { cpf } = findAppointment.customer

        const findCustomer = await client.customer.findFirst({
            where: {
                cpf: cpf
            }
        })

        if (!findCustomer) {
            throw new Error("Cliente não foi encontrado")
        }

        const { id } = findCustomer

        await client.medicament.create({
            data: {
                name: name,
                idCustomer: id,
                idAppointment: appointmentId
            }
        })

        return

    }
}