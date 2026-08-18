import api from './axios';

export const feeApi = {
  getMonthlyFees(month, year) {
    return api.get(`/fees/monthly?month=${month}&year=${year}`);
  },

  getCollection(month, year) {
    return api.get(`/fees/collection?month=${month}&year=${year}`);
  },

  getCollectionMonths() {
    return api.get('/fees/collection/months');
  },

  markPaid(id) {
    return api.patch(`/fees/${id}`, { isPaid: true });
  },

  updateFee(id, data) {
    return api.patch(`/fees/${id}`, data);
  },
};
