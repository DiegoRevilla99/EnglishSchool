import { useNavigate } from "react-router-dom";

import ImageBanner from "@/assets/images/hero/levels.jpg";

import { BookOutlined } from "@mui/icons-material";

import { getHeaders } from "@/components/Datatable/Header";
import NavigateButton from "@/components/Buttons/NavigateButton";
import DataTable from "@/components/Datatable";
import HeroBanner from "@/components/Template/Header/HeroBannerForTables";

import {
  useDeleteLevelMutation,
  useGetAllLevelsQuery,
  useLazyGetAllLevelsQuery,
} from "@/slices/LevelSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  handleOpenCreateModal,
  handleOpenEditModal,
} from "@/reducers/ModalReducer";
import { selectLevel } from "@/reducers/LevelReducer";

import CreateLevel from "./CreateLevel";
import EditLevel from "./EditLevel";

const Levels = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const levels = useAppSelector((state) => state.levels.items);

  const [removeLevel, { isLoading: deleteLoading }] = useDeleteLevelMutation();
  const { isLoading: fetchLoading } = useGetAllLevelsQuery({});
  const [triggerRefresh, { isFetching: refetchLoading }] =
    useLazyGetAllLevelsQuery({});

  function refresh() {
    triggerRefresh({});
  }

  function createLevel() {
    dispatch(handleOpenCreateModal());
  }

  function editLevel(event: React.MouseEvent<Element, MouseEvent>) {
    const levelId = parseInt(event.currentTarget.id.split("#").pop() || "");
    dispatch(selectLevel(levelId));
    dispatch(handleOpenEditModal());
  }

  async function deleteLevel(event: React.MouseEvent<Element, MouseEvent>) {
    const levelId = parseInt(event.currentTarget.id.split("#").pop() || "");
    await removeLevel(levelId);
  }

  function navigateToUnits(event: React.MouseEvent<Element, MouseEvent>) {
    const levelId = parseInt(event.currentTarget.id.split("#").pop() || "");
    dispatch(selectLevel(levelId));
    navigate("/unidades");
  }

  return (
    <div>
      <HeroBanner title="Niveles" image={ImageBanner} imagePosition="bottom" />
      <div className="main-cols-wrapper">
        <DataTable
          data={levels}
          title={"Niveles"}
          refreshFn={refresh}
          createFn={createLevel}
          headers={getHeaders("Niveles", false)}
          editFn={(value) => editLevel(value)}
          deleteFn={(value) => deleteLevel(value)}
          loading={fetchLoading || refetchLoading || deleteLoading}
          actions={
            <NavigateButton
              title="Contenido"
              icon={<BookOutlined />}
              navigateFn={navigateToUnits}
            />
          }
        />
      </div>

      <CreateLevel />
      <EditLevel />
    </div>
  );
};

export default Levels;
