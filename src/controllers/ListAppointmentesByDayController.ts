import { Request, Response } from "express";
import { ListAppointmentsByDayService } from "../services/ListAppointmentsByDayService";


export class ListAppointmentsByDayController {

    async handle (req: Request, res: Response) {

        try { 
            const listAppointmentsByDayService = new ListAppointmentsByDayService()

            const { data } = req.query
    
            const appointments = await listAppointmentsByDayService.execute(data)
    
            return res.status(200).json({
                success: true,
                appointments: appointments
            })
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
    }
}