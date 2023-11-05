import { DispatchAction } from "../common/types";

export enum ACTION_TYPES {
  ADD_SUBCAMPAIGN = "ADD_SUBCAMPAIGN",
  REMOVE_SUBCAMPAIGN = "REMOVE_SUBCAMPAIGN",
  ADD_ADS = "ADD_ADS",
  REMOVE_ADS = "REMOVE_ADS",
  EDIT_INFO = "EDIT_INFO",
  EDIT_SUB_INFO = "EDIT_SUB_INFO",
  EDIT_ADS = "EDIT_ADS",
  SET_ERROR = "SET_ERROR",
}
export const addSubCampaign: DispatchAction = () => {
  return {
    type: ACTION_TYPES.ADD_SUBCAMPAIGN,
  };
};
export const removeSubCampaign: DispatchAction<number> = (payload) => {
  return {
    type: ACTION_TYPES.REMOVE_SUBCAMPAIGN,
    payload,
  };
};
export const addAds: DispatchAction<Required<number>> = (payload) => {
  return {
    type: ACTION_TYPES.ADD_ADS,
    payload,
  };
};

export const removeAds: DispatchAction<{ subIndex: number; index: number }> = (
  payload
) => {
  return {
    type: ACTION_TYPES.REMOVE_ADS,
    payload,
  };
};

export const editInfo: DispatchAction<Record<string, string>> = (payload) => {
  return {
    type: ACTION_TYPES.EDIT_INFO,
    payload,
  };
};
export const editSubInfo: DispatchAction<{
  infoData: Record<string, string>;
  index: number;
}> = (payload) => {
  return {
    type: ACTION_TYPES.EDIT_SUB_INFO,
    payload,
  };
};
export const editAds: DispatchAction<{
  infoData: Record<string, string>;
  subIndex: number;
  index: number;
}> = (payload) => {
  return {
    type: ACTION_TYPES.EDIT_ADS,
    payload,
  };
};
export const setError: DispatchAction<boolean> = (payload) => {
  return {
    type: ACTION_TYPES.SET_ERROR,
    payload,
  };
};
