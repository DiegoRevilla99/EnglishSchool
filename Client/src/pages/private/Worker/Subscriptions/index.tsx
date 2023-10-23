import ImageBanner from "@/assets/images/hero/subscriptions.png";

import { getHeaders } from "@/components/Datatable/Header";
import HeroBanner from "@/components/Template/Header/HeroBannerForTables";
import DataTable from "@/components/Datatable";

import {
  useGetAllSubscriptionsQuery,
  useLazyGetAllSubscriptionsQuery,
} from "@/slices/SubscriptionSlice";
import SubFilters from "./SubFilters";

const Subscriptions = () => {
  const { data: subscriptions, isLoading: fetchLoading } =
    useGetAllSubscriptionsQuery({});
  const [triggerRefresh, { isFetching: refetchLoading }] =
    useLazyGetAllSubscriptionsQuery({});

  function refresh() {
    triggerRefresh({});
  }

  return (
    <div>
      <HeroBanner
        title="Suscripciones"
        image={ImageBanner}
        imagePosition="center 75%"
      />
      <div className="main-cols-wrapper">
        <DataTable
          data={subscriptions}
          title={"Subscriptions"}
          loading={fetchLoading || refetchLoading}
          refreshFn={refresh}
          headers={getHeaders("Suscripciones", false)}
          allowCreate={false}
          allowEdit={false}
          allowDelete={false}
          filters={<SubFilters />}
        />
      </div>
    </div>
  );
};

export default Subscriptions;
