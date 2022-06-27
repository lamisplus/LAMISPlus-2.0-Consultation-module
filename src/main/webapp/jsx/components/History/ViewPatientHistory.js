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

const Widget = (props) => {
    let history = useHistory();
    const patientObj = history.location && history.location.state ? history.location.state.patientObj : {}
    //console.log("vist", patientObj)
    const [isLabEnabled, setIsLabEnabled] = useState(false);
    const [isPharmacyEnabled, setIsPharmacyEnabled] = useState(false);
    const [hasAllergies, setHasAllergies] = useState(false);
    const [pharmacyModal, setPharmacyModal] = useState(false);
    const [latestVitals, setLatestVitals] = useState([]);
    const [previousConsultation, setPreviousConsultation] = useState([]);
    const [encounterDate, setEncounterDate] = useState(new Date());
    const { handleSubmit, control, getValues, setError, setValue } = useForm();
    const [inputFields, setInputFields] = useState(patientObj.presentingComplaints);
    const [inputFieldsDiagnosis, setInputFieldsDiagnosis] = useState(patientObj.diagnosisList);

    const [inputFieldsLab, setInputFieldsLab] = useState([
            { encounterDate: format(new Date(), 'yyyy-MM-dd'), labOrder: '',
            labTest: '', priority: '', status: '' }
        ]);

    const toggle = () => setPharmacyModal(!pharmacyModal);

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
                  //"orderTime": new Date().toLocaleTimeString(),
                  "patientId": patientObj.id,
                  "tests": labTests,
                  "visitId": patientObj.visitId
            }
            await axios.post(`${baseUrl}consultations`, InData,
            { headers: {"Authorization" : `Bearer ${token}`} }).then(( resp ) =>{
                console.log("diagnosis saved", resp)

                axios.post(`${baseUrl}laboratory/orders`, labOrder,
                { headers: {"Authorization" : `Bearer ${token}`} }).then(( resp ) =>{
                    console.log("lab served", resp)
                });
            });

            toast.success("Successfully Saved Consultation !", {
                position: toast.POSITION.TOP_RIGHT
            });
           history.push('/patient-consultations-history');

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

    const loadLatestVitals = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}patient/vital-sign/person/${patientObj.patientId}`, { headers: {"Authorization" : `Bearer ${token}`}});
            setLatestVitals(response.data);
        } catch (e) {
            toast.error("An error occurred while fetching vitals", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, []);

    const loadPreviousConsultation = useCallback(async () => {
        try {
            //const response = await axios.get(`${baseUrl}consultations/consultations-by-patient-id/${patientObj.id}`, { headers: {"Authorization" : `Bearer ${token}`}});
            setPreviousConsultation([]);
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

    const consultations_by_visitId = useCallback(async () => {
            try {
                const response = await axios.get(`${baseUrl}consultations/consultations-by-visit-id/${patientObj.visitId}`,
                { headers: {"Authorization" : `Bearer ${token}`}});
                //console.log("consult", response.data);
                //setPriorities(response.data);
            } catch (e) {
                toast.error("An error occurred while fetching priority data", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }, []);

    const pharmacy_by_visitId = useCallback(async () => {
                try {
                    const response = await axios.get(`${apiUrl}drug-orders/orders-by-visit-id/${patientObj.visitId}`,
                    { headers: {"Authorization" : `Bearer ${token}`}});

                    console.log('id', patientObj.visitId);
                    console.log("pharmacy", response.data);
                    //setPriorities(response.data);
                } catch (e) {
                    toast.error("An error occurred while fetching pharmacy data", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            }, []);

     const labtest_by_visitId = useCallback(async () => {
                    try {
                        const response = await axios.get(`${baseUrl}laboratory/orders-by-visit-id/${patientObj.visitId}`,
                        { headers: {"Authorization" : `Bearer ${token}`}});

                        const labTests = [];

                        for (const lab of response.data) {

                            for (const data of lab.tests) {
                                let labTestGroup = data.labTestGroupId;
                                let labTestId = data.labTestId;
                                let orderPriority = data.orderPriority;
                                let labTestOrderStatus = data.labTestOrderStatus;

                                let labdata = {
                                  labOrder: labTestGroup,
                                  labTest: labTestId,
                                  priority: orderPriority,
                                  status: labTestOrderStatus
                                  };

                                console.log("lab test", labdata);
                                labTests.push(labdata)
                            }
                        }

                         setInputFieldsLab(labTests);
                    } catch (e) {
                        toast.error("An error occurred while fetching priority data", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                }, []);

    useEffect(() => {
        loadPharmacyCheck();
        loadLabCheck();
        loadLatestVitals();
        loadPreviousConsultation();
        loadLabGroup();
        priority();
        consultations_by_visitId();
        labtest_by_visitId();
        pharmacy_by_visitId();
    }, [loadPharmacyCheck, loadLabCheck, loadLatestVitals, loadPreviousConsultation,
    loadLabGroup, priority, consultations_by_visitId, labtest_by_visitId, pharmacy_by_visitId]);

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

    return (
        <Grid columns='equal'>
            <Grid.Column>
                { latestVitals && latestVitals.length > 0 &&
                    <Segment>
                        <Label as='a' color='blue' ribbon>
                            Recent Vitals
                        </Label>
                        <br/>
                        <List celled>
                            <List.Item>Pulse <span className="float-end"><b>{latestVitals[latestVitals.length - 1].pulse}bpm</b></span></List.Item>
                            <List.Item>Respiratory Rate <span className="float-end"><b>{latestVitals[latestVitals.length - 1].respiratoryRate}bpm</b></span></List.Item>
                            <List.Item>Temperature <span className="float-end"><b>{latestVitals[latestVitals.length - 1].temperature}<sup>0</sup>C</b></span></List.Item>
                            <List.Item>Blood Presure <span  className="float-end"><b>{latestVitals[latestVitals.length - 1].systolic}/{latestVitals[latestVitals.length - 1].diastolic}</b></span></List.Item>
                            <List.Item>Height <span  className="float-end"><b>{latestVitals[latestVitals.length - 1].height}m</b></span></List.Item>
                            <List.Item>Weight <span  className="float-end"><b>{latestVitals[latestVitals.length - 1].bodyWeight}kg</b></span></List.Item>
                        </List>
                    </Segment>
                }

                { previousConsultation &&
                    <Segment>
                        <Label as='a' color='black' ribbon>
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
                }


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
                    <Label as='a' color='black' ribbon>
                        <b>Physical Examination</b>
                    </Label>

                    <Segment>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text">Encounter Date</span>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Controller
                                    name="encounterDate"
                                    control={control}
                                    defaultValue={encounterDate}
                                    rules={{ required: true }}
                                    render={({ field: { ref, ...rest }}) => (
                                        <KeyboardDateTimePicker
                                            disableFuture
                                            format="dd/MM/yyyy hh:mm a"
                                            value={patientObj.encounterDate}
                                            onChange={setEncounterDate}
                                            className="form-control"
                                            invalidDateMessage={"Encounter date is required"}
                                            {...rest}
                                        />
                                    )}
                                    />
                            </MuiPickersUtilsProvider>
                        </div>

                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text">Visit Note</span>
                            <Controller
                                name="visitNote"
                                control={control}

                                rules={{ required: true }}
                                render={({ field: { ref, ...rest }}) => (
                                    <textarea
                                    className="form-control"
                                    style={{ minHeight: 100, fontSize: 14 }}
                                    {...rest}
                                    >{patientObj.visitNotes}</textarea>
                                )}
                            />
                        </div>
                        <br/>
                        <Label as='a' color='red' ribbon>
                            Presenting Complaints
                        </Label>
                        <Table color="red" celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Complaints</Table.HeaderCell>
                                    <Table.HeaderCell>Onset Date</Table.HeaderCell>
                                    <Table.HeaderCell>Severity</Table.HeaderCell>
                                    <Table.HeaderCell>Date Resolved</Table.HeaderCell>
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
                        <Label as='a' color='pink' ribbon>
                            Clinical Diagnosis
                        </Label>
                        <Table color="pink" celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Condition</Table.HeaderCell>
                                    <Table.HeaderCell>Order</Table.HeaderCell>
                                    <Table.HeaderCell>Certainty</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
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
                                                    <option></option>
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
                                                    <option></option>
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

                                        <Button color="blue" size="tiny" type="button" onClick={() => handleAddDiagFields()}>
                                            <Icon name='plus' /> Add More
                                        </Button>
                                    </Table.HeaderCell>

                                </Table.Row>
                            </Table.Footer>
                        </Table>
                        <br/>
                        { isLabEnabled && <div>
                            <Label as='a' color='teal' ribbon>
                                Lab Test
                            </Label>

                            <Table color="teal" celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Lab Test Group</Table.HeaderCell>
                                        <Table.HeaderCell>Lab Test</Table.HeaderCell>
                                        <Table.HeaderCell>Priority</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
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
                                                        <option></option>
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
                                                        <option></option>
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
                                                    <option></option>
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
                                                        <option></option>
                                                        <option value="0">Pending</option>
                                                        <option value="1">Collected</option>
                                                        <option value="2">Verified</option>
                                                        <option value="3">Ready</option>

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
                        <Label as='a' color='purple' ribbon>
                            Pharmacy Order
                        </Label>
                        <br/>
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
                          <Button icon labelPosition='right' color='green' fluid>
                              <Icon name='eye' />
                              View History
                          </Button>
                      </Link>
                  </List.Item>
                  <List.Item>
                  <Button icon labelPosition='right' color='blue' fluid>
                      <Icon name='calendar alternate' />
                        Appointment
                    </Button>
                  </List.Item>
            </List>
                { previousConsultation &&
                    <Card>
                        <Card.Content>
                            <b>Previous Clinical Notes</b>
                        </Card.Content>
                        <Card.Content>
                            <Feed>
                                { previousConsultation.map((consultation, i) => (
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
                                )) }
                            </Feed>
                        </Card.Content>
                    </Card>
                }
            </Segment>
          </Grid.Column>
            <AddPharmacyOrder toggle={toggle} patientObj={patientObj} showModal={pharmacyModal} />
        </Grid>
    );
  };

export default Widget;
