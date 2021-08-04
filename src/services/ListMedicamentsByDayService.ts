import { client } from "../prisma/client";
import moment from "moment"

export class ListMedicamentsByDayService {

    async execute(data) {

        const dateFormated = moment(data).format('YYYY-MM-DD')

        console.log(dateFormated)

        const appointments = await client.appointment.findMany({
            where: {
                dateTime: {
                    contains: `${dateFormated}`
                }
            },
            include: {
                medicament: true,
                customer: true
            }
        })

        const medicaments = await client.medicament.findMany({
            where: {
                
            },
            include: {
                appointment: true
            }
        })

        if (appointments.length === 0) {
            throw new Error("Não foram encontrados medicamentos para essa data")
        }

        let dados = []

        for (let i = 0; i < appointments.length; i++) {

            if (appointments[i].medicament !== null) {

                dados.push({
                    name: appointments[i].medicament.name,
                    appointment: appointments[i].dateTime,
                    customer: appointments[i].customer.name,
                    customerCpf: appointments[i].customer.cpf
                })
            }
        }

        return dados
    }
}