import React from "react"
import { colours, device } from "./../styles/master"
import styled from "styled-components"
import { makeStyles } from "@material-ui/core/styles"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import { withStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: "50px 0",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

const OrangeRadio = withStyles({
  root: {
    color: colours.secondary,
    "&$checked": {
      color: colours.secondary,
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />)

const FormContainers = styled.div`
  width: 100%;
`

const SubmitButtons = styled.input`
  height: 30px;
  width: 85px;
  padding: 6px 12px;
  margin: 12px 0 40px 0;
  color: white;
  border: 1px solid ${colours.secondary};
  border-radius: 2px;
  background-color: ${colours.secondary};
  -webkit-box-shadow: 0px 2px 6px 0px rgba(179, 179, 179, 1);
  -moz-box-shadow: 0px 2px 6px 0px rgba(179, 179, 179, 1);
  box-shadow: 0px 2px 6px 0px rgba(179, 179, 179, 1);
  :hover {
    cursor: pointer;
  }
  @media ${device.tablet} {
    height: 40px;
    width: 120px;
    font-size: 16px;
  }
`

const SearchInput = styled.input`
  height: 30px;
  width: 100%;
  padding-left: 5px;
  border-radius: 2px;
  border: 1px solid ${colours.secondary};
`

const Filters = ({
  handleOddEvenChange,
  handleOddEvenSubmit,
  oddEven,
  handleSearchSubmit,
  clearFilters,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormContainers>
            <form onSubmit={e => handleOddEvenSubmit(e)}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Odd/Even</FormLabel>
                <RadioGroup
                  aria-label="odd/even"
                  name="odd/even"
                  value={oddEven}
                  onChange={handleOddEvenChange}
                >
                  <FormControlLabel
                    value="odd"
                    control={<OrangeRadio />}
                    label="Odd"
                  />
                  <FormControlLabel
                    value="even"
                    control={<OrangeRadio />}
                    label="Even"
                  />
                </RadioGroup>
                <SubmitButtons type="submit" value="Submit" />
              </FormControl>
            </form>
            <form onSubmit={e => handleSearchSubmit(e)}>
              <SearchInput name="search" placeholder="Search Title..." />
              <SubmitButtons type="submit" value="Search" />
            </form>
            <SubmitButtons
              type="submit"
              value="Clear Filters"
              onClick={clearFilters}
            />
          </FormContainers>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Filters
