import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    "&::before": {
      content: "''",
      flex: 1,
      borderBottom: "2px solid #000000",
      marginRight: "0.25em",
      opacity: 0.7,
    },
    "&::after": {
      content: "''",
      flex: 1,
      borderBottom: "2px solid #000000",
      marginLeft: "0.25em",
      opacity: 0.7,
    },
    color: "#000000",
    opacity: 0.7,
    fontWeight: "bold",
  },
}));

export default function Seperator({ children }) {
  const cls = useStyles();
  return <div className={cls.root}>{children}</div>;
}
