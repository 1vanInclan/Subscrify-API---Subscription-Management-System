import { Router } from "express";
import { SubscriptionController } from '../controllers/subscriptions.js'

export const createSubscriptionRouter = (): Router => {

  const subscriptionRouter = Router()

  const subscriptionController = new SubscriptionController()

  subscriptionRouter.get('/', subscriptionController.getAll)

  subscriptionRouter.post('/', subscriptionController.addSubscription)

  subscriptionRouter.put('/:id', subscriptionController.updateSubscription)

  subscriptionRouter.delete('/:id', subscriptionController.deleteSubscription)

  return subscriptionRouter

}