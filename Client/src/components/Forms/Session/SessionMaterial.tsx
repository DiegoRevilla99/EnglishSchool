import("@/assets/css/sessionCard.css");

import React from "react";

import Lesson from "@/models/Lesson";

import { Box, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import SessionMaterialCard from "./SessionMaterialCard";

export default function SessionMaterial({ lessons }: { lessons: Lesson[] }) {
  const [tab, setTab] = React.useState("0");

  const getFirstLesson = () => {
    if (lessons && lessons.length > 0) {
      return lessons[0];
    }

    const introduction = new Lesson();
    introduction.description =
      "En esta sesión se determina tu nivel de inglés inicial";
    introduction.name = "Introducción";
    introduction.studentNotes = "Bienvenido a Mundo Lingua";
    introduction.teacherNotes =
      "Averigua a fondo sus gustos, conoce al estudiante";

    return introduction;
  };

  return (
    <React.Fragment>
      {lessons && lessons.length > 1 ? (
        <TabContext value={tab}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={2}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TabList
                  orientation="vertical"
                  onChange={(e, v) => setTab(v)}
                  aria-label="lessonsTabs"
                >
                  {lessons.map((_, index) => {
                    return (
                      <Tab
                        label={`Lección ${index + 1}`}
                        value={String(index)}
                      />
                    );
                  })}
                </TabList>
              </Box>
            </Grid>
            <Grid item xs={12} sm={10}>
              {lessons.map((lesson, index) => {
                return (
                  <TabPanel value={String(index)} sx={{ height: 1, width: 1 }}>
                    <SessionMaterialCard lesson={lesson} index={index} />
                  </TabPanel>
                );
              })}
            </Grid>
          </Grid>
        </TabContext>
      ) : (
        <SessionMaterialCard lesson={getFirstLesson()} index={0} />
      )}
    </React.Fragment>
  );
}
