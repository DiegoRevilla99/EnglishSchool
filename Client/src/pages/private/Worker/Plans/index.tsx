import ImageBanner from "@/assets/images/hero/plans.jpg";

import { getHeaders } from "@/components/Datatable/Header";
import HeroBanner from "@/components/Template/Header/HeroBannerForTables";
import DataTable from "@/components/Datatable";

import {
  useDeletePlanMutation,
  useGetAllPlansQuery,
  useLazyGetAllPlansQuery,
} from "@/slices/PlanSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  handleOpenCreateModal,
  handleOpenEditModal,
} from "@/reducers/ModalReducer";
import { selectPlan } from "@/reducers/PlanReducer";

import CreatePlan from "./CreatePlan";
import EditPlan from "./EditPlan";

const Plans = () => {
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state) => state.plans.items);

  const [removePlan, { isLoading: deleteLoading }] = useDeletePlanMutation();
  const { isLoading: fetchLoading } = useGetAllPlansQuery({});
  const [triggerRefresh, { isFetching: refetchLoading }] =
    useLazyGetAllPlansQuery({});

  function refresh() {
    triggerRefresh({});
  }

  function createPlan() {
    dispatch(handleOpenCreateModal());
  }

  function editPlan(event: React.MouseEvent<Element, MouseEvent>) {
    const planId = parseInt(event.currentTarget.id.split("#").pop() || "");
    dispatch(selectPlan(planId));
    dispatch(handleOpenEditModal());
  }

  async function deletePlan(event: React.MouseEvent<Element, MouseEvent>) {
    const planId = parseInt(event.currentTarget.id.split("#").pop() || "");
    await removePlan(planId);
  }

  return (
    <div>
      <HeroBanner
        title="Planes"
        image={ImageBanner}
        imagePosition="center 75%"
      />
      <div className="main-cols-wrapper">
        <DataTable
          data={plans}
          title={"Planes"}
          refreshFn={refresh}
          createFn={createPlan}
          headers={getHeaders("Planes", false)}
          editFn={(value) => editPlan(value)}
          deleteFn={(value) => deletePlan(value)}
          loading={fetchLoading || refetchLoading || deleteLoading}
        />
      </div>

      <CreatePlan />
      <EditPlan />
    </div>
  );
};

export default Plans;
