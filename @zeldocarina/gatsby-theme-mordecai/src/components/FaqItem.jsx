import React, { useState, useContext } from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import MuiAccordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import Typography from "@material-ui/core/Typography"
//import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import { parseMarkdown } from "../helpers/helpers"
import AppContext from "../context/AppContext"

const useStyles = makeStyles(theme => {
  return {
    root: {
      width: "100%",
      position: "relative",
      boxShadow: "none !important",
      borderBottom: "1px solid var(--grey500)",
    },
    heading: {
      fontFamily: "var(--body-font)",
      fontSize: theme.typography.pxToRem(38),
      fontWeight: 500,
      color: "var(--body-color)",
      "@media only screen and (min-width: 2500px)": {
        fontSize: "3rem",
      },
    },
    text: {
      fontSize: theme.typography.pxToRem(25),
      fontWeight: 400,
      color: "var(--body-color)",
      fontFamily: "var(--body-font)",
      maxWidth: "96%",

      "& h5": {
        fontFamily: "var(--body-font)",
        textAlign: "left",
        fontSize: theme.typography.pxToRem(25),
      },

      "@media only screen and (min-width: 2500px)": {
        fontSize: "2.6rem",
        maxWidth: "98%",
      },
    },
    icon: {
      fontSize: "30px",
    },
    closeIcon: {
      fontSize: "30px",
      position: "absolute",
      top: "50%",
      right: 0,
      transform: "translateY(-50%)",
      "&:hover": {
        cursor: "pointer",
      },
      "@media (max-width: 1366px)": {
        right: 32,
      },
      "@media (max-width: 1024px)": {
        right: 35,
      },
      "@media (max-width: 768px)": {
        right: 37,
      },
    },
    accordionDetails: {
      border: "none",
      "@media (max-width: 1366px)": {
        maxWidth: "90%",
      },
      "@media (max-width: 1194px)": {
        maxWidth: "80%",
      },
      "@media (max-width: 768px)": {
        maxWidth: "85%",
      },
      "@media (max-width: 428px)": {
        maxWidth: "80%",
      },
    },
  }
})

const Accordion = withStyles({
  root: {
    padding: "2rem 2rem 2rem 0",
    backgroundColor: "transparent",
    borderBottom: "1px solid var(--grey500)",

    "&:before": {
      backgroundColor: "transparent",
    },

    "&:not(:last-child)": {
      marginBottom: "2rem",
    },

    "&.expansion-panel": {
      boxShadow: "none",
    },
  },
})(MuiAccordion)

const FaqItem = ({ question, answer, i }) => {
  const { colors } = useContext(AppContext)
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  function handleAccordionChange(e, expanded) {
    setIsAccordionOpen(expanded)
    //console.log(expanded)
  }
  function handleCloseIconClick() {
    setIsAccordionOpen(false)
  }

  const classes = useStyles(colors)
  return (
    <Accordion
      elevation={0}
      key={i}
      onChange={handleAccordionChange}
      expanded={isAccordionOpen}
      TransitionProps={{
        addEndListener: (node, done) => {
          node.addEventListener("transitionend", () => {
            done()
          })
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          isAccordionOpen ? (
            ""
          ) : (
            <AddIcon
              className={classes.icon}
              fontSize="inherit"
              htmlColor={colors.colorTertiary}
            />
          )
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          className={classes.heading}
          dangerouslySetInnerHTML={{ __html: question }}
        ></Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <div className={classes.text}>
          {parseMarkdown({ inputMarkdown: answer })}
        </div>

        {isAccordionOpen && (
          <RemoveIcon
            htmlColor={colors.colorSecondary}
            onClick={handleCloseIconClick}
            className={classes.closeIcon}
          />
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default FaqItem
