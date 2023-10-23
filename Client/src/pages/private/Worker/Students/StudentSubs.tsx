import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";

import Subscription from "@/models/Subscription";

import { Grid, Typography } from "@mui/material";

import { useLazyGetAllByStudentQuery } from "@/slices/SubscriptionSlice";

import NoDataCard from "@/components/Cards/NoDataCard";
import Loading from "@/components/Others/Loading";
import SubCard from "@/components/Cards/SubCard";

export default function StudentSubs({
  studentId,
  onlyExpired = false,
  title = "Suscripciones",
}: {
  title?: string;
  studentId: string;
  onlyExpired?: boolean;
}) {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [fetch, { isFetching }] = useLazyGetAllByStudentQuery();

  async function fetchSessions() {
    const data: Subscription[] = await fetch(studentId).unwrap();

    if (data) {
      setSubs(
        onlyExpired ? data.filter((item) => item.status === false) : data
      );
    }
  }

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <Grid container>
      {isFetching ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {subs.length === 0 ? (
              <NoDataCard maxW={320} p={0.5} />
            ) : (
              subs.map((item) => {
                return (
                  <Grid item xs={12} sm={6} lg={4}>
                    <SubCard item={item} />
                  </Grid>
                );
              })
            )}
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
}
