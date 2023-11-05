import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MdOutlineAdd } from "react-icons/md";
import { SubCampaign } from "../../../common/types";
import { deepCompare, deepCopy } from "../../../common/utils";
import { useCampaignDispatch, useCampaignStore } from "../../../store";
import { addSubCampaign, editSubInfo } from "../../../store/action";
import SubCampaignCard from "./SubCampaignCard";
import SubCampaignTable from "./SubCampaignTable";

const SubCampaignTab = () => {
  const { campaignData, campaignStatus } = useCampaignStore();
  const { subCampaigns } = campaignData;

  const recentSubCampaigns = useRef<SubCampaign[]>();

  useEffect(() => {
    recentSubCampaigns.current = deepCopy(campaignData.subCampaigns);
    return () => {};
  }, [campaignData, campaignStatus]);

  const dispatch = useCampaignDispatch();
  const handleAddSubCampaign = () => {
    dispatch(addSubCampaign(""));
    setSelectCard(subCampaigns.length);
  };

  const [selectCard, setSelectCard] = useState(0);

  const handleCardSelect = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setSelectCard(Number(e.currentTarget.dataset.index));
    },
    []
  );

  const handleChangeSubInfo = (e: React.FormEvent<HTMLFormElement>) => {
    const el = e.target as HTMLFormElement;
    dispatch(
      editSubInfo({
        infoData: { [el.name]: el.name === "status" ? el.checked : el.value },
        index: selectCard,
      })
    );
  };

  const selectedSubCampaign = useMemo(
    () => subCampaigns[selectCard],
    [selectCard, subCampaigns]
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflow: "auto",
            paddingBottom: "10px",
          }}
        >
          <div>
            <IconButton
              onClick={handleAddSubCampaign}
              aria-label="add"
              size="large"
              color={"secondary"}
              style={{ backgroundColor: "rgb(237, 237, 237)" }}
            >
              <MdOutlineAdd fontSize="inherit" />
            </IconButton>
          </div>
          {subCampaigns.map((subCampaign, i) => {
            const reRender =
              recentSubCampaigns.current &&
              !deepCompare(
                subCampaign,
                (recentSubCampaigns.current as any[])[i]
              );
            return (
              <Fragment key={i}>
                <SubCampaignCard
                  isError={campaignStatus.hasError}
                  subCampaign={reRender ? deepCopy(subCampaign) : subCampaign}
                  index={i}
                  handleCardSelect={handleCardSelect}
                  selected={selectCard === i}
                />
              </Fragment>
            );
          })}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container component="form" onChange={handleChangeSubInfo}>
          <Grid item xs={8}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                variant="standard"
                label="Tên chiến dịch con"
                name="name"
                helperText={
                  campaignStatus.hasError &&
                  !selectedSubCampaign.name &&
                  "Dư liệu không hợp lệ"
                }
                required
                error={campaignStatus.hasError && !selectedSubCampaign.name}
                value={selectedSubCampaign.name}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormGroup>
              <FormControlLabel
                name="status"
                sx={{ marginInline: "auto" }}
                control={<Checkbox />}
                label="Đang hoạt động"
                checked={selectedSubCampaign.status}
              />
            </FormGroup>
          </Grid>
        </Grid>
        <SubCampaignTable
          isError={campaignStatus.hasError}
          rowData={selectedSubCampaign.ads}
          subCampaignIndex={selectCard}
        />
      </Grid>
    </Grid>
  );
};

export default SubCampaignTab;
