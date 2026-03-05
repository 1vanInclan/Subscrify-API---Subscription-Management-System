import subscriptionsData from "../../data/subscriptions.json" with { type: "json" };
import usersData from "../../data/user.json" with { type: "json" };

import type { Subscription } from "../../interfaces/subscription.js";
import type { User } from "../../interfaces/user.js";

import crypto from "crypto";

const subscriptions: Subscription[] = subscriptionsData
const users: User[] = usersData

export class SubscriptionModel {

  // **Lectura:** Listado con filtros avanzados (por plan y estatus: *active, expired, canceled*).

  async getAll(status: string, plan: string) {
    let filtered = [
      ...subscriptions.filter((subs) => subs.isActive === true),
    ];

    if (status) {
      filtered = filtered.filter((sub) => sub.status === status);
    }

    if (plan) {
      filtered = filtered.filter((sub) => sub.planName === plan);
    }

    return filtered;
  }

  // **Creación:** Registro de nuevas suscripciones con cálculo automático de fecha de vencimiento.

  async addSubscription(
    userId: string,
    planName: string,
    price: number,
    paymentMethod: string,
  ) {
    const validateUser = users.find((user) => user.id === userId);

    if (!validateUser) throw new Error("User not found");

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + 1);

    const newSub: Subscription = {
      id: crypto.randomUUID(),
      userId: userId,
      planName: planName,
      price: price,
      status: "active",
      startDate: startDate,
      endDate: endDate,
      autoRenew: true,
      metadata: {
        paymentMethod,
        region: validateUser.region,
      },
      isActive: true,
      deletedAt: null,
    };

    subscriptions.push(newSub);
    return { message: "Subscription Created", Suscription: newSub };
  }

  // **Actualización:** Renovación de planes y cambio de estado de suscripción.
  async updateSubscription(
    id: string,
    monthsToExtends: number,
    status: string,
    planName: string,
  ) {
      const validateSub = subscriptionsData.findIndex((sub) => sub.id === id);

      if (validateSub === -1)
        throw new Error("Subscription not found");

      const updateSub: Subscription = {
        ...subscriptionsData[validateSub],
      } as Subscription;

      if (monthsToExtends && typeof monthsToExtends === "number") {
        if (updateSub.endDate) {
          const currentEndDate = new Date(updateSub.endDate);

          currentEndDate.setMonth(currentEndDate.getMonth() + monthsToExtends);

          updateSub.endDate = currentEndDate;
        }
      }

      if (status) updateSub.status = status;
      if (planName) updateSub.planName = planName;

      subscriptions[validateSub] = updateSub;
      return subscriptions[validateSub]
  }

  // **Eliminación:** Borrado lógico (*Soft Delete*) para mantener integridad de reportes.

  async deleteSubscription(id: string) {

    const validateSub = subscriptions.findIndex(subs => subs.isActive === true && subs.id === id)

    if(validateSub === -1) throw new Error("Subscription Id not found")

    const currentDate = new Date()
    const DeleteSub: Subscription = {...subscriptions[validateSub]} as Subscription

    DeleteSub.deletedAt = currentDate
    DeleteSub.isActive = false

    subscriptions[validateSub] = DeleteSub

    return {Message: 'Subscription deleted c:', subscription: DeleteSub}
  }
}
