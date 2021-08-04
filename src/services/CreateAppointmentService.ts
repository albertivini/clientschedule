import { ICreateAppointment } from "../dto/ICreateAppointment";
import { client } from "../prisma/client";

export class CreateAppointmentService {

    async execute({date, hour, customerCpf, retorno }: ICreateAppointment) {

        const findCustomer = await client.customer.findFirst({
            where: {
                cpf: customerCpf
            }
        })

        if (!findCustomer) {
            throw new Error("Cliente não encontrado")
        }
        
        const merge = date + " " + hour

        const dayAndHour = Date.parse(merge)
        const dateNow = Date.now()

        const difference = dayAndHour - dateNow

        if (difference <= 0) {
            throw new Error("Horário incorreto")
        }

        const dayAtDB = await client.appointment.findFirst({
            where: {
                dateTime: merge
            }
        })

        if (dayAtDB) {
            throw new Error("Já existe consulta marcada neste horário")
        }

        const { id } = findCustomer

        await client.appointment.create({
            data: {
                idCustomer: id,
                dateTime: merge,
                return: retorno
            }
        })

        return

    }
}