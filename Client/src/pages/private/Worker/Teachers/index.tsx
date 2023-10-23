import { useNavigate } from "react-router-dom";

import ImageBanner from "@/assets/images/hero/teachers.jpg";

import { getHeaders } from "@/components/Datatable/Header";
import HeroBanner from "@/components/Template/Header/HeroBannerForTables";
import DataTable from "@/components/Datatable";

import {
  useDeleteTeacherMutation,
  useGetAllTeachersQuery,
  useLazyGetAllTeachersQuery,
} from "@/slices/TeacherSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectTeacher } from "@/reducers/TeacherReducer";

const Teachers = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const teachers = useAppSelector((state) => state.teachers.items);

  const [removeTeacher, { isLoading: deleteLoading }] =
    useDeleteTeacherMutation();
  const { isLoading: fetchLoading } = useGetAllTeachersQuery({});
  const [triggerRefresh, { isFetching: refetchLoading }] =
    useLazyGetAllTeachersQuery({});

  function refresh() {
    triggerRefresh({});
  }

  function createTeacher() {
    navigate("/profesores/crear");
  }

  function editTeacher(event: React.MouseEvent<Element, MouseEvent>) {
    const teacherId = event.currentTarget.id.split("#").pop() || "";
    dispatch(selectTeacher(teacherId));
    navigate("/profesores/editar");
  }

  async function deleteTeacher(event: React.MouseEvent<Element, MouseEvent>) {
    const teacherId = event.currentTarget.id.split("#").pop() || "";
    await removeTeacher(teacherId);
  }

  return (
    <div>
      <HeroBanner
        title="Profesores"
        image={ImageBanner}
        imagePosition="center 20%"
      />
      <div className="main-cols-wrapper">
        <DataTable
          data={teachers}
          title={"Profesores"}
          refreshFn={refresh}
          createFn={createTeacher}
          headers={getHeaders("Profesores", false)}
          editFn={(value) => editTeacher(value)}
          deleteFn={(value) => deleteTeacher(value)}
          loading={fetchLoading || refetchLoading || deleteLoading}
        />
      </div>
    </div>
  );
};

export default Teachers;
