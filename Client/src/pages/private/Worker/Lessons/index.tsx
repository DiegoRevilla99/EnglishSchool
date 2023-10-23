import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ImageBanner from "@/assets/images/hero/lessons.jpeg";

import { getHeaders } from "@/components/Datatable/Header";
import HeroBanner from "@/components/Template/Header/HeroBannerForTables";
import ReturnButton from "@/components/Buttons/ReturnButton";
import DataTable from "@/components/Datatable";

import {
  useDeleteLessonMutation,
  useGetAllLessonsByUnitQuery,
  useLazyGetAllLessonsByUnitQuery,
} from "@/slices/LessonSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectLesson } from "@/reducers/LessonReducer";

const Lessons = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const lessons = useAppSelector((state) => state.lessons.items);
  const unit = useAppSelector((state) => state.units.itemSelected);

  const [removeLesson, { isLoading: deleteLoading }] =
    useDeleteLessonMutation();
  const { isLoading: fetchLoading } = useGetAllLessonsByUnitQuery(unit.id);
  const [triggerRefresh, { isFetching: refetchLoading }] =
    useLazyGetAllLessonsByUnitQuery({});

  function refresh() {
    triggerRefresh(unit.id);
  }

  function createLesson() {
    navigate("/lecciones/crear");
  }

  function editLesson(event: React.MouseEvent<Element, MouseEvent>) {
    const lessonId = parseInt(event.currentTarget.id.split("#").pop() || "");
    dispatch(selectLesson(lessonId));
    navigate("/lecciones/editar");
  }

  async function deleteLesson(event: React.MouseEvent<Element, MouseEvent>) {
    const lessonId = parseInt(event.currentTarget.id.split("#").pop() || "");
    await removeLesson(lessonId);
  }

  useEffect(() => {
    refresh();
  }, [unit]);

  return (
    <div>
      <HeroBanner
        title={`${unit.name} - Lecciones`}
        image={ImageBanner}
        imagePosition="bottom"
      />
      <div className="main-cols-wrapper">
        <DataTable
          allowReturn
          data={lessons}
          title={"Lecciones"}
          refreshFn={refresh}
          createFn={createLesson}
          headers={getHeaders("Lecciones", false)}
          editFn={(value) => editLesson(value)}
          deleteFn={(value) => deleteLesson(value)}
          loading={fetchLoading || refetchLoading || deleteLoading}
        />
      </div>
    </div>
  );
};

export default Lessons;
