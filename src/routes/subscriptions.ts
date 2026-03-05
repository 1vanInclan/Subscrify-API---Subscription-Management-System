import { Router } from "express";
import crypto from 'crypto'
import initialSubscriptions from '../data/subscriptions.json' with {type: 'json'}
import usersData from '../data/user.json' with { type: 'json' }


import type { Subscription } from '../interfaces/subscription.js'

let subscriptionsData: Subscription[] = [...initialSubscriptions as any];

export const createSubscriptionRouter = (): Router => {

  const subscriptionRouter = Router()

  //3. **Lectura:** Listado con filtros avanzados (por plan y estatus: *active, expired, canceled*).

  subscriptionRouter.get('/', (req, res) => {
    const { plan, status } = req.query

    let filtered = [...subscriptionsData.filter( subs => subs.isActive === true )]

    console.log(filtered);

    if(status){
      filtered = filtered.filter(sub => sub.status === status);
    }

    if(plan){
      filtered = filtered.filter(sub => sub.planName === plan);
    }

    res.json(filtered);

  }) 

  // 2. **Creación:** Registro de nuevas suscripciones con cálculo automático de fecha de vencimiento.

  subscriptionRouter.post('/', (req, res) => {
    const { userId, planName, price, paymentMethod } = req.body
    
    const validateUser = usersData.find( user => user.id === userId)

    if(!validateUser) return res.json({ message: "User not found" })

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + 1);

    const newSub: Subscription = {
      id: crypto.randomUUID(),
      userId: userId,
      planName: planName,
      price: price,
      status: 'active',
      startDate: startDate,
      endDate: endDate,
      autoRenew: true,
      metadata: {
        paymentMethod,
        region: validateUser.region
      },
      isActive: true,
      deletedAt: null
    }

    subscriptionsData.push(newSub)

    res.status(201).json({ Message: 'Subscription Created', Suscription: newSub })

  })

  // **Actualización:** Renovación de planes y cambio de estado de suscripción.

  subscriptionRouter.put('/:id', (req, res) => {
    const { id } = req.params
    const { monthsToExtends, status, planName } = req.body
    
    const validateSub = subscriptionsData.findIndex( sub => sub.id === id )

    if(validateSub === -1) return res.status(404).json({ Message: 'Subscription not found' })

    const updateSub: Subscription = { ...subscriptionsData[validateSub] } as Subscription

    if( monthsToExtends && typeof monthsToExtends === 'number' ) {
      if (updateSub.endDate) {
        const currentEndDate = new Date(updateSub.endDate)

        currentEndDate.setMonth(currentEndDate.getMonth() + monthsToExtends)
        
        updateSub.endDate = currentEndDate;
      }
    }

    if (status) updateSub.status = status;
    if (planName) updateSub.planName = planName;

    subscriptionsData[validateSub] = updateSub;
    
    res.status(200).json(updateSub)


  })

  // 5. **Eliminación:** Borrado lógico (*Soft Delete*) para mantener integridad de reportes.

  subscriptionRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    
    const validateSub = subscriptionsData.findIndex(subs => subs.isActive === true && subs.id === id)

    if(validateSub === -1) return res.status(404).json({ message: "Subscription Id not found" })

    const currentDate = new Date()
    const DeleteSub: Subscription = {...subscriptionsData[validateSub]} as Subscription

    DeleteSub.deletedAt = currentDate
    DeleteSub.isActive = false

    subscriptionsData[validateSub] = DeleteSub

    res.status(200).json({Message: 'Subscription deleted c:', subscription: DeleteSub})

  })

  return subscriptionRouter

}