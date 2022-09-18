import React, {Fragment, useState, useCallback, useEffect } from "react";
import { Grid, Segment, Label, List } from 'semantic-ui-react';
import { Accordion,AccordionSummary,AccordionDetails } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {token, url as baseUrl} from "../../../api";
import _ from "lodash";
import {toast} from "react-toastify";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bolder',
    },
}));

function VitalsCard({props}) {
    const classes = useStyles();
    const patientObj = props.patientObj ? props.patientObj : {}
    const [otherVisitsVitals, setOtherVisitVitals] = useState([]);
    const [latestVitals, setVitalSignDto]= useState({})

    ///GET LIST OF Patients
    async function getLatestVitals() {
        axios
            .get(`${baseUrl}patient/vital-sign/visit/${patientObj.visitId}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setVitalSignDto(response.data);
            })
            .catch((error) => {
            });
    }

    const loadOtherVisitsVitals = () => {
        try {
            axios.get(`${baseUrl}patient/vital-sign/person/${patientObj.id}`,
                { headers: {"Authorization" : `Bearer ${token}`}}
            ).then((response)=>{
                if(response.data.length > 0){
                    let otherVisits = _.remove(response.data,{visitId:patientObj.visitId})
                    setOtherVisitVitals(response.data);
                }
            })


        } catch (e) {
            toast.error("An error occurred while fetching vitals", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    useEffect(() => {
        loadOtherVisitsVitals();
        getLatestVitals();
    }, []);
    return (
        <Grid.Column>
            {  Object.keys(latestVitals).length > 0 &&
                <Segment>

                    <div className={classes.root}>
                        <Accordion style={{minHeight:'45px',padding:'0px 0px 0px 0px'}} defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{padding:'0px 0px 0px 2px',borderBottom:'2px solid #eee'}}
                            >
                                <Label as='a' color='blue'  style={{width:'100%'}}>
                                    <Typography className={classes.heading}>Current Vitals - Date - { moment(latestVitals.captureDate).format("DD/MM/YYYY hh:mm A")}</Typography>
                                </Label>

                            </AccordionSummary>
                            <AccordionDetails style={{padding:'8px'}}>
                                <List celled style={{width:'100%'}}>
                                    <List.Item style={{paddingBottom:'10px', paddingTop:'10px',borderTop:'1px solid #fff', marginTop:'-5px' }}>Pulse <span style={{color:'rgb(153, 46, 98)'}} className="float-end"><b>{latestVitals.pulse} bpm</b></span></List.Item>
                                    <List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Respiratory Rate <span className="float-end"><b style={{color:'rgb(153, 46, 98)'}}>{latestVitals.respiratoryRate} bpm</b></span></List.Item>
                                    <List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Temperature <span className="float-end"><b style={{color:'rgb(153, 46, 98)'}}>{latestVitals.temperature} <sup>0</sup>C</b></span></List.Item>
                                    <List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Blood Pressure <span  className="float-end"><b style={{color:'rgb(153, 46, 98)'}}>{latestVitals.systolic}/{latestVitals.diastolic}</b></span></List.Item>
                                    <List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Height <span  className="float-end"><b style={{color:'rgb(153, 46, 98)'}}>{latestVitals.height} cm</b></span></List.Item>
                                    <List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Weight <span  className="float-end"><b style={{color:'rgb(153, 46, 98)'}}>{latestVitals.bodyWeight} kg</b></span></List.Item>
                                    <List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>BMI <span  className="float-end"><b style={{color:'rgb(153, 46, 98)'}}>{latestVitals.bodyWeight} kg</b></span></List.Item>
                                </List>
                            </AccordionDetails>
                        </Accordion>

                        {otherVisitsVitals && otherVisitsVitals.length > 0 &&
                            otherVisitsVitals.map(vital =>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        style={{padding:'0px 0px 0px 10px'}}
                                    >
                                        <Typography className={classes.heading} style={{color:'#014d88'}}>Vitals Collection - Date - { moment(vital.captureDate).format("DD/MM/YYYY hh:mm A")}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails style={{padding:'8px'}}>
                                        <List celled style={{width:'100%'}}>
                                            <List.Item style={{paddingBottom:'10px', paddingTop:'10px',borderTop:'1px solid #fff', marginTop:'-5px' }}>Pulse <span  style={{color:'#014d88'}} className="float-end"><b>{vital.pulse} bpm</b></span></List.Item>
                                            <List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Respiratory Rate <span className="float-end" style={{color:'#014d88'}}><b>{vital.respiratoryRate} bpm</b></span></List.Item>
                                            <List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Temperature <span className="float-end" style={{color:'#014d88'}}><b>{vital.temperature} <sup>0</sup>C</b></span></List.Item>
                                            <List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Blood Pressure <span  className="float-end" style={{color:'#014d88'}}><b>{vital.systolic}/{vital.diastolic}</b></span></List.Item>
                                            <List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Height <span  className="float-end" style={{color:'#014d88'}}><b>{vital.height} cm</b></span></List.Item>
                                            <List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>Weight <span  className="float-end" style={{color:'#014d88'}}><b>{vital.bodyWeight} kg</b></span></List.Item>
                                            <List.Item style={{paddingBottom:'10px', paddingTop:'10px'}}>BMI <span  className="float-end" style={{color:'#014d88'}}><b>{vital.bodyWeight} kg</b></span></List.Item>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            )

                        }
                    </div>
                </Segment>
            }
        </Grid.Column>
    );
}

export default VitalsCard;