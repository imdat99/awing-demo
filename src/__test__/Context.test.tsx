import { render, renderHook, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {
  CampaignProvider,
  MyContext,
  useCampaignDispatch,
  useCampaignStore,
} from "../store";
import { addAds, addSubCampaign, editAds, removeAds } from "../store/action";
import { initState } from "../store/reducer";

function RenderSubCampaign() {
  return (
    <CampaignProvider>
      <MyContext.Consumer>
        {({ campaignStore }) => {
          const length = campaignStore.campaignData.subCampaigns.length;
          return (
            <div>
              {campaignStore.campaignData.subCampaigns[length - 1].name}
            </div>
          );
        }}
      </MyContext.Consumer>
    </CampaignProvider>
  );
}

describe("CampaignProvider", () => {
  it("renders children and provides context values", () => {
    render(RenderSubCampaign());
    expect(screen.getByText("Chiến dịch con 1")).toBeInTheDocument();
  });
});

function RenderSubAds() {
  return (
    <CampaignProvider>
      <MyContext.Consumer>
        {({ campaignStore }) => {
          const adsList = campaignStore.campaignData.subCampaigns[0].ads;
          return (
            <>
              {adsList.map((ads, index) => (
                <div key={index}>{`${ads.name}-${ads.quantity}`}</div>
              ))}
            </>
          );
        }}
      </MyContext.Consumer>
    </CampaignProvider>
  );
}

describe("useCampaignStore and useCampaignDispatch", () => {
  it("returns context values", () => {
    const { result } = renderHook(() => useCampaignStore(), {
      wrapper: CampaignProvider,
    });

    expect(JSON.stringify(result.current)).toEqual(JSON.stringify(initState));
  });
});

describe("SubCampaign", () => {
  it("create new SubCamaign", () => {
    const { result } = renderHook(() => useCampaignDispatch(), {
      wrapper: CampaignProvider,
    });
    expect(result.current).toBeInstanceOf(Function);
    act(() => {
      result.current(addSubCampaign(""));
    });

    render(RenderSubCampaign());

    expect(screen.getByText("Chiến dịch con 2")).toBeInTheDocument();
  });
});
describe("Ads", () => {
  it("add new, remove, update ads in SubCampaign", () => {
    const { result } = renderHook(() => useCampaignDispatch(), {
      wrapper: CampaignProvider,
    });
    act(() => {
      result.current(addAds(0));
      result.current(addAds(0));
      result.current(
        editAds({
          infoData: {
            name: "Chỉnh sửa quảng cáo xyz",
          },
          subIndex: 0,
          index: 1,
        })
      );
      result.current(removeAds({ subIndex: 0, index: 0 }));
    });
    render(RenderSubAds());
    expect(screen.getByText("Quảng cáo 3-0")).toBeInTheDocument();
    expect(screen.getByText("Chỉnh sửa quảng cáo xyz-0")).toBeInTheDocument();
    expect(screen.queryByText("Quảng cáo 1-0")).toBeNull();
  });
});
