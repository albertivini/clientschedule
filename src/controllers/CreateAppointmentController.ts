import { Request, Response } from "express";
import { CreateAppointmentService } from "../services/CreateAppointmentService";


export class CreateAppointmentController {

    async handle (req: Request, res: Response) {

        try {
            const createAppointmentService = new CreateAppointmentService()

            const { date, hour, customerCpf, retorno } = req.body
    
            await createAppointmentService.execute({ date, hour, customerCpf, retorno})
    
            return res.status(200).json({
                success: true,
                message: "Consulta marcada com sucesso."
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }
 

    }
}