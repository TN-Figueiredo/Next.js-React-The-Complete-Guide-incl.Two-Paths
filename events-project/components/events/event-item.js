import React from "react";
import Image from "next/image";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import classes from "./event-item.module.css";

const EventItem = ({ title, image, date, location, id }) => {
  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedLocation = location.replace(", ", "\n");

  return (
    <li className={classes.item}>
      <Image src={`/${image}`} alt={title} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon></DateIcon>
            {formattedDate}
          </div>
          <div className={classes.address}>
            <AddressIcon />
            {formattedLocation}
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={classes.icon}></span>
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
