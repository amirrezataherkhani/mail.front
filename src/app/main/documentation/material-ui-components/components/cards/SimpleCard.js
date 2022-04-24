import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: "2.5rem",
    color: "#202124",
    fontFamily: "sans-serif",
  },
  description: {
    fontSize: "1.4rem",
    fontWeight: "600",
    color: "#5f6368",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <div className="flex justify-center items-center min-w-256 my-10">
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Your devices
          </Typography>
          <Typography
            className={classes.description}
            variant="h5"
            component="h2"
          >
            You're currently signed in to your account on these devices:
          </Typography>

          <div className="flex flex-col ">
            <div className="mt-3">
              <h3>Windows</h3>
              <p className="mt-3">Iran</p>
              <DeleteIcon className="text-red ml-400" />
            </div>
            <div className="mt-3">
              <h3>Samsung A20 Ultra</h3>
              <p className="mt-3">USA</p>
              <DeleteIcon className="text-red ml-400" />
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small">+1 More</Button>
        </CardActions>
      </Card>
    </div>
  );
}
