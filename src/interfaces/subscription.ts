export interface Subscription {
  id: string;
  userId: string;
  planName: string;
  price: number;
  status: string;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  metadata: {
    paymentMethod: string;
    region: string;
  };
  isActive: boolean;
  deletedAt: Date | null
}
