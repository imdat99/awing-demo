import { FormControl, TextField } from "@mui/material";
import { useCampaignDispatch, useCampaignStore } from "../../store";
import { editInfo } from "../../store/action";

const InfomationTab = () => {
  const { campaignData, campaignStatus } = useCampaignStore();
  const { infomation } = campaignData;
  const dispatch = useCampaignDispatch();
  const handleChangeInfo = (e: React.FormEvent<HTMLFormElement>) => {
    const el = e.target as HTMLFormElement;
    dispatch(editInfo({ [el.name]: el.value }));
  };
  return (
    <form onChange={handleChangeInfo}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          variant="standard"
          label="Tên chiến dịch"
          helperText={
            campaignStatus.hasError &&
            !infomation.name.length &&
            "Dư liệu không hợp lệ"
          }
          name="name"
          required
          error={campaignStatus.hasError && !infomation.name.length}
          value={infomation.name}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          variant="standard"
          label="Mô tả"
          name="describe"
          value={infomation.describe}
        />
      </FormControl>
    </form>
  );
};

export default InfomationTab;
