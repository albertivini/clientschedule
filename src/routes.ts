import { Router, Request, Response } from "express"
import { CreateAppointmentController } from "./controllers/CreateAppointmentController"
import { CreateCustomerController } from "./controllers/CreateCustomerController"
import { CreateMedicamentController } from "./controllers/CreateMedicamentController"
import { ListAppointmentsByDayController } from "./controllers/ListAppointmentesByDayController"
import { ListCustomersController } from "./controllers/ListCustomersController"
import { ListMedicamentsByDayController } from "./controllers/ListMedicamentsByDayController"

const router = Router()

const createCustomerController = new CreateCustomerController()
const createAppointmentController = new CreateAppointmentController()
const createMedicamentController = new CreateMedicamentController()
const listMedicamentsByDayController = new ListMedicamentsByDayController()
const listCustomerController = new ListCustomersController()
const listAppointmentsByDayController = new ListAppointmentsByDayController()

router.post('/api/customer', createCustomerController.handle)
router.post('/api/appointment', createAppointmentController.handle)
router.post('/api/:appointmentId/medicament', createMedicamentController.handle)
router.get('/api/medicaments', listMedicamentsByDayController.handle)
router.get('/api/customers', listCustomerController.handle)
router.get('/api/appointments', listAppointmentsByDayController.handle)


export { router }