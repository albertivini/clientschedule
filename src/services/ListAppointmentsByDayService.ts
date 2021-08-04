import { client } from "../prisma/client"
import moment from "moment"

export class ListAppointmentsByDayService {

    async execute (date) {

        const dateFormated = moment(date).format('YYYY-MM-DD')

        const appointments = await client.appointment.findMany({
            where: {
                dateTime: {
                    contains: `${dateFormated}`
                }
            },
            include: {
                customer: true
            },
            orderBy: {
                dateTime: 'desc'
            }
        })

        if (appointments.length === 0) {
            throw new Error("Não existem consultas marcadas para este dia.")
        }

        return appointments.map(appoint => {
            return {
                customer: appoint.customer.name,
                cpf: appoint.customer.cpf,
                data: appoint.dateTime,
                retorno: appoint.return,
                telefone: appoint.customer.telefone
            }
        })
    }
}