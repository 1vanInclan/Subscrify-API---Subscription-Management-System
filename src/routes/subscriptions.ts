import { Router, type RouterOptions } from "express";
import subscriptionsData from '../data/subscriptions.json' with {type: 'json'}

export const createSubscriptionRouter = (): Router => {

  const subscriptionRouter = Router()

  //3. **Lectura:** Listado con filtros avanzados (por plan y estatus: *active, expired, canceled*).

  subscriptionRouter.get('/', (req, res) => {
    const { plan, status } = req.query

    let filtered = [...subscriptionsData]

    if(status){
      filtered = filtered.filter(sub => sub.status === status);
    }

    if(plan){
      filtered = filtered.filter(sub => sub.planName === plan);
    }

    res.json(filtered);

  }) 

  return subscriptionRouter

}