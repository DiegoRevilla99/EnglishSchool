import("@/assets/css/timeline.css");

import dayjs from "dayjs";
import es from "dayjs/locale/es";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";

import Session from "@/models/Session";

import { useLazyGetAllSessionsByStudentQuery } from "@/slices/SessionSlice";

import NoDataCard from "@/components/Cards/NoDataCard";
import Loading from "@/components/Others/Loading";

export default function StudentTimeline() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const student = useAppSelector((state) => state.students.itemSelected);
  const [fetch, { isFetching }] = useLazyGetAllSessionsByStudentQuery();

  async function fetchSessions() {
    const data = await fetch(student.studentId).unwrap();

    if (data) {
      setSessions(data);
    }
  }

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <React.Fragment>
      {isFetching ? (
        <Loading />
      ) : (
        <React.Fragment>
          {sessions.length === 0 ? (
            <NoDataCard />
          ) : (
            <div className="timeline">
              <ul>
                {sessions.map((session) => {
                  const sessionDate = dayjs(session.sessionDate);
                  const randomColor = (((1 << 24) * Math.random()) | 0)
                    .toString(16)
                    .padStart(6, "0");

                  return (
                    <li
                      style={
                        {
                          "--accent-color": `#${randomColor}`,
                        } as React.CSSProperties
                      }
                    >
                      <div className="date">
                        {sessionDate
                          .locale(es)
                          .format("MMM D, YYYY h:mm A")
                          .toLocaleUpperCase()}
                      </div>

                      {session.lessons.length === 0 ? (
                        <React.Fragment>
                          <div className="title">Bienvenida a Mundo Lingua</div>
                          <div className="descr">
                            Sesión para determinar el nivel del alumno
                          </div>
                        </React.Fragment>
                      ) : (
                        session.lessons.map((lesson) => {
                          return (
                            <React.Fragment>
                              <div className="title">{lesson.name}</div>
                              <div className="descr">{lesson.description}</div>
                            </React.Fragment>
                          );
                        })
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
