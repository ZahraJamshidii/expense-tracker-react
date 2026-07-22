import { createSlice } from "@reduxjs/toolkit";

function saveWallets(wallets) {
  localStorage.setItem(
    "wallets",
    JSON.stringify(wallets)
  );
}

const defaultWallets = [
  {
    id: 1,
    name: "Cash",
    balance: 500,
  },
  {
    id: 2,
    name: "Bank Account",
    balance: 2500,
  },
  {
    id: 3,
    name: "Credit Card",
    balance: 1000,
  },
];

const initialState = {
  wallets:
    JSON.parse(localStorage.getItem("wallets")) ||
    defaultWallets,

    editingWallet: null,
};

const walletSlice = createSlice({
  name: "wallet",

  initialState,

reducers: {
  addWallet(state, action) {
    state.wallets.push(action.payload);
    saveWallets(state.wallets);
  },

  deleteWallet(state, action) {
    state.wallets = state.wallets.filter(
      (wallet) => wallet.id !== action.payload
    );

    saveWallets(state.wallets);
  },

  transferMoney(state, action) {
    const { fromId, toId, amount } = action.payload;

    const fromWallet = state.wallets.find(
      (wallet) => wallet.id === fromId
    );

    const toWallet = state.wallets.find(
      (wallet) => wallet.id === toId
    );

    if (!fromWallet || !toWallet) return;

    if (fromWallet.balance < amount) return;

    fromWallet.balance -= amount;
    toWallet.balance += amount;

    saveWallets(state.wallets);
  },


updateWallet(state, action) {

  const updatedWallet = action.payload;

  const wallet = state.wallets.find(
    (wallet) => wallet.id === updatedWallet.id
  );

  if (!wallet) return;

  wallet.name = updatedWallet.name;
  wallet.balance = updatedWallet.balance;

  saveWallets(state.wallets);
},


increaseBalance(state, action) {
  const { walletId, amount } = action.payload;

  const wallet = state.wallets.find(
    (wallet) => wallet.id === Number(walletId)
  );

  if (!wallet) return;

  wallet.balance += amount;

  saveWallets(state.wallets);
},

decreaseBalance(state, action) {
  const { walletId, amount } = action.payload;

  const wallet = state.wallets.find(
    (wallet) => wallet.id === Number(walletId)
  );

  if (!wallet) return;

  if (wallet.balance < amount) return;

  wallet.balance -= amount;

  saveWallets(state.wallets);
},

  setEditingWallet(state, action) {
  state.editingWallet = action.payload;
  },

  clearEditingWallet(state) {
    state.editingWallet = null;
  },

},

});

export const {
  addWallet,
  deleteWallet,
  transferMoney,
  updateWallet,
  increaseBalance,
  decreaseBalance,
  setEditingWallet,
  clearEditingWallet,
} = walletSlice.actions;

export default walletSlice.reducer;