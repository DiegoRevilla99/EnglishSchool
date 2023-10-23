import ImageBanner from "@/assets/images/hero/users.jpg";

import { getHeaders } from "@/components/Datatable/Header";
import HeroBanner from "@/components/Template/Header/HeroBannerForTables";
import DataTable from "@/components/Datatable";

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
} from "@/slices/UserSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleOpenCreateModal, handleOpenEditModal } from "@/reducers/ModalReducer";
import { selectUser } from "@/reducers/UserReducer";

import CreateUser from "./CreateUser";
import EditUser from "./EditUser";

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.items);

  const [removeUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
  const { isLoading: fetchLoading } = useGetAllUsersQuery({});
  const [triggerRefresh, { isFetching: refetchLoading }] = useLazyGetAllUsersQuery({});

  function refresh() {
    triggerRefresh({});
  }

  function createUser() {
    dispatch(handleOpenCreateModal());
  }

  function editUser(event: React.MouseEvent<Element, MouseEvent>) {
    const userId = event.currentTarget.id.split("#").pop() || "";
    dispatch(selectUser(userId));
    dispatch(handleOpenEditModal());
  }

  async function deleteUser(event: React.MouseEvent<Element, MouseEvent>) {
    const userId = event.currentTarget.id.split("#").pop() || "";
    await removeUser(userId);
  }

  return (
    <div>
      <HeroBanner title="Administrativos" image={ImageBanner} imagePosition="center 35%" />
      <div className="main-cols-wrapper">
        <DataTable
          data={users}
          title={"Administrativos"}
          refreshFn={refresh}
          createFn={createUser}
          headers={getHeaders("Usuarios", false)}
          editFn={(value) => editUser(value)}
          deleteFn={(value) => deleteUser(value)}
          loading={fetchLoading || refetchLoading || deleteLoading}
        />
      </div>

      <CreateUser />
      <EditUser />
    </div>
  );
};

export default Users;
