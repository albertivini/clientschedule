import { Request, Response } from "express";
import { CreateMedicamentService } from "../services/CreateMedicamentService";


export class CreateMedicamentController {

    async handle (req: Request, res: Response) {
        try {
            const createMedicamentService = new CreateMedicamentService()

            const { appointmentId } = req.params
            const { name } = req.body
    
            await createMedicamentService.execute({ name, appointmentId })
    
            return res.status(200).json({
                success: true,
                message: "Medicamento adicionado com sucesso"
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
}