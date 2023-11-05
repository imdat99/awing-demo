import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { Ads, IColumn } from "../../../common/types";
import { useCampaignDispatch } from "../../../store";
import { addAds, editAds, removeAds } from "../../../store/action";
import EnhancedTable from "../../components/Table";
import TableInput from "../../components/TableInput";

const SubCampaignTable: React.FC<{
  rowData: Ads[];
  subCampaignIndex: number;
  isError: boolean;
}> = ({ rowData, subCampaignIndex, isError }) => {
  const dispatch = useCampaignDispatch();
  const [selected, setSelected] = useState<number[]>([]);

  const handleAddAds = useCallback(() => {
    dispatch(addAds(subCampaignIndex));
  }, [dispatch, subCampaignIndex]);

  const handleRemoveItem = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const index = Number(e.currentTarget.dataset.index);
      dispatch(removeAds({ subIndex: subCampaignIndex, index }));
    },
    [dispatch, subCampaignIndex]
  );

  const handleMultiDelete = useCallback(() => {
    selected
      .sort((a, b) => b - a)
      .forEach((index) => {
        dispatch(removeAds({ subIndex: subCampaignIndex, index }));
      });
    setSelected([]);
  }, [dispatch, selected, subCampaignIndex]);

  const columns: IColumn<Ads>[] = useMemo(
    () => [
      {
        key: "name",
        dataIndex: "name",
        label: selected.length ? (
          <Tooltip title="Xoá">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={handleMultiDelete}
            >
              <MdDelete fontSize={24} />
            </IconButton>
          </Tooltip>
        ) : (
          <Typography>Tên quảng cáo*</Typography>
        ),
        headProps: selected.length ? { colSpan: 2 } : {},
        render: (v) => {
          return (
            <TableInput
              required
              defaultValue={v.name}
              name="name"
              isError={(innerValue) => isError && !innerValue.length}
              autoComplete="off"
            />
          );
        },
      },
      {
        key: "quantity",
        dataIndex: "quantity",
        label: selected.length ? undefined : <Typography>Số lượng*</Typography>,
        render: (v, i) => (
          <TableInput
            isError={(innerValue) => isError && Number(innerValue) < 1}
            type="number"
            required
            defaultValue={v.quantity}
            name="quantity"
          />
        ),
      },
      {
        key: "action",
        dataIndex: "action",
        props: {
          align: "right",
          sx: { width: "120px" },
        },
        label: (
          <Button
            variant="outlined"
            startIcon={<MdAdd />}
            onClick={handleAddAds}
          >
            Thêm
          </Button>
        ),
        render: (_, i) => {
          return (
            <Tooltip title="Xoá">
              <IconButton
                disabled={!!selected.length}
                aria-label="delete"
                size="small"
                data-index={i}
                onClick={handleRemoveItem}
              >
                <MdDelete fontSize={24} />
              </IconButton>
            </Tooltip>
          );
        },
      },
    ],
    [
      handleAddAds,
      handleMultiDelete,
      handleRemoveItem,
      isError,
      selected.length,
    ]
  );
  const handleRowChange = useCallback(
    (e: React.FormEvent<HTMLTableRowElement>) => {
      const adsIndex = Number(e.currentTarget.dataset.rowindex);
      const el = e.target as HTMLFormElement;
      if (el.name) {
        dispatch(
          editAds({
            infoData: { [el.name]: el.value },
            index: adsIndex,
            subIndex: subCampaignIndex,
          })
        );
      }
    },
    [dispatch, subCampaignIndex]
  );
  const title = useMemo(
    () => (
      <Typography
        variant="h6"
        sx={{
          textTransform: "uppercase",
          padding: "16px",
          marginTop: "16px",
          textAlign: "left",
        }}
      >
        Danh sách quảng cáo
      </Typography>
    ),
    []
  );
  return (
    <EnhancedTable<Ads>
      rows={rowData}
      selected={selected}
      setSelected={setSelected}
      columns={columns}
      onRowChange={handleRowChange}
      title={title}
    />
  );
};

export default SubCampaignTable;
