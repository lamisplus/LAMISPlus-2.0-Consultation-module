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
                  Vital
                </Label>
                  <span>Recent Vitals</span>
                  <br/>
                  <List>
                  <List.Item><Button
                      color='red'
                      size='mini'
                      content='BloodType'
                      style={{height: '25px' }}
                      //icon='heart'
                      label={{ basic: true, color: 'red', pointing: 'left', content: 'AB+' }}
                    /></List.Item>
                  <List.Item><Button
                        basic
                        color='blue'
                        content='Height'
                        size='mini'
                        icon='fork'
                        style={{height: '25px' }}
                        label={{
                            as: 'a',
                            basic: true,
                            color: 'blue',
                            pointing: 'left',
                            content: '74.5 in',
                        }}
                      /> </List.Item>
                  <List.Item>
                    <Button
                        basic
                        color='blue'
                        size='mini'
                        content='Weight'
                        style={{height: '25px' }}
                        icon='fork'
                        label={{
                            as: 'a',
                            basic: true,
                            color: 'blue',
                            pointing: 'left',
                            content: '74.5 in',
                        }}
                        />
                  </List.Item>
                  <List.Item>
                    <Button
                        basic
                        color='blue'
                        size='mini'
                        style={{height: '25px' }}
                        content='Weight'
                        icon='fork'
                        label={{
                            as: 'a',
                            basic: true,
                            color: 'blue',
                            pointing: 'left',
                            content: '74.5 in',
                        }}
                        />
                  </List.Item>
                  <List.Item>
                    <Button
                        basic
                        color='blue'
                        size='mini'
                        style={{height: '25px' }}
                        content='Temperature'
                        icon='fork'
                        label={{
                            as: 'a',
                            basic: true,
                            color: 'blue',
                            pointing: 'left',
                            content: '74.5 in',
                        }}
                        />
                  </List.Item>
                  <List.Item>
                    <Button
                        basic
                        style={{height: '25px' }}
                        color='blue'
                        size='mini'
                        content='Pulse'
                        icon='fork'
                        label={{
                            as: 'a',
                            basic: true,
                            color: 'blue',
                            pointing: 'left',
                            content: '74.5 in',
                        }}
                        />
                  </List.Item>
                  <List.Item>
                    <Button
                        basic
                        color='blue'
                        size='mini'
                        style={{height: '25px' }}
                        content='Respiratory Rate'
                        icon='fork'
                        label={{
                            as: 'a',
                            basic: true,
                            color: 'blue',
                            pointing: 'left',
                            content: '74.5 in',
                        }}
                        />
                  </List.Item>
                  <List.Item>
                    <Button
                        basic
                        color='red'
                        size='mini'
                        style={{height: '25px' }}
                        content='Blood Presure'
                        icon='fork'
                        label={{
                            as: 'a',
                            basic: true,
                            color: 'red',
                            pointing: 'left',
                            content: '74.5 in',
                        }}
                        />
                  </List.Item>
                  <List.Item>
                    <Button
                        basic
                        color='red'
                        size='mini'
                        style={{height: '25px' }}
                        content='Arterial Blood Oxyl'
                        icon='fork'
                        label={{
                            as: 'a',
                            basic: true,
                            color: 'red',
                            pointing: 'left',
                            content: '74.5 in',
                        }}
                        />
                  </List.Item>
                </List>

            </Segment>
            <Segment>
               
                <Label as='a' color='black' ribbon>
                  Conditions
                </Label>
                <br/>
                <Label as='a'  color='grey' pointing>
                  Laser Fever
                </Label>
                <Label as='a'  color='grey' pointing>
                  Typoid Fever
                </Label>
                <Label as='a'  color='grey' pointing>
                 Asthma
                </Label>

            </Segment>
            <Segment>
                <Label as='a' color='red' ribbon>
                  Allergies
                </Label>
                  <br/><br/>
                  <Label.Group color='blue'>
                    <Label as='a'>
                      Malaria
                      <Icon name='close' />
                    </Label>
                    <Label as='a'>
                      cold
                     
                    </Label>
                    <Label as='a'>dust</Label>
                    <Label as='a'>smoke</Label>
                    <Label as='a'>water</Label>
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
                  <Feed.Label image='/images/avatar/small/jenny.jpg' />
                  <Feed.Content>
                    <Feed.Date content='1 day ago' />
                    <Feed.Summary>
                      You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Label image='/images/avatar/small/molly.png' />
                  <Feed.Content>
                    <Feed.Date content='3 days ago' />
                    <Feed.Summary>
                      You added <a>Molly Malone</a> as a friend.
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Label image='/images/avatar/small/elliot.jpg' />
                  <Feed.Content>
                    <Feed.Date content='4 days ago' />
                    <Feed.Summary>
                      You added <a>Elliot Baker</a> to your <a>musicians</a> group.
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
