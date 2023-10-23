import ImageBanner from "@/assets/images/hero/tags.jpg";

import { getHeaders } from "@/components/Datatable/Header";
import HeroBanner from "@/components/Template/Header/HeroBannerForTables";
import DataTable from "@/components/Datatable";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectTag } from "@/reducers/TagReducer";
import {
  handleOpenCreateModal,
  handleOpenEditModal,
} from "@/reducers/ModalReducer";

import {
  useDeleteTagMutation,
  useGetAllTagsQuery,
  useLazyGetAllTagsQuery,
} from "@/slices/TagsSlice";

import CreateTag from "./CreateTag";
import EditTag from "./EditTag";

const Tags = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.items);

  const [removeTag, { isLoading: deleteLoading }] = useDeleteTagMutation();
  const { isLoading: fetchLoading } = useGetAllTagsQuery({});
  const [triggerRefresh, { isFetching: refetchLoading }] =
    useLazyGetAllTagsQuery({});

  function refresh() {
    triggerRefresh({});
  }

  function createTag() {
    dispatch(handleOpenCreateModal());
  }

  function editTag(event: React.MouseEvent<Element, MouseEvent>) {
    const tagId = parseInt(event.currentTarget.id.split("#").pop() || "");
    dispatch(selectTag(tagId));
    dispatch(handleOpenEditModal());
  }

  async function deleteTag(event: React.MouseEvent<Element, MouseEvent>) {
    const tagId = parseInt(event.currentTarget.id.split("#").pop() || "");
    await removeTag(tagId);
  }

  return (
    <div>
      <HeroBanner title="Tags" image={ImageBanner} imagePosition="center 35%" />
      <div className="main-cols-wrapper">
        <DataTable
          data={tags}
          title={"Tags"}
          refreshFn={refresh}
          createFn={createTag}
          headers={getHeaders("Tags", false)}
          editFn={(value) => editTag(value)}
          deleteFn={(value) => deleteTag(value)}
          loading={fetchLoading || refetchLoading || deleteLoading}
        />
      </div>
      <CreateTag />
      <EditTag />
    </div>
  );
};

export default Tags;
