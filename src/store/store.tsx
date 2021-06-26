import React, { createContext, useEffect, useReducer } from "react";
import { ReducerState } from "react";

export interface Item {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Cart {
  items: Item[];
}

export interface UserState {
  cart: Cart;
}

const initialState: UserState = {
  cart: {
    items: [
    ],
  },
};

export enum ActionType {
  AddItem = "ADD_ITEM",
  LoadState = "LOAD_STATE",
  SaveState = "SAVE_STATE",
  DeleteItem = "DELETE_ITEM",
  DeleteAll = "DELETE_ALL"
}

interface Action {
  type: ActionType;
  payload?: any;
}

export const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<Action>;
}>({
  state: {
    cart: {
      items: [],
    },
  },
  dispatch: () => null,
});

const userReducer = (state: UserState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.DeleteAll:
      console.log("Deleting All");
      return {
        cart: {
          items: []
        }
      }
    case ActionType.AddItem:
      console.log("Payload", payload);
      return {
        cart: {
          items: [
            ...state.cart.items,
            {
              productId: payload.id,
              quantity: 1,
              name: payload.name,
              price: payload.price
            },
          ],
        },
      };
    case ActionType.LoadState:
      console.log("Loading State");
      const newstate: UserState = JSON.parse(
        localStorage.getItem("user") || ""
      ) || { cart: { items: [] } };
      return newstate;

    case ActionType.DeleteItem:
      console.log("Deleting Item: ", payload)
      const currentState: UserState = JSON.parse(
          localStorage.getItem("user") || ""
      ) || { cart: { items: [] } };

          return {
            ...currentState,
            cart: {
              items:[
              ...currentState.cart.items.filter(i => i.productId !== payload)
              ]
            }
          };

    default:
      return state;
  }
};

export const UserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    console.log("Super new state: ", state);
    localStorage.setItem("user", JSON.stringify(state));
  }, [state]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
