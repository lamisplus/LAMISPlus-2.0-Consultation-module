import React, {Fragment, useState, useCallback, useEffect } from "react";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { useForm, Controller } from "react-hook-form";
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios";
import { toast } from 'react-toastify';
import {token, url as baseUrl, apiUrl as apiUrl } from "../../../api";
import { Grid, Segment, Label, Icon, List,Button, Card, Feed, Input, Radio } from 'semantic-ui-react';
// Page titie
import {  Checkbox, Table } from 'semantic-ui-react';
import {format} from "date-fns";
import { Link, useHistory } from 'react-router-dom';
import ButtonMui from "@material-ui/core/Button";
import AddPharmacyOrder from './AddPharmacyOrder';
import EditPharmacyOrder from './EditPharmacyOrder';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bolder',
    },
}));

const Widget = (props) => {
    const classes = useStyles();
    const patientObj = props.patientObj ? props.patientObj : {}
    //console.log("po", patientObj)
    const [isLabEnabled, setIsLabEnabled] = useState(false);
    const [isPharmacyEnabled, setIsPharmacyEnabled] = useState(false);
    const [hasAllergies, setHasAllergies] = useState(false);
    const [pharmacyModal, setPharmacyModal] = useState(false);
    const [pharmacyOrderModal, setPharmacyOrderModal] = useState(false);
    const [otherVisitsVitals, setOtherVisitVitals] = useState([]);
    const [previousConsultation, setPreviousConsultation] = useState([]);
    const [encounterDate, setEncounterDate] = useState(new Date());
    const { handleSubmit, control, getValues, setError, setValue } = useForm();
    const [inputFields, setInputFields] = useState([
        { complaint: '', onsetDate: '', severity: 0, dateResolved: '' }
    ]);
    const [inputFieldsDiagnosis, setInputFieldsDiagnosis] = useState([
        { certainty: '', diagnosis: '', diagnosisOrder: 0 }
    ]);

    const [inputFieldsLab, setInputFieldsLab] = useState([
            { encounterDate: format(new Date(), 'yyyy-MM-dd'), labOrder: '',
            labTest: '', priority: '', status: '' }
        ]);

    const history = useHistory();
    const toggle = () => setPharmacyModal(!pharmacyModal);
    const toggleOrder = () => setPharmacyOrderModal(!pharmacyOrderModal);
    const [pharmacyOrder, setPharmacyOrder] = useState([]);
    const [editPharmacyOrderValue, setEditPharmacyOrderValue] = useState({
        encounterDateTime: "",
        drugName: "",
        dosageStrength: "",
        dosageStrengthUnit: "",
        dosageFrequency: "",
        startDate: "",
        duration: "",
        durationUnit: "",
        comments: "",
        patientId: patientObj.id,
        orderedBy: "",
        dateTimePrescribed: "",
        visitId: patientObj.visitId
    });

    const pharmacy_by_visitId = useCallback(async () => {
            try {
                const response = await axios.get(`${apiUrl}drug-orders/visits/${patientObj.visitId}`,
                { headers: {"Authorization" : `Bearer ${token}`}});

                console.log("red",response.data)

                if (typeof response.data === 'string') {
                    setPharmacyOrder([]);
                }else {
                    setPharmacyOrder(response.data);
                }


            } catch (e) {
                toast.error("An error occurred while fetching pharmacy data", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }, []);

    const onSubmit = async (data) => {
        const diagnosisList = [];
        const presentingComplaints = [];
        const labTests = [];

        for (const inputFieldsDiag of inputFieldsDiagnosis) {
            if (inputFieldsDiag.diagnosis) {
                diagnosisList.push(inputFieldsDiag);
            }
        }

        for (const inputField of inputFields) {
            if (inputField.complaint) {
                presentingComplaints.push(inputField);
            }
        }

        for (const inputField of inputFieldsLab) {

            if (inputField.encounterDate) {
                labTests.push({
                "description": inputField.labOrder.slice(2, inputField.labOrder.length),
                "id": 0,
                "labTestGroupId": inputField.labOrder.slice(0, 1),
                "labTestId": inputField.labTest,
                "labTestOrderStatus": inputField.status,
                "orderPriority": inputField.priority,
//                "unitMeasurement": "",
//                "viralLoadIndication": 0
              });
            }
        }

        try {
            const InData = {
                "diagnosisList": diagnosisList,
                "encounterDate": format(new Date(data.encounterDate.toString()), 'yyyy-MM-dd'),
                "id": 0,
                "patientId": patientObj.id,
                "presentingComplaints": presentingComplaints,
                "visitId": patientObj.visitId,
                "visitNotes": data.visitNote
            };

            const labOrder = {
                  "orderDate": format(new Date(data.encounterDate.toString()), 'yyyy-MM-dd'),
                  "orderTime": new Date().toLocaleTimeString('en-US',{hour12: false}),
                  "patientId": patientObj.id,
                  "tests": labTests,
                  "visitId": patientObj.visitId
            }
            //console.log('labOrder', labOrder)
            await axios.post(`${baseUrl}consultations`, InData,
            { headers: {"Authorization" : `Bearer ${token}`} }).then(( resp ) =>{
                console.log("diagnosis saved", resp)

                axios.post(`${baseUrl}laboratory/orders`, labOrder,
                { headers: {"Authorization" : `Bearer ${token}`} }).then(( resp ) =>{
                    console.log("lab served", resp)

                    toast.success("Successfully Saved Consultation !", {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    history.push('/');
                }).catch((err) => {
                     toast.error(`An error occured while saving laboratory test! ${err}`, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                });

            });

        } catch (e) {
            toast.error("An error occured while saving Consultation !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };
    const OnError = (errors) => {
        console.error(errors);
        toast.error("Visit Note Is Required", {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const [labGroups, setLabGroups] = useState([]);
    const [labTests, setLabTests] = useState([]);
    const [priorities, setPriorities] = useState([]);

    const loadLabCheck = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}modules/check?moduleName=lab`, { headers: {"Authorization" : `Bearer ${token}`} });
            setIsLabEnabled(response.data);
        } catch (e) {
            toast.error("An error occurred while fetching lab", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, []);

    const loadPharmacyCheck = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}modules/check?moduleName=pharmacy`, { headers: {"Authorization" : `Bearer ${token}`} });
            setIsPharmacyEnabled(response.data);
        } catch (e) {
            toast.error("An error occurred while fetching pharmacy", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, []);

    const loadOtherVisitsVitals = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}patient/vital-sign/person/${patientObj.id}`, { headers: {"Authorization" : `Bearer ${token}`}});
            setOtherVisitVitals(response.data);
        } catch (e) {
            toast.error("An error occurred while fetching vitals", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, []);

    const loadPreviousConsultation = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}consultations/consultations-by-patient-id/${patientObj.id}`, { headers: {"Authorization" : `Bearer ${token}`}});
            setPreviousConsultation(response.data);
        } catch (e) {
            toast.error("An error occurred while fetching previous consultation", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, []);

    const loadLabGroup = useCallback(async () => {
            try {
                const response = await axios.get(`${baseUrl}laboratory/labtestgroups`, { headers: {"Authorization" : `Bearer ${token}`}});
                setLabGroups(response.data);
            } catch (e) {
                toast.error("An error occurred while fetching lap group data", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }, []);

    const priority = useCallback(async () => {
            try {
                const response = await axios.get(`${baseUrl}application-codesets/v2/TEST_ORDER_PRIORITY`, { headers: {"Authorization" : `Bearer ${token}`}});
                //console.log("priority", response.data);
                setPriorities(response.data);
            } catch (e) {
                toast.error("An error occurred while fetching priority data", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }, []);

    useEffect(() => {
        loadPharmacyCheck();
        loadLabCheck();
        loadOtherVisitsVitals();
        loadPreviousConsultation();
        loadLabGroup();
        priority();
        pharmacy_by_visitId();
        getLatestVitals();
    }, [loadPharmacyCheck, loadLabCheck, loadOtherVisitsVitals,
    loadPreviousConsultation, loadLabGroup, priority, pharmacy_by_visitId]);

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


    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ complaint: '', onsetDate: '', severity: 0, dateResolved: '' });
        setInputFields(values);
    };

    const handleAddDiagFields = () => {
        const values = [...inputFieldsDiagnosis];
        values.push({ certainty: '', diagnosis: '', diagnosisOrder: 0 });
        setInputFieldsDiagnosis(values);
    };

    const handleAddFieldsLab = () => {
        const values = [...inputFieldsLab];
        values.push({ encounterDate: format(new Date(), 'yyyy-MM-dd'), labOrder: '', labTest: '', priority: '', status: '' });
        setInputFieldsLab(values);
    };

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        if (event.target.name === "complaint") {
            values[index].complaint = event.target.value;
        } else if (event.target.name === "onsetDate") {
            values[index].onsetDate = event.target.value;
        } else if (event.target.name === "severity") {
            values[index].severity = event.target.value;
        } else if (event.target.name === "dateResolved") {
            values[index].dateResolved = event.target.value;
        }

        setInputFields(values);
    };

    const handleInputDiagChange = (index, event) => {
        const values = [...inputFieldsDiagnosis];
        if (event.target.name === "diagnosis") {
            values[index].diagnosis = event.target.value;
        } else if (event.target.name === "certainty") {
            values[index].certainty = event.target.value;
        } else if (event.target.name === "diagnosisOrder") {
            values[index].diagnosisOrder = event.target.value;
        }

        setInputFieldsDiagnosis(values);
    };

    const labCascade = id => {
        labGroups.forEach(function (x) {
              if ( x.id == id) {
                setLabTests(x.labTests)
            }
        });
    }

    const handleInputLabChange = (index, event) => {
            const values = [...inputFieldsLab];
            if (event.target.name === "labOrder") {
                const str = event.target.value;
                values[index].labOrder = str;
                labCascade(str.slice(0,1))
            }
            else if (event.target.name === "labTest") {
                values[index].labTest = event.target.value;
            } else if (event.target.name === "priority") {
                values[index].priority = event.target.value;
            }
            else if (event.target.name === "status") {
                values[index].status = event.target.value;
            }

            setInputFieldsLab(values);
        };

    const handleAddPharmacyOrder = () => {
        setPharmacyModal(!pharmacyModal);
    };

     const handleEditPharmacyOrder = (pharmacy) => {
            console.log(pharmacy);
            setEditPharmacyOrderValue(pharmacy);
            setPharmacyOrderModal(!pharmacyOrderModal);
     };

     const handleDelete = async (id) => {
        console.log(id)
           await axios.delete(`${apiUrl}drug-orders/${id}`,
            { headers: {"Authorization" : `Bearer ${token}`}}).then(resp => {
            console.log("drug order deleted");
             toast.success("Successfully deleted drug order!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
     }

    return (
        <Grid columns='equal'>
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
                                        <Typography className={classes.heading}>Current Vitals - Date - {latestVitals.encounterDate}</Typography>
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
                                            <Typography className={classes.heading} style={{color:'#014d88'}}>Vitals Collection - Date - {vital.encounterDate}</Typography>
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

{/*                { previousConsultation &&
                    <Segment>
                        <Label as='a' color='black' style={{width:'100%',marginBottom:'10px'}}>
                            Conditions
                        </Label>
                        <br/>

                        { previousConsultation.map((consultation, i) => (
                            <div>
                                {consultation.diagnosisList.map((diagnosis, j)=> (
                                    <Label as='a'  color='white'  size="mini" pointing>
                                        {diagnosis.diagnosis}
                                    </Label>
                                ))}
                            </div>
                        ))}
                    </Segment>
                }*/}

                { hasAllergies &&
                    <Segment>
                        <Label as='a' color='red' ribbon>
                            Allergies
                        </Label>
                        <br/><br/>

                        <Label.Group color='blue'>
                            <Label as='a'  size="mini">dust</Label>
                            <Label as='a'  size="mini">smoke</Label>
                        </Label.Group>
                    </Segment>
                }
            </Grid.Column>

            <Grid.Column width={9}>
                <form onSubmit={handleSubmit(onSubmit, OnError)}>
                    <Label as='a' color='black' style={{width:'100%',height:'35px',fontSize:'16px'}}>
                        <b>Physical Examination</b>
                    </Label>

                    <Segment>
                        <div className="input-group input-group-sm mb-3" >
                            <span className="input-group-text" style={{height:'40px',backgroundColor:'#014d88',color:'#fff', fontSize:'14px'}}>Encounter Dates</span>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <Controller
                                    name="encounterDate"
                                    control={control}
                                    defaultValue={encounterDate}
                                    rules={{ required: true }}
                                    render={({ field: { ref, ...rest }}) => (
                                        <KeyboardDateTimePicker
                                            style={{height:'40px', border:'1px solid #014d88'}}
                                            disableFuture
                                            format="dd/MM/yyyy hh:mm a"
                                            value={encounterDate}
                                            onChange={setEncounterDate}
                                            className="form-control"
                                            invalidDateMessage={"Encounter date is required"}
                                            {...rest}
                                        />
                                    )}
                                    />
                            </MuiPickersUtilsProvider>
                        </div>

                        <div className="input-group input-group-sm " >
                            <span className="input-group-text" style={{height:'300px',backgroundColor:'#014d88',color:'#fff', fontSize:'14px'}}>Visit Note</span>
                            <Controller
                                name="visitNote"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { ref, ...rest }}) => (
                                    <textarea  style={{ minHeight: 300,border:'1px solid #014d88' }} className="form-control" {...rest} ></textarea>
                                )}
                            />
                        </div>
                        <br/>
                        <Label as='a'  style={{backgroundColor:'#014d88', color:'#fff',width:'100%',height:'35px',fontSize:'16px'}}>
                            Presenting Complaints
                        </Label>
                        <Table style={{color:'#014d88',borderColor:'#014d88'}} celled >
                            <Table.Header>
                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: 'bold'}}>Complaints</Table.Cell>
                                    <Table.Cell style={{ fontWeight: 'bold'}}>Onset Date</Table.Cell>
                                    <Table.Cell style={{ fontWeight: 'bold'}}>Severity</Table.Cell>
                                    <Table.Cell style={{ fontWeight: 'bold'}}>Date Resolved</Table.Cell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                    {inputFields.map((inputField, index) => (
                                        <Fragment key={`${inputField}~${index}`}>
                                            <Table.Row>
                                            <Table.Cell>
                                                <Input
                                                    id="complaint"
                                                    name="complaint"
                                                    type="text"
                                                    fluid
                                                    placeholder='Enter Presenting Complaints'
                                                    value={inputField.complaint}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    id="onsetDate"
                                                    name="onsetDate"
                                                    type="date"
                                                    fluid
                                                    placeholder='Onset Date'
                                                    value={inputField.onsetDate}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <select
                                                    class="ui fluid selection dropdown"
                                                    value={inputField.severity}
                                                    onChange={event => handleInputChange(index, event)}
                                                    name="severity"
                                                    id="severity">
                                                    <option>Select</option>
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    id="dateResolved"
                                                    name="dateResolved"
                                                    type="date"
                                                    fluid
                                                    placeholder='Date Resolved'
                                                    value={inputField.dateResolved}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </Table.Cell>
                                            </Table.Row>
                                        </Fragment>
                                    ))}

                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        <Button color="blue" size="tiny" type="button" onClick={() => handleAddFields()}>
                                            <Icon name='plus' /> Add More
                                        </Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                        <br/>
                        <Label as='a' style={{backgroundColor:'#992E62', color:'#fff', width:'100%',height:'35px',fontSize:'16px'}}>
                            Clinical Diagnosis
                        </Label>
                        <Table style={{color:'#992E62',borderColor:'#992E62'}} celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: 'bold'}}>Condition</Table.Cell>
                                    <Table.Cell style={{ fontWeight: 'bold'}}>Order</Table.Cell>
                                    <Table.Cell style={{ fontWeight: 'bold'}}>Certainty</Table.Cell>
                                    <Table.Cell style={{ fontWeight: 'bold'}}></Table.Cell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {inputFieldsDiagnosis.map((diagInputField, diagIndex) => (
                                    <Fragment key={`${diagInputField}~${diagIndex}`}>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Input
                                                    id="diagnosis"
                                                    name="diagnosis"
                                                    type="text"
                                                    fluid
                                                    placeholder='Condition'
                                                    value={diagInputField.diagnosis}
                                                    onChange={event => handleInputDiagChange(diagIndex, event)}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <select
                                                    className="ui fluid selection dropdown"
                                                    value={diagInputField.diagnosisOrder}
                                                    onChange={event => handleInputDiagChange(diagIndex, event)}
                                                    name="diagnosisOrder"
                                                    id="diagnosisOrder">
                                                    <option>Select</option>
                                                    <option value="1">Primary</option>
                                                    <option value="2">Secondary</option>
                                                </select>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <select
                                                    className="ui fluid selection dropdown"
                                                    value={diagInputField.certainty}
                                                    onChange={event => handleInputDiagChange(diagIndex, event)}
                                                    name="certainty"
                                                    id="certainty">
                                                    <option>Select</option>
                                                    <option value="1">Presumed</option>
                                                    <option value="2">Confirmed</option>
                                                </select>
                                            </Table.Cell>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                    </Fragment>
                                ))}
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell>

                                        <Button style={{backgroundColor:'#992E62',color:'#fff'}} size="tiny" type="button" onClick={() => handleAddDiagFields()}>
                                            <Icon name='plus' /> Add More
                                        </Button>
                                    </Table.HeaderCell>

                                </Table.Row>
                            </Table.Footer>
                        </Table>
                        <br/>
                        { isLabEnabled && <div>
                            <Label as='a' color='teal' style={{width:'100%',height:'35px',fontSize:'16px'}}>
                                Lab Test
                            </Label>

                            <Table color="teal" celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.Cell style={{ fontWeight: 'bold'}}>Lab Test Group</Table.Cell>
                                        <Table.Cell style={{ fontWeight: 'bold'}}>Lab Test</Table.Cell>
                                        <Table.Cell style={{ fontWeight: 'bold'}}>Priority</Table.Cell>
                                        <Table.Cell style={{ fontWeight: 'bold'}}>Status</Table.Cell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                   {inputFieldsLab.map((labInputField, labIndex) => (
                                        <Fragment key={`${labInputField}~${labIndex}`}>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <select
                                                        className="ui fluid selection dropdown"
                                                        value={labInputField.labOrder}
                                                        onChange={ e => handleInputLabChange(labIndex, e)}
                                                        name="labOrder"
                                                        id="labOrder">
                                                        <option>Select</option>
                                                        {
                                                            labGroups.map((d)=> (
                                                                <option key={d.id} value={`${d.id}-${d.groupName}`}>
                                                                    {d.groupName}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>

                                                </Table.Cell>
                                                <Table.Cell>
                                                    <select
                                                        className="ui fluid selection dropdown"
                                                        value={labInputField.labTest}
                                                        onChange={e => handleInputLabChange(labIndex, e)}
                                                        name="labTest"
                                                        id="labTest">
                                                        <option>Select</option>
                                                             {
                                                                labTests.map((d)=> (
                                                                    <option key={d.id} value={d.id}>
                                                                        {d.labTestName}
                                                                    </option>
                                                                ))
                                                            }
                                                    </select>

                                                </Table.Cell>
                                                <Table.Cell>
                                                <select
                                                    className="ui fluid selection dropdown"
                                                    value={labInputField.priority}
                                                    onChange={e => handleInputLabChange(labIndex, e)}
                                                    name="priority"
                                                    id="priority">
                                                    <option>Select</option>
                                                       {
                                                            priorities.map((d)=> (
                                                                <option key={d.id} value={d.id}>
                                                                    {d.display}
                                                                </option>
                                                            ))
                                                        }
                                                </select>

                                                </Table.Cell>
                                                <Table.Cell>
                                                    <select
                                                        className="ui fluid selection dropdown"
                                                        value={labInputField.status}
                                                        onChange={e => handleInputLabChange(labIndex, e)}
                                                        name="status"
                                                        id="status">
                                                        <option>Select</option>
                                                        <option value="0">Pending Collection</option>
                                                       {/* <option value="1">Sample Collected</option>
                                                        <option value="2">Sample Transferred</option>
                                                        <option value="3">Sample Verified</option>
                                                        <option value="4">Sample Rejected</option>
                                                        <option value="5">Result Available</option> */}
                                                    </select>
                                                </Table.Cell>
                                            </Table.Row>
                                        </Fragment>
                                    ))}
                                </Table.Body>

                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell>

                                            <Label as='a' color="blue" size="tiny" onClick={() => handleAddFieldsLab()}>
                                                <Icon name='plus' /> Add Test
                                            </Label>
                                        </Table.HeaderCell>

                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </div>}
                        <br/>
                        <Label as='a' color='purple' style={{width:'100%',height:'35px',fontSize:'16px'}}>
                            Pharmacy Order
                        </Label>
                        <br/>
                        <br/>
                        <>
                        {
                           pharmacyOrder.length > 0 ? pharmacyOrder.map((pharmacy, i) => (
                            <div className="page-header" key={i}>
                                  <p><b>{pharmacy.drugName}</b>
                                  <br /> Start at {pharmacy.startDate} for {pharmacy.dosageFrequency} to be taken {pharmacy.duration} time(s) a day
                                  <br />
                                  Instructions: {pharmacy.comments}  <br />
                                  Date Ordered: {pharmacy.dateTimePrescribed}</p>
                                  <p>
                                    <Label as='a' color="blue" size="tiny" onClick={() => handleEditPharmacyOrder(pharmacy)}>
                                    <Icon name='eye' /> View</Label>
                                    {" "}
                                    <Label as='a' color="red" size="tiny" onClick={() => handleDelete(pharmacy.id)}>
                                                                    <Icon name='delete' /> Delete</Label>
                                  </p>
                                  <br/>
                            </div>
                            )) :
                            <p>No previous pharmacy record for this patient</p>
                        }

                        </>
                        <br/>
                        { isPharmacyEnabled &&
                            <div>
                                <ButtonMui
                                    variant="contained"
                                    color="primary"
                                    className="ms-2"
                                    onClick={() => handleAddPharmacyOrder()}
                                >
                                    <span style={{ textTransform: "capitalize" }}>Add Pharmacy Order</span>
                                </ButtonMui>
                            </div>
                        }
                    </Segment>
                    <Button type={"submit"} variant="contained" color={"primary"}>Submit</Button>
                </form>
          </Grid.Column>
          <Grid.Column>
            <Segment>

            <List>
                  <List.Item>
                      <Link
                          to={{
                              pathname: "/patient-consultations-history",
                              state: { patientObj: patientObj  }
                          }}>
                          <Button icon labelPosition='right'  style={{width:'100%',backgroundColor:'#992E62',color:"#fff", padding:'15px'}}  fluid>
                              <Icon name='eye' />
                              View Consultation History
                          </Button>
                      </Link>
                  </List.Item>
{/*                  <List.Item>
                  <Button icon labelPosition='right' color='blue' fluid>
                      <Icon name='calendar alternate' />
                        Appointment 
                    </Button>
                  </List.Item>*/}
            </List>
                { previousConsultation &&
                    <Card style={{width:'100%'}}>
                        <Card.Content style={{padding:'5px'}}>
                            <Label as='a'   style={{width:'100%',backgroundColor:'#014d88',color:"#fff", padding:'10px'}}>
                                <Typography className={classes.heading}><b>Previous Clinical Notes</b></Typography>
                            </Label>

                        </Card.Content>
                        <Card.Content style={{padding:'5px'}}>
                            <Feed>
                                {previousConsultation && previousConsultation.length > 0 &&
                                    previousConsultation.map(consultation =>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon style={{color:'#fff'}} />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                                style={{padding:'0px 0px 0px 10px',backgroundColor:'#1678c2',border:'2px solid #ddd',color:'#fff'}}
                                            >
                                                <Typography className={classes.heading} >Consultation -Date - {consultation.encounterDate}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails style={{padding:'10px 5px',minHeight:100,border:'2px solid #ddd', marginTop:'-10px'}}>
                                                {consultation.visitNotes}
                                            </AccordionDetails>
                                        </Accordion>
                                    )

                                }

{/*                                { previousConsultation.map((consultation, i) => (
                                    <div>
                                        <Feed.Event>
                                            <Feed.Content>
                                                <Feed.Date content={consultation.encounterDate} />
                                                <Feed.Summary>
                                                    {consultation.visitNotes}
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>
                                        <hr/>
                                    </div>
                                )) }*/}
                            </Feed>
                        </Card.Content>
                    </Card>
                }
            </Segment>
          </Grid.Column>
            <AddPharmacyOrder toggle={toggle} patientObj={patientObj} showModal={pharmacyModal} />
            <EditPharmacyOrder toggle={toggleOrder} patientObj={patientObj}
             showModal={pharmacyOrderModal} editPharmacyOrderValue={editPharmacyOrderValue}/>
        </Grid>
    );
  };

export default Widget;
