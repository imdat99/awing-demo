import { TableCellProps } from "@mui/material";

export type Action<T = any> = {
  type: string;
  payload?: T;
};

export type CampaignStatus = {
  isSubmit: boolean;
  hasError: boolean;
};

export type DispatchAction<T = any> = (p: T) => Action<T>;

export type Ads = {
  name: string;
  quantity: number;
};
export type SubCampaign = {
  name: string;
  status: boolean;
  ads: Ads[];
};
export type Infomation = {
  name: string;
  describe?: string;
};
export type Campaign = {
  infomation: Infomation;
  subCampaigns: SubCampaign[];
};

export type Render<T> = (v: T, i?: number) => JSX.Element;

export interface IColumn<T = any> {
  label?: React.ReactNode;
  headProps?: TableCellProps;
  props?: TableCellProps;
  dataIndex: string;
  key: string;
  render?: Render<T>;
}
