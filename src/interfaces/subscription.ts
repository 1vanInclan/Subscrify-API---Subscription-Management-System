export interface Subscription {
  id: string;
  userId: string;
  planName: string;
  price: number;
  status: string;
  startDate: Date | string;
  endDate: Date | string;
  autoRenew: boolean;
  metadata: {
    paymentMethod: string;
    region: string;
  };
  isActive: boolean;
  deletedAt: Date | string | null
}
