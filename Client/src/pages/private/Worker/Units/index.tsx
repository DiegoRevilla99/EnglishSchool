import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ImageBanner from "@/assets/images/hero/units.jpg";

import { AutoStories } from "@mui/icons-material";

import { getHeaders } from "@/components/Datatable/Header";
import HeroBanner from "@/components/Template/Header/HeroBannerForTables";
import DataTable from "@/components/Datatable";
import NavigateButton from "@/components/Buttons/NavigateButton";
import ReturnButton from "@/components/Buttons/ReturnButton";

import {
  useDeleteUnitMutation,
  useGetAllUnitsByLevelQuery,
  useLazyGetAllUnitsByLevelQuery,
} from "@/slices/UnitSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  handleOpenCreateModal,
  handleOpenEditModal,
} from "@/reducers/ModalReducer";
import { selectUnit } from "@/reducers/UnitReducer";

import CreateUnit from "./CreateUnit";
import EditUnit from "./EditUnit";

const Units = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const units = useAppSelector((state) => state.units.items);
  const level = useAppSelector((state) => state.levels.itemSelected);

  const [removeUnit, { isLoading: deleteLoading }] = useDeleteUnitMutation();
  const { isLoading: fetchLoading } = useGetAllUnitsByLevelQuery(level.id);
  const [triggerRefresh, { isFetching: refetchLoading }] =
    useLazyGetAllUnitsByLevelQuery({});

  function refresh() {
    triggerRefresh(level.id);
  }

  function createUnit() {
    dispatch(handleOpenCreateModal());
  }

  function editUnit(event: React.MouseEvent<Element, MouseEvent>) {
    const unitId = parseInt(event.currentTarget.id.split("#").pop() || "");
    dispatch(selectUnit(unitId));
    dispatch(handleOpenEditModal());
  }

  async function deleteUnit(event: React.MouseEvent<Element, MouseEvent>) {
    const unitId = parseInt(event.currentTarget.id.split("#").pop() || "");
    await removeUnit(unitId);
  }

  function navigateToLessons(event: React.MouseEvent<Element, MouseEvent>) {
    const unitId = parseInt(event.currentTarget.id.split("#").pop() || "");
    dispatch(selectUnit(unitId));
    navigate("/lecciones");
  }

  useEffect(() => {
    refresh();
  }, [level]);

  return (
    <div>
      <HeroBanner
        title={`Nivel ${level.name} - Unidades`}
        image={ImageBanner}
        imagePosition="bottom"
      />
      <div className="main-cols-wrapper">
        <DataTable
          allowReturn
          data={units}
          title={"Unidades"}
          refreshFn={refresh}
          createFn={createUnit}
          headers={getHeaders("Unidades", false)}
          editFn={(value) => editUnit(value)}
          deleteFn={(value) => deleteUnit(value)}
          loading={fetchLoading || refetchLoading || deleteLoading}
          actions={
            <NavigateButton
              title="Contenido"
              icon={<AutoStories />}
              navigateFn={navigateToLessons}
            />
          }
        />
      </div>

      <CreateUnit />
      <EditUnit />
    </div>
  );
};

export default Units;
