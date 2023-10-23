import { Link } from "react-router-dom";
import { useGetAllTeachersQuery } from "@/slices/TeacherSlice";
import { useAppSelector } from "@/hooks/useRedux";

import { Breadcrumb } from "@/components/Template/Header/Breadcrumb";
import { BreadcrumbItem } from "@/components/Template/Header/BreadcrumbItem";
import { LeaderCard } from "@/components/Cards/LeaderCard";
import HeroBanner from "@/components/Template/Header/HeroBanner";

import TempImage from "@/assets/images/staff/noImage.jpeg";
import teachersHero from "@/assets/images/hero/teachers.jpg";

const StaffPage = () => {
  const { data } = useGetAllTeachersQuery({});
  const teachers = useAppSelector((state) => state.teachers.items);

  return (
    <div className="staff-page">
      <HeroBanner
        image={teachersHero}
        title="Nuestros Profesores"
        imagePosition="center 20%"
      />
      <Breadcrumb>
        <BreadcrumbItem>
          <i className="fas fa-home" aria-hidden="true"></i>{" "}
          <Link to="/index">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isActive>Profesores</BreadcrumbItem>
      </Breadcrumb>

      <div className="main-cols-wrapper">
        <div className="container">
          <div className="block staff-block">
            <div className="row">
              {teachers.map((teacher, index, array) => {
                if (array.length < 4) {
                  return (
                    <LeaderCard
                      name={`${teacher.user.firstName} ${teacher.user.lastName}`}
                      title={teacher.user.role}
                      cols={`col-6 col-md-${Math.floor(12 / array.length)}`}
                      image={TempImage}
                    />
                  );
                } else
                  return (
                    <LeaderCard
                      name={`${teacher.user.firstName} ${teacher.user.lastName}`}
                      title={teacher.user.role}
                      cols="col-6 col-md-3"
                      image={TempImage}
                    />
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
