import React from "react";

// signals : [{
//     id,
//     createdBy,
//     createdAt,
//     exchange,
//     currencyPair,
//     entryPrice,
//     takeProfit1Price,
//     takeProfit2Price,
//     stopLossPrice,
//     note
// }

export default class SignalForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      createdBy: "",
      createdAt: "",
      exchange: "",
      currencyPair: "",
      entryPrice: "",
      takeProfit1Price: "",
      takeProfit2Price: "",
      stopLossPrice: "",
      note: ""
    };
  }
  onCurrencyPairChange = e => {
    const currencyPair = e.target.value;
    this.setState(() => ({
      currencyPair
    }));
  };
  onExchangeChange = e => {
    const exchange = e.target.value;
    this.setState(() => ({
      exchange
    }));
  };
  onEntryPriceChange = e => {
    const entryPrice = e.target.value.replace(",", ".");
    if (entryPrice && entryPrice.match(/^\d{1,}(\.\d{0,8})?$/)) {
      this.setState(() => ({
        entryPrice
      }));
    }
  };
  onTakeProfit1PriceChange = e => {
    const takeProfit1Price = e.target.value.replace(",", ".");
    if (takeProfit1Price && takeProfit1Price.match(/^\d{1,}(\.\d{0,8})?$/)) {
      this.setState(() => ({
        takeProfit1Price
      }));
    }
  };
  onTakeProfit2PriceChange = e => {
    const takeProfit2Price = e.target.value.replace(",", ".");
    if (takeProfit2Price && takeProfit2Price.match(/^\d{1,}(\.\d{0,8})?$/)) {
      this.setState(() => ({
        takeProfit2Price
      }));
    }
  };
  onStopLossPriceChange = e => {
    const stopLossPrice = e.target.value.replace(",", ".");
    if (stopLossPrice && stopLossPrice.match(/^\d{1,}(\.\d{0,8})?$/)) {
      this.setState(() => ({
        stopLossPrice
      }));
    }
  };
  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({
      note
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const gatheredData = [
      note,
      stopLossPrice,
      takeProfit1Price,
      entryPrice,
      exchange,
      currencyPair
     ] = this.state;
     gatheredData.forEach(data => {
        if (!data){
            this.setState(() => ({error:`${data} is required`}))
        } 
     })

  };
  render() {
    return (
      <div>
        <form name="add_signal_form" className="form" onSubmit={this.onSubmit}>
          <label>
            Currency Pair:
            <input
              type="text"
              name="currencyPair"
              autoFocus
              value={this.state.currencyPair}
              onChange={this.onCurrencyPairChange}
            />
          </label>
          <label>
            Exchange:
            <input
              type="text"
              name="exchange"
              value={this.state.exchange}
              onChange={this.onExchangeChange}
            />
          </label>
          <label>
            Entry:
            <input
              type="text"
              name="entryPrice"
              value={this.state.entryPrice}
              onChange={this.onEntryPriceChange}
            />
          </label>
          <label>
            Take Profit 1:
            <input
              type="text"
              name="takeProfit1Price"
              value={this.state.takeProfit1Price}
              onChange={this.onTakeProfit1PriceChange}
            />
          </label>
          <label>
            Take Profit 2:
            <input
              type="text"
              name="takeProfit2Price"
              value={this.state.takeProfit2Price}
              onChange={this.onTakeProfit2PriceChange}
            />
          </label>
          <label>
            Stop Loss
            <input
              type="text"
              name="stopLossPrice"
              value={this.state.stopLossPrice}
              onChange={this.onStopLossPriceChange}
            />
          </label>
          <label>Additional Note:</label>
          <textarea
            type="text"
            name="note"
            value={this.state.note}
            onChange={this.onNoteChange}
          />

          <div>
            <button>ADD SIGNAL</button>
          </div>
        </form>
      </div>
    );
  }
}
