import { _ADS_DEFAULT_NAME_, _SUBCAMPAIGN_DEFAULT_NAME_ } from "../common/text";
import { Action, Campaign, CampaignStatus, Infomation } from "../common/types";
import { ACTION_TYPES } from "./action";

export type RootState = {
  campaignStatus: CampaignStatus;
  campaignData: Campaign;
};

export const initState: RootState = {
  campaignStatus: {
    isSubmit: false,
    hasError: false,
  },
  campaignData: {
    infomation: {
      name: "",
      describe: "",
    },
    subCampaigns: [
      {
        name: [_SUBCAMPAIGN_DEFAULT_NAME_, 1].join(" "),
        status: true,
        ads: [
          {
            name: [_ADS_DEFAULT_NAME_, 1].join(" "),
            quantity: 0,
          },
        ],
      },
    ],
  },
};

export const reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_SUBCAMPAIGN: {
      state.campaignData.subCampaigns.push({
        name: [
          _SUBCAMPAIGN_DEFAULT_NAME_,
          state.campaignData.subCampaigns.length + 1,
        ].join(" "),
        status: true,
        ads: [
          {
            name: [_ADS_DEFAULT_NAME_, 1].join(" "),
            quantity: 0,
          },
        ],
      });
      return { ...state, campaignData: { ...state.campaignData } };
    }
    case ACTION_TYPES.ADD_ADS: {
      const length =
        state.campaignData.subCampaigns[action.payload as number].ads.length;
      state.campaignData.subCampaigns[action.payload as number].ads = [
        ...state.campaignData.subCampaigns[action.payload as number].ads,
        {
          name: [_ADS_DEFAULT_NAME_, length + 1].join(" "),
          quantity: 0,
        },
      ];
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          subCampaigns: state.campaignData.subCampaigns,
        },
      };
    }
    case ACTION_TYPES.REMOVE_ADS: {
      const { subIndex, index }: { subIndex: number; index: number } =
        action.payload;
      state.campaignData.subCampaigns[subIndex].ads =
        state.campaignData.subCampaigns[subIndex].ads.filter(
          (_, i) => i !== index
        );
      return { ...state };
    }
    case ACTION_TYPES.EDIT_INFO: {
      const infoData: Record<string, string> = action.payload;
      const [key, val] = Object.entries(infoData).flat();
      state.campaignData.infomation[key as keyof Infomation] = val;
      return { ...state };
    }
    case ACTION_TYPES.EDIT_SUB_INFO: {
      const {
        index,
        infoData,
      }: { index: number; infoData: Record<string, string | boolean> } =
        action.payload;
      const [key, val] = Object.entries(infoData).flat();
      if (key === "name")
        state.campaignData.subCampaigns[index].name = val as string;
      if (key === "status")
        state.campaignData.subCampaigns[index].status = val as boolean;
      return { ...state };
    }
    case ACTION_TYPES.EDIT_ADS: {
      const {
        index,
        subIndex,
        infoData,
      }: { index: number; infoData: Record<string, string>; subIndex: number } =
        action.payload;
      const [key, val] = Object.entries(
        infoData as Record<string, string>
      ).flat();

      if (key === "name")
        state.campaignData.subCampaigns[subIndex].ads[index].name = val;
      if (key === "quantity")
        state.campaignData.subCampaigns[subIndex].ads[index].quantity =
          Number(val);

      // if (key === "status") state.subCampaigns[index].status = val as boolean;
      return {
        ...state,
        campaignData: {
          ...state.campaignData,
          // subCampaigns: [...]
        },
      };
    }
    case ACTION_TYPES.SET_ERROR: {
      state.campaignStatus.hasError = !action.payload;
      return { ...state };
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
};
