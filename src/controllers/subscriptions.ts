import { SubscriptionModel } from "../models/local-file-system/subscription.js"
import type { Request, Response } from "express"

export class SubscriptionController {

  private subscriptionModel: SubscriptionModel

  constructor () {
    this.subscriptionModel = new SubscriptionModel()
  }

  getAll = async (req: Request, res: Response) => {
    const { plan, status } = req.query

    try {
      const result = await this.subscriptionModel.getAll(plan as string, status as string)
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ Message: 'Ocurrio un error' })
    }
  }

  addSubscription = async (req: Request, res: Response) => {
    const { userId, planName, price, paymentMethod } = req.body

    try {
      const result = await this.subscriptionModel.addSubscription( userId, planName, price, paymentMethod)
      res.status(201).json(result)
    } catch (e: any) {
      res.status(404).json({Error: e.message})
    }
  }

  updateSubscription = async (req: Request, res: Response) => {
    const { id } = req.params
    const { monthsToExtends, status, planName } = req.body

    try {
      const result = await this.subscriptionModel.updateSubscription(id as string, monthsToExtends, status, planName)
      res.status(200).json(result) 
    } catch (e: any){
      res.status(404).json({Error: e.message})
    }
  }

  deleteSubscription = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const result = await this.subscriptionModel.deleteSubscription(id as string)
      res.status(200).json(result)
    } catch (e: any) {
      res.status(404).json({Error: e.message})
    }
  }



}