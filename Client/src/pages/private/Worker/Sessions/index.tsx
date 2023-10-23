import ImageBanner from "@/assets/images/hero/sessions.jpg";

import { getHeaders } from "@/components/Datatable/Header";
import HeroBanner from "@/components/Template/Header/HeroBannerForTables";
import DataTable from "@/components/Datatable";

import {
  useDeleteSessionMutation,
  useGetAllSessionsQuery,
  useLazyGetAllSessionsQuery,
} from "@/slices/SessionSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  handleOpenCreateModal,
  handleOpenEditModal,
} from "@/reducers/ModalReducer";
import { selectSession } from "@/reducers/SessionReducer";

import CreateSession from "./CreateSession";
import EditSession from "./EditSession";

const Sessions = () => {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector((state) => state.sessions.items);

  const [removeSession, { isLoading: deleteLoading }] =
    useDeleteSessionMutation();
  const { isLoading: fetchLoading } = useGetAllSessionsQuery({});
  const [triggerRefresh, { isFetching: refetchLoading }] =
    useLazyGetAllSessionsQuery({});

  function refresh() {
    triggerRefresh({});
  }

  function createSession() {
    dispatch(handleOpenCreateModal());
  }

  function editSession(event: React.MouseEvent<Element, MouseEvent>) {
    const sessionId = parseInt(event.currentTarget.id.split("#").pop() || "");
    dispatch(selectSession(sessionId));
    dispatch(handleOpenEditModal());
  }

  async function deleteSession(event: React.MouseEvent<Element, MouseEvent>) {
    const sessionId = parseInt(event.currentTarget.id.split("#").pop() || "");
    await removeSession(sessionId);
  }

  return (
    <div>
      <HeroBanner title="Sesiones" image={ImageBanner} imagePosition="bottom" />
      <div className="main-cols-wrapper">
        <DataTable
          data={sessions}
          title={"Sesiones"}
          refreshFn={refresh}
          headers={getHeaders("Sesiones", false)}
          loading={fetchLoading || refetchLoading || deleteLoading}
          allowCreate={false}
          allowEdit={false}
          allowDelete={false}
        />
      </div>

      <CreateSession />
      <EditSession />
    </div>
  );
};

export default Sessions;
