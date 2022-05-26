import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { Button } from 'semantic-ui-react';
import {Label,} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { Col, Row } from "reactstrap";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
import axios from "axios";
import { url as baseUrl } from "./../../../api";
import { token as token } from "./../../../api";

//Dtate Picker package
Moment.locale("en");
momentLocalizer();

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '20.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

function PatientCard(props) {
  const { classes } = props;
  const patientObjs = props.patientObj ? props.patientObj : {}
  const [patientObj, setpatientObj] = useState(patientObjs)
  const [modal, setModal] = useState(false);
  const [hivStatus, setHivStatus] = useState();

  useEffect(() => {
    PatientCurrentStatus()
  }, []);
    ///GET LIST OF Patients
    async function PatientCurrentStatus() {
        axios
            .get(`${baseUrl}hiv/status/patient-current/${patientObj.bioData.id}`,
            { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {

              setHivStatus(response.data);
            })
            .catch((error) => {    
            });        
    }
    const calculate_age = dob => {
      var today = new Date();
      var dateParts = dob.split("-");
      var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
      var birthDate = new Date(dateObject); // create a date object directlyfrom`dob1`argument
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                  age_now--;
              }
          if (age_now === 0) {
                  return m + " month(s)";
              }
              return age_now + " year(s)";
    };

  const CurrentStatus = ()=>{

        return (  <Label color="green" size="mini">Active</Label>);
}
const getHospitalNumber = (identifier) => {     
  const identifiers = identifier;
  const hospitalNumber = identifiers.identifier.find(obj => obj.type == 'HospitalNumber');       
  return hospitalNumber ? hospitalNumber.value : '';
};
const getPhoneNumber = (identifier) => {     
  const identifiers = identifier;
  const phoneNumber = identifiers.contactPoint.find(obj => obj.type == 'phone');       
  return phoneNumber ? phoneNumber.value : '';
};
const getAddress = (identifier) => {     
  const identifiers = identifier;
  const address = identifiers.address.find(obj => obj.city);      
  return address ? address.city : '';
};


  
  return (
    <div className={classes.root}>
       <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                
                <Row>
                    
                    <Col md={11}>
                    <Row className={"mt-1"}>
                    <Col md={12} className={classes.root2}>
                        <b style={{fontSize: "25px"}}>
                        {patientObj.bioData.firstName + " " + patientObj.bioData.surname }
                        </b>
                        
                    </Col>
                    <Col md={4} className={classes.root2}>
                    <span>
                        {" "}
                        Patient ID : <b>{getHospitalNumber(patientObj.bioData.identifier) }</b>
                    </span>
                    </Col>

                    <Col md={4} className={classes.root2}>
                    <span>
                        Date Of Birth : <b>{patientObj.bioData.dateOfBirth }</b>
                    </span>
                    </Col>
                    <Col md={4} className={classes.root2}>
                    <span>
                        {" "}
                        Age : <b>{calculate_age(moment(patientObj.bioData.dateOfBirth).format("DD-MM-YYYY"))}</b>
                    </span>
                    </Col>
                    <Col md={4}>
                    <span>
                        {" "}
                        Gender :{" "}
                        <b>{patientObj.bioData.gender.display }</b>
                    </span>
                    </Col>
                    <Col md={4} className={classes.root2}>
                    <span>
                        {" "}
                        Phone Number : <b>{getPhoneNumber(patientObj.bioData.contactPoint)}</b>
                    </span>
                    </Col>
                    <Col md={4} className={classes.root2}>
                    <span>
                        {" "}
                        Address : <b>{getAddress(patientObj.bioData.address)} </b>
                    </span>
                    </Col>

                    <Col md={12}>
                    {/* {HIVStatus(patientObj)} */}
                    <span>
                        {" "}
                        <b>Status : </b> {CurrentStatus()}
                      </span>
                    </Col>
                    </Row>
                    </Col>
                </Row>
            
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                                  
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions expandIcon={<ExpandMoreIcon />}>
                
                </ExpansionPanelActions>
            </ExpansionPanel>
   </div>
  );
}

PatientCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientCard);
