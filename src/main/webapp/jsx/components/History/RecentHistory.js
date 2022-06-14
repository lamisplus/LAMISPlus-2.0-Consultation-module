import React, {Fragment, useState} from "react";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { useForm, Controller } from "react-hook-form";
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios";
import { toast } from 'react-toastify';
import {token, url as baseUrl} from "../../../api";
import { Grid, Segment, Label, Icon, List,Button, Card, Feed, Input, Radio } from 'semantic-ui-react';
// Page titie
import {  Checkbox, Table } from 'semantic-ui-react';


const Widget = () => {
    const [encounterDate, setEncounterDate] = useState(new Date());
    const { handleSubmit, control, getValues, setError, setValue } = useForm();
    const [inputFields, setInputFields] = useState([
        { complaint: '', onsetDate: '', severity: 0, dateResolved: '' }
    ]);
    const [inputFieldsDiagnosis, setInputFieldsDiagnosis] = useState([
        { certainty: '', diagnosis: '', diagnosisOrder: 0 }
    ]);

    const onSubmit = async (data) => {
        try {
            const InData = {
                "diagnosisList": inputFieldsDiagnosis,
                "encounterDate": data.encounterDate,
                "encounterId": 1,
                "id": 0,
                "patientId": 1,
                "presentingComplaints": inputFields,
                "uuid": "string",
                "visitId": 1,
                "visitNotes": data.visitNote
            }
            await axios.post(`${baseUrl}consultations`, InData, { headers: {"Authorization" : `Bearer ${token}`} });
            toast.success("Successfully Saved Consultation !", {
                position: toast.POSITION.TOP_RIGHT
            });
        } catch (e) {
            toast.error("An error occured while saving Consultation !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };
    const OnError = (errors) => {
        console.error(errors);
    };

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
        console.log(event.target.value);
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

    return (
        <Grid columns='equal'>
            <Grid.Column>
                <Segment>
                    <Label as='a' color='blue' ribbon>
                        Recent Vitals
                    </Label>
                    <br/>
                    <List celled >
                        <List.Item>Pulse <span className="float-end"><b>45mpb</b></span></List.Item>
                        <List.Item>Respiratory Rate <span className="float-end"><b>41mpb</b></span></List.Item>
                        <List.Item>Temperature <span className="float-end"><b>32<sub>0</sub>C</b></span></List.Item>
                        <List.Item>Blood Presure <span  className="float-end"><b>332/30</b></span></List.Item>
                        <List.Item>Height <span  className="float-end"><b>31.89m</b></span></List.Item>
                        <List.Item>Weight <span  className="float-end"><b>376kg</b></span></List.Item>
                    </List>
                </Segment>

                <Segment>
                    <Label as='a' color='black' ribbon>
                        Conditions
                    </Label>
                    <br/>

                    <Label as='a'  color='white'  size="mini" pointing>
                        Laser Fever
                    </Label>

                    <Label as='a'  color='white'  size="mini" pointing>
                      Typoid Fever
                    </Label>

                    <Label as='a'  color='white'  size="mini" pointing>
                     Asthma
                    </Label>
                </Segment>

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

                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text">Visit Note</span>
                            <Controller
                                name="visitNote"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { ref, ...rest }}) => (
                                    <textarea className="form-control" {...rest}></textarea>
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
                                                <input type="radio" id="Primary" name="diagnosisOrder" value="1" value={diagInputField.diagnosisOrder} onChange={event => handleInputDiagChange(diagIndex, event)} />
                                                <label htmlFor="Primary">Primary</label><br />
                                                <input type="radio" id="Secondary" name="diagnosisOrder" value={diagInputField.diagnosisOrder}
                                                       value="2" onChange={event => handleInputDiagChange(diagIndex, event)} />
                                                <label htmlFor="Secondary">Secondary</label>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <input type="radio" value={diagInputField.certainty} id="Presumed" name="certainty" value="1" onChange={event => handleInputDiagChange(diagIndex, event)} />
                                                <label htmlFor="Presumed">Presumed</label><br />
                                                <input type="radio" id="Confirmed" name="certainty"
                                                       value="2" value={diagInputField.certainty} onChange={event => handleInputDiagChange(diagIndex, event)} />
                                                <label htmlFor="Confirmed">Confirmed</label>
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
                        <Label as='a' color='teal' ribbon>
                            Lab Test
                        </Label>
                        <Table color="teal" celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Lab Test Date</Table.HeaderCell>
                                    <Table.HeaderCell>Lab	Order</Table.HeaderCell>
                                    <Table.HeaderCell>Lab Test</Table.HeaderCell>
                                    <Table.HeaderCell>Piriority</Table.HeaderCell>
                                    <Table.HeaderCell>Order By</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell><Input type="text" fluid  placeholder='Encounter Date' /></Table.Cell>
                                    <Table.Cell><Input type="text" fluid  placeholder='Encounter Date' /></Table.Cell>
                                    <Table.Cell><Input type="date" fluid  placeholder='Encounter Date' /></Table.Cell>
                                    <Table.Cell><Input type="date" fluid  placeholder='Encounter Date' /></Table.Cell>
                                    <Table.Cell></Table.Cell>
                                </Table.Row>

                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell>

                                        <Label as='a' color="blue" size="tiny">
                                            <Icon name='plus' /> Add Test
                                        </Label>
                                    </Table.HeaderCell>

                                </Table.Row>
                            </Table.Footer>
                        </Table>
                        <br/>
                        <Label as='a' color='purple' ribbon>
                            Medication Prescription
                        </Label>
                        <Table color="purple" celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Lab Test Date</Table.HeaderCell>
                                    <Table.HeaderCell>Lab	Order</Table.HeaderCell>
                                    <Table.HeaderCell>Lab Test</Table.HeaderCell>
                                    <Table.HeaderCell>Piriority</Table.HeaderCell>
                                    <Table.HeaderCell>Order By</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell><Input type="text" fluid  placeholder='Encounter Date' /></Table.Cell>
                                    <Table.Cell><Input type="text" fluid  placeholder='Encounter Date' /></Table.Cell>
                                    <Table.Cell><Input type="date" fluid  placeholder='Encounter Date' /></Table.Cell>
                                    <Table.Cell><Input type="date" fluid  placeholder='Encounter Date' /></Table.Cell>
                                    <Table.Cell></Table.Cell>
                                </Table.Row>

                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell>

                                        <Label as='a' color="blue" size="tiny">
                                            <Icon name='plus' /> Add New Drug Order
                                        </Label>
                                    </Table.HeaderCell>

                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Segment>
                    <Button type={"submit"} variant="contained" color={"primary"}>Submit</Button>
                </form>
          </Grid.Column>
          <Grid.Column>
            <Segment>
            <List>
                  <List.Item>
                  <Button icon labelPosition='right' color='teal' fluid>
                      <Icon name='external alternate' />
                        Post Patient
                    </Button>
                  </List.Item>
                  <List.Item>
                  <Button icon labelPosition='right' color='green' fluid>
                      <Icon name='eye' />
                        View History
                    </Button>
                  </List.Item>
                  <List.Item>
                  <Button icon labelPosition='right' color='blue' fluid>
                      <Icon name='calendar alternate' />
                        Appointment 
                    </Button>
                  </List.Item>
            </List>
            <Card>
            <Card.Content>
              <b>Previous Clinical Notes</b>
            </Card.Content>
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='20-03-2022' />
                    <Feed.Summary>
                      The malaria is plus 3 and and need more attention
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <hr/>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='20-05-2022' />
                    <Feed.Summary>
                      Blood presure is too high
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Card.Content>
          </Card>

            </Segment>
          </Grid.Column>
        </Grid>
    );
  };

export default Widget;
