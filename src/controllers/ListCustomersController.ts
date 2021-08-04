import { Request, Response } from "express";
import { ListCustomerService } from "../services/ListCustomersService";


export class ListCustomersController {

    async handle (req: Request, res: Response) {
        try {
            const listCustomersService = new ListCustomerService()

            const customers = await listCustomersService.execute()
    
            return res.status(200).json({
                success: true,
                customers: customers
            })
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
    }
}