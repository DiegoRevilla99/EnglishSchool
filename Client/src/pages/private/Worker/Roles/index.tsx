import ImageBanner from "@/assets/images/hero/roles.jpg";

import { getHeaders } from "@/components/Datatable/Header";
import HeroBanner from "@/components/Template/Header/HeroBannerForTables";
import DataTable from "@/components/Datatable";

import {
  useDeleteRoleMutation,
  useGetAllRolesQuery,
  useLazyGetAllRolesQuery,
} from "@/slices/RoleSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  handleOpenCreateModal,
  handleOpenEditModal,
} from "@/reducers/ModalReducer";
import { selectRole } from "@/reducers/RoleReducer";

import CreateRole from "./CreateRole";
import EditRole from "./EditRole";

const Roles = () => {
  const dispatch = useAppDispatch();
  const roles = useAppSelector((state) => state.roles.items);

  const [removeRole, { isLoading: deleteLoading }] = useDeleteRoleMutation();
  const { isLoading: fetchLoading } = useGetAllRolesQuery({});
  const [triggerRefresh, { isFetching: refetchLoading }] =
    useLazyGetAllRolesQuery({});

  function refresh() {
    triggerRefresh({});
  }

  function createRole() {
    dispatch(handleOpenCreateModal());
  }

  function editRole(event: React.MouseEvent<Element, MouseEvent>) {
    const roleId = parseInt(event.currentTarget.id.split("#").pop() || "");
    dispatch(selectRole(roleId));
    dispatch(handleOpenEditModal());
  }

  async function deleteRole(event: React.MouseEvent<Element, MouseEvent>) {
    const roleId = parseInt(event.currentTarget.id.split("#").pop() || "");
    await removeRole(roleId);
  }

  return (
    <div>
      <HeroBanner
        title="Roles"
        image={ImageBanner}
        imagePosition="center 35%"
      />
      <div className="main-cols-wrapper">
        <DataTable
          data={roles}
          title={"Roles"}
          refreshFn={refresh}
          createFn={createRole}
          headers={getHeaders("Roles", false)}
          editFn={(value) => editRole(value)}
          deleteFn={(value) => deleteRole(value)}
          loading={fetchLoading || refetchLoading || deleteLoading}
        />
      </div>

      <CreateRole />
      <EditRole />
    </div>
  );
};

export default Roles;
