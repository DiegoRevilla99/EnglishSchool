import "@/assets/css/carouselPlans.css";
import "@/assets/css/priceCards.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import dayjs from "dayjs";

import { useState } from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";

import Plan from "@/models/Plan";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useGetAllActivePlansQuery } from "@/slices/PlanSlice";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { OnApproveData } from "@paypal/paypal-js/types/components/buttons";

import PayPlanButton from "@/components/Buttons/PayPlanButton";
import HeroBanner from "@/components/Template/Header/HeroBanner";
import { Breadcrumb } from "@/components/Template/Header/Breadcrumb";
import { BreadcrumbItem } from "@/components/Template/Header/BreadcrumbItem";

import { errorToast, paypalKey, successToast } from "@/utils";

import { useCreateSubscriptionMutation } from "@/slices/SubscriptionSlice";
import { addSubscription } from "@/reducers/AuthReducer";

import Banner from "@/assets/images/hero/plans.jpeg";

const CarouselPlans = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSmallScreen = useMediaQuery("(max-width:946px)");

  const [imageIndex, setImageIndex] = useState(0);

  const currentUser = useAppSelector((state) => state.auth.user);
  const activePlans = useAppSelector((state) => state.plans.items);

  const { isLoading } = useGetAllActivePlansQuery({});
  const [subscribe] = useCreateSubscriptionMutation();

  const itemsToShow = (activePlans: Plan[]) => {
    return [...activePlans, ...activePlans];
  };

  const getSlidesToShow = () => {
    const length = itemsToShow(activePlans).length;

    if (isSmallScreen) {
      return 1;
    }

    return length > 3 ? 3 : length;
  };

  async function onApproveAction(plan: Plan, approved: OnApproveData) {
    try {
      const { subscriptionID } = approved;
      if (approved) {
        const now = dayjs();
        const sub = await subscribe({
          id: -1,
          status: true,
          planId: plan.id,
          paypalId: subscriptionID ?? "",
          studentId: currentUser?.studentId ?? "",
          start: now.toDate().toISOString(),
          expiration: now.add(1, "month").toDate().toISOString(),
        }).unwrap();

        if (sub) {
          successToast("Suscripción exitosa");
          dispatch(
            addSubscription({
              sub: sub,
              studentId: currentUser?.studentId,
            })
          );
        }
      }
    } catch (e) {
      console.error("get", e);
      errorToast({
        message: "Algo salió mal al suscribirte",
        error: "Internal Server Error",
        statusCode: 500,
      });
    }
  }

  const NextArrow = ({ onClick }: any) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <ArrowForwardIcon />
      </div>
    );
  };

  const PrevArrow = ({ onClick }: any) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <ArrowBackIcon />
      </div>
    );
  };

  const settings = {
    swipe: true,
    infinite: !isSmallScreen,
    centerMode: true,
    centerPadding: "0",
    slidesToShow: getSlidesToShow(),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current: number, next: number) => setImageIndex(next),
  };

  return (
    <>
      <HeroBanner
        title={currentUser ? "Elige tu plan" : "Nuestros planes"}
        image={Banner}
        imagePosition="center"
      />

      <Breadcrumb>
        <BreadcrumbItem>
          <i className="fas fa-home" aria-hidden="true"></i>
          <Link to="/">Inicio</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isActive>Planes</BreadcrumbItem>
      </Breadcrumb>

      <PayPalScriptProvider
        options={{
          "client-id": paypalKey,
          intent: "subscription",
          vault: true,
        }}
      >
        <Box bgcolor="#f5f5f5">
          <Container maxWidth="lg">
            {isLoading ? (
              <Box
                height="450px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box py="3rem">
                <Box paddingY={4} height="auto">
                  <Slider {...settings} lazyLoad="progressive">
                    {itemsToShow(activePlans).map((plan, idx) => {
                      return (
                        <Box
                          key={idx}
                          display="flex"
                          className={`slidePlan ${
                            idx === imageIndex ? "activeSlide" : ""
                          }`}
                          onClick={() => {
                            if (
                              itemsToShow(activePlans).length <= 3 &&
                              imageIndex !== idx
                            ) {
                              setImageIndex(idx);
                            }
                          }}
                        >
                          <div id="pricing-table">
                            <div className={`plan plan${idx % 3}`}>
                              <div className="header">{plan.name}</div>
                              <div className="price">{plan.price} MXN</div>
                              <div className="monthly">por mes</div>
                              <ul>
                                <li>
                                  <b>{plan.description}</b>
                                </li>
                              </ul>
                              {currentUser ? (
                                <PayPlanButton
                                  plan={plan}
                                  onApprove={onApproveAction}
                                />
                              ) : (
                                <Button
                                  color="warning"
                                  variant="contained"
                                  disabled={imageIndex !== idx}
                                  onClick={() => {
                                    navigate("/registro");
                                  }}
                                >
                                  Registrate
                                </Button>
                              )}
                            </div>
                          </div>
                        </Box>
                      );
                    })}
                  </Slider>
                </Box>
              </Box>
            )}
          </Container>
        </Box>
      </PayPalScriptProvider>
    </>
  );
};

export default CarouselPlans;
