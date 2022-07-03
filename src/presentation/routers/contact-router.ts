import express from 'express'
import { Request, Response } from 'express'
import { CreateContactUseCase } from '../../domain/interfaces/use-cases/contact/create'
import { GetAllContactsUseCase } from '../../domain/interfaces/use-cases/contact/get-all'


const ContactsRouter = (
  getAllContactsUseCase: GetAllContactsUseCase,
  createContactUseCase: CreateContactUseCase
) => {
  const router = express.Router()

  router.get('/', async (req: Request, res: Response) => {
    try {
      const contacts = await getAllContactsUseCase.execute()
      res.send(contacts)
    } catch (err) {
      res.status(500).send({ message: 'Error fetching data' })
    }
  })

  router.post('/', async (req: Request, res: Response) => {
    try {
      await createContactUseCase.execute(req.body)
      res.statusCode 
      res.json({ message: 'Created' })
    } catch (err) {
      res.status(500).send({ message: 'Error saving data' })
    }
  })

  return router
}

export default ContactsRouter