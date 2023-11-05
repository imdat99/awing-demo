import { Card, CardContent, Tooltip, Typography } from "@mui/material";
import { memo, useMemo } from "react";
import { MdCheckCircle } from "react-icons/md";
import { SubCampaign } from "../../../common/types";

interface SubCampaignCardProps {
  subCampaign: SubCampaign;
  index: number;
  handleCardSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  selected: boolean;
  isError?: boolean;
}

const SubCampaignCard: React.FC<SubCampaignCardProps> = ({
  subCampaign,
  index,
  handleCardSelect,
  selected,
  isError,
}) => {
  const adsQuantity = useMemo(
    () => subCampaign.ads.reduce((prev, curr) => curr.quantity + prev, 0),
    [subCampaign]
  );
  const hasError = useMemo(
    () =>
      !subCampaign.ads.length ||
      subCampaign.ads.some((item) => !item.name || !(item.quantity > 0)),
    [subCampaign]
  );

  // useEffect(() => {
  //   console.log("rerender ", subCampaign.name, subCampaign);
  // }, [subCampaign]);

  return (
    <Card
      data-index={index}
      onClick={handleCardSelect}
      sx={{
        minWidth: 210,
        minHeight: 120,
        border: `2px solid ${
          selected ? "rgb(33, 150, 243)" : "rgb(250, 250, 250)"
        }`,
        cursor: "pointer",
        marginLeft: "16px",
      }}
    >
      <CardContent sx={{ padding: "10px" }}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            letterSpacing: 0,
            color: isError && hasError ? "red" : "inherit",
          }}
        >
          {subCampaign.name}
          <MdCheckCircle
            fontSize={14}
            color="rgb(0, 128, 0)"
            style={{ marginLeft: 8 }}
          />
        </Typography>
        <Tooltip title="Số lượng" placement="left">
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {adsQuantity}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default memo(SubCampaignCard);
