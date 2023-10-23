import Plan from "@/models/Plan";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPlanButton({
  plan,
  onApprove,
}: {
  plan: Plan;
  onApprove: Function;
}) {
  return (
    <PayPalButtons
      style={{ layout: "horizontal", tagline: false }}
      createSubscription={(data, actions) => {
        return actions.subscription.create({
          plan_id: plan.paypalId,
        });
      }}
      onApprove={async (data) => {
        onApprove(plan, data);
      }}
    />
  );
}
