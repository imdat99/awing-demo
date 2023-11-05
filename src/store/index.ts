import {
  createContext,
  useContext,
  useReducer,
  createElement as _c,
  Dispatch,
  FC,
  ReactNode,
} from "react";
import { Action } from "../common/types";
import { initState, reducer, RootState } from "./reducer";

export const MyContext = createContext<{
  campaignStore: RootState;
  dispatch: Dispatch<Action>;
}>({
  campaignStore: initState,
  dispatch: () => {},
});

export const CampaignProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return _c(
    MyContext.Provider,
    { value: { campaignStore: state, dispatch } },
    children
  );
};

export const useCampaignStore = () => {
  const { campaignStore } = useContext(MyContext);
  return campaignStore;
};
export const useCampaignDispatch = () => {
  const { dispatch } = useContext(MyContext);
  return dispatch;
};
