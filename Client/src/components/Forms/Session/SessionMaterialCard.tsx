import React from "react";

import { Box, Grid } from "@mui/material";

import Lesson from "@/models/Lesson";

import { useAppSelector } from "@/hooks/useRedux";

import ArchiveFileCard from "@/components/Cards/ArchiveFileCard";

export default function SessionMaterialCard({
  lesson,
  index,
}: {
  lesson: Lesson;
  index: number;
}) {
  const currentUser = useAppSelector((state) => state.auth.user);

  const hasStudentNotes =
    lesson.studentNotes.length > 0 && lesson.studentNotes !== "N/A";
  const hasTeacherNotes =
    lesson.teacherNotes.length > 0 && lesson.teacherNotes !== "N/A";
  const hasFiles =
    lesson.studentFiles.length > 0 || lesson.teacherFiles.length > 0;
  const hasLinks =
    lesson.studentLinks.length > 0 || lesson.teacherLinks.length > 0;

  return (
    <Box display="flex" position="relative">
      <div className="paper">
        <div className="lines">
          <div className="text">
            <h3>{lesson.name}</h3>
            <strong>{lesson.description}</strong>

            <h3 style={{ marginTop: 15 }}>Anotaciones</h3>
            {currentUser?.role === "ESTUDIANTE" && hasStudentNotes && (
              <strong>{lesson.studentNotes}</strong>
            )}
            {currentUser?.role === "PROFESOR" && hasStudentNotes && (
              <strong>{lesson.teacherNotes}</strong>
            )}

            <div
              key={index}
              id={`docs-block-${index}`}
              className="block docs-block"
              style={{ paddingTop: 0, paddingBottom: 20 }}
            >
              <Grid container spacing={1}>
                {hasFiles && (
                  <React.Fragment>
                    <Grid item xs={12}>
                      <h3 style={{ marginTop: 15 }}>Archivos</h3>
                    </Grid>

                    {currentUser?.role === "ESTUDIANTE"
                      ? lesson?.studentFiles.map((item) => {
                          return <ArchiveFileCard item={item} />;
                        })
                      : lesson?.teacherFiles.map((item) => {
                          return <ArchiveFileCard item={item} />;
                        })}
                  </React.Fragment>
                )}
              </Grid>

              <Grid container spacing={1}>
                {hasLinks && (
                  <React.Fragment>
                    <Grid item xs={12}>
                      <h3 style={{ marginTop: 15 }}>Enlaces</h3>
                    </Grid>

                    {currentUser?.role === "ESTUDIANTE"
                      ? lesson?.studentLinks.map((item) => {
                          return <ArchiveFileCard item={item} />;
                        })
                      : lesson?.studentLinks.map((item) => {
                          return <ArchiveFileCard item={item} />;
                        })}
                  </React.Fragment>
                )}
              </Grid>
            </div>
          </div>
        </div>

        <div className="holes hole-top"></div>
        <div className="holes hole-middle"></div>
        <div className="holes hole-bottom"></div>
      </div>
    </Box>
  );
}
