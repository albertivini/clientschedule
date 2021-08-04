import { Request, Response } from "express";
import { CreateCustomerService } from "../services/CreateCustomerService";


export class CreateCustomerController {

    async handle(req: Request, res: Response) {
        try {
            const {
                name,
                cpf,
                birthday,
                email,
                telefone
            } = req.body
    
            const createCustomerService = new CreateCustomerService()
    
            await createCustomerService.execute({
                name,
                cpf,
                birthday,
                email,
                telefone       
            })
    
            return res.status(200).json({
                success: true,
                message: "Cliente cadastrado."
            })
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: err.message
            })
        }
    }
}