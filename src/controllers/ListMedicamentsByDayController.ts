import { Request, Response } from "express";
import { ListMedicamentsByDayService } from "../services/ListMedicamentsByDayService";


export class ListMedicamentsByDayController {
    
    async handle(req: Request, res: Response) {

        try {
            const { data } = req.query

            const listMedicamentsByDayService = new ListMedicamentsByDayService()
    
            const medicaments = await listMedicamentsByDayService.execute(data) 
    
            return res.status(200).json({
                success: true,
                medicaments: medicaments
            })
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
    }
}