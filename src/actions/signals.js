import moment from "moment";

//ADD SIGNAL
export const addSignal = (signal = {}) => ({
  type: "ADD_SIGNAL",
  signal
});

export const startAddSignal = (signalData = {}) => {
  return (dispatch, getState) => {
    const {
      createdBy = getState().auth.uid,
      createdAt = moment(now),
      exchange = "",
      currencyPair = "",
      entryPrice = 0,
      takeProfit1Price = 0,
      takeProfit2Price = 0,
      stopLossPrice = 0,
      note = ""
    } = signalData;
    const signal = {
      createdBy,
      exchange,
      currencyPair,
      entryPrice,
      takeProfit1Price,
      takeProfit2Price,
      stopLossPrice,
      note,
      createdAt
    };

    return database
      .ref(`signals`)
      .push(signal)
      .then(ref => {
        dispatch(
          addSignal({
            id: ref.key,
            ...signal
          })
        );
      });
  };
};

//REMOVE SIGNAL
export const removeSignal = ({ id, uid } = {}) => ({
  type: "REMOVE_SIGNAL",
  id,
  uid
});

export const startRemoveSignal = (id = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/signals/${id}`)
      .remove()
      .then(() => {
        dispatch(removeSignal({ id }));
      });
  };
};

//EDIT SIGNAL
export const editSignal = (id, updates) => ({
  type: "EDIT_SIGNAL",
  id,
  updates
});

export const startEditSignal = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/signal/${id}`)
      .update({
        ...updates
      })
      .then(() => {
        dispatch(editSignal(id, updates));
      });
  };
};

// SET_SIGNALS

export const setSignals = signals => ({
  type: "SET_SIGNALS",
  signals
});

export const startSetSignals = () => {
  const signals = [];
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/signals`)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(signal => {
          signals.push({
            id: signal.key,
            ...signal.val()
          });
        });
        dispatch(setSignals(signal));
      });
  };
};
