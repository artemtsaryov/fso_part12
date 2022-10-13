import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const NotificationStack = () => {
  const notifications = useSelector((state) => state.notifications);

  return (
    <div>
      {notifications.map((n) => (
        <div key={n.id}>
          {<Alert severity={n.isError ? "error" : "success"}>{n.text}</Alert>}
        </div>
      ))}
    </div>
  );
};

export default NotificationStack;
