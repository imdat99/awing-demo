import { Box, Button, Grid } from "@mui/material";
import { validate } from "../../common/utils";
import { useCampaignDispatch, useCampaignStore } from "../../store";
import { setError } from "../../store/action";
import CustomTab, { TabPanel } from "../components/CustomTab";
import InfomationTab from "./InfomationTab";
import SubCampaignTab from "./SubCampaignTab";

const DemoPage = () => {
  const campaign = useCampaignStore();
  const dispatch = useCampaignDispatch();

  const handleSubmit = () => {
    const valid = validate(campaign.campaignData);
    if (valid) {
      console.log(campaign.campaignData);
      alert(
        "Thêm thành công chiến dịch \n".concat(
          JSON.stringify(campaign.campaignData)
        )
      );
    } else {
      alert("Vui lòng điền đúng và đầy đủ thông tin");
    }
    dispatch(setError(validate(campaign.campaignData)));
  };

  return (
    <>
      <Grid container paddingTop={"20px"}>
        <Grid item xs={12} borderBottom={"1px solid gray"}>
          <Box display="flex" padding="10px 20px" justifyContent="flex-end">
            <Button
              variant="contained"
              aria-label="Submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container padding="24px">
        <Grid item xs={12}>
          <CustomTab>
            <TabPanel label="Thông tin">
              <InfomationTab />
            </TabPanel>
            <TabPanel label="Chiến dịch con">
              <SubCampaignTab />
            </TabPanel>
          </CustomTab>
        </Grid>
      </Grid>
    </>
  );
};

export default DemoPage;
