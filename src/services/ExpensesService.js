import Api from "./Api";

export default {
  getExpenses(
    groupId
  ) {
    return Api.get(`/expense/${groupId}/`).then(res => res.data);
  },

  getBalancedList(
    groupId
  ) {
    return Api.get(`/balanced/${groupId}/`).then(res => res.data);
  },

  getRefundList(
    groupId
  ) {
    return Api.get(`/refund/${groupId}/`).then(res => res.data);
  },

  createExpense(
    name,
    expense,
    userIdPayer,
    groupId,
    isRefund,
    listUsersIds,
    dateExpense,
    userId
  ) {
    const params = {
      name: name,
      expense: expense,
      userIdPayer: userIdPayer,
      isRefund: isRefund,
      listUsersIds: listUsersIds,
      dateExpense: dateExpense,
      userId: userId
    };
    return Api.post(`/expense/${groupId}`, params).then(res => res.data);
  },

  deleteExpense(
    userId,
    expenseId,
    groupId
  ) {
    const params = {
      userId: userId
    };
    return Api.delete(`/expense/${groupId}/${expenseId}`, { data: params }).then(res => res.data);
  },

  deleteRefund(
    userId,
    refundId
  ) {
    const params = {
      userId: userId,
    };
    return Api.delete(`/refund/${refundId}`, { data: params }).then(res => res.data);
  }
};

