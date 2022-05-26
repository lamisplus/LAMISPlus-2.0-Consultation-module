import React from "react";
import { Grid, Segment, Label, Icon, List,Button, Card, Feed, Input } from 'semantic-ui-react'
// Page titie
import {  Checkbox, Table } from 'semantic-ui-react'


const Widget = () => {
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
          <Label as='a' color='black' ribbon>
                  <b>Physical Examination</b>
              </Label>
            <Segment>
            <div className="input-group input-group-sm mb-3">
                 
                 <span className="input-group-text">Encounter Date</span>
              
               <input type="date" className="form-control" />
             </div>
              <br/>
              <div className="input-group input-group-sm mb-3">
                 
                 <span className="input-group-text">Visit Note</span>
              
                 <textarea className="form-control"></textarea>
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
                <Table.Row>
                  <Table.Cell><Input type="text" fluid  placeholder='Encounter Date' /></Table.Cell>
                  <Table.Cell><Input type="text" fluid  placeholder='Encounter Date' /></Table.Cell>
                  <Table.Cell><Input type="date" fluid  placeholder='Encounter Date' /></Table.Cell>
                  <Table.Cell><Input type="date" fluid  placeholder='Encounter Date' /></Table.Cell>
                </Table.Row>
               
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell>
                  
                  <Label as='a' color="blue" size="tiny">
                    <Icon name='plus' /> Add More
                  </Label>
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
                  <Table.HeaderCell>	Order</Table.HeaderCell>
                  <Table.HeaderCell>Certainty</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell><Input type="text" fluid  placeholder='Encounter Date' /></Table.Cell>
                  <Table.Cell><Input type="text" fluid  placeholder='Encounter Date' /></Table.Cell>
                  <Table.Cell><Input type="date" fluid  placeholder='Encounter Date' /></Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
               
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell>
                  
                  <Label as='a' color="blue" size="tiny">
                    <Icon name='plus' /> Add More
                  </Label>
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
