import { useNavigate } from "react-router-dom";

import ImageBanner from "@/assets/images/hero/students.jpg";

import { getHeaders } from "@/components/Datatable/Header";
import HeroBanner from "@/components/Template/Header/HeroBannerForTables";
import DataTable from "@/components/Datatable";

import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
  useLazyGetAllStudentsQuery,
} from "@/slices/StudentSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleOpenCreateModal } from "@/reducers/ModalReducer";
import { selectStudent } from "@/reducers/StudentReducer";

import CreateStudent from "./CreateStudent";
import StudentFilters from "./StudentFilters";

const Students = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.students.items);

  const [removeStudent, { isLoading: deleteLoading }] =
    useDeleteStudentMutation();
  const { isLoading: fetchLoading } = useGetAllStudentsQuery({});
  const [triggerRefresh, { isFetching: refetchLoading }] =
    useLazyGetAllStudentsQuery({});

  function refresh() {
    triggerRefresh({});
  }

  function createStudent() {
    dispatch(handleOpenCreateModal());
  }

  function editStudent(event: React.MouseEvent<Element, MouseEvent>) {
    const studentId = event.currentTarget.id.split("#").pop() || "";
    dispatch(selectStudent(studentId));
    navigate("/estudiantes/editar");
  }

  async function deleteStudent(event: React.MouseEvent<Element, MouseEvent>) {
    const studentId = event.currentTarget.id.split("#").pop() || "";
    await removeStudent(studentId);
  }

  return (
    <div>
      <HeroBanner
        title="Estudiantes"
        image={ImageBanner}
        imagePosition="center 35%"
      />
      <div className="main-cols-wrapper">
        <DataTable
          data={students}
          title={"Estudiantes"}
          refreshFn={refresh}
          createFn={createStudent}
          headers={getHeaders("Estudiantes", false)}
          editFn={(value) => editStudent(value)}
          deleteFn={(value) => deleteStudent(value)}
          filters={<StudentFilters />}
          loading={fetchLoading || refetchLoading || deleteLoading}
        />
      </div>

      <CreateStudent />
    </div>
  );
};

export default Students;
