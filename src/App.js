import React from "react";
import {
  MemoryRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./main/webapp/vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./../src/main/webapp/css/style.css";

import Home from './main/webapp/jsx/components/Home';
import PatientDetail from './main/webapp/jsx/components/Patient/PatientDetail';
import PatientConsultationHistory from './main/webapp/jsx/components/History/PatientConsultationHistory';
import ViewPatientHistory from './main/webapp/jsx/components/History/ViewPatientHistory'

export default function App() {
  return (

      <div>
      <ToastContainer />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
         <Route path="/patient-consultation">
           <ViewPatientHistory/>
         </Route>

          <Route path="/patient-consultations-history">
            <PatientConsultationHistory />
          </Route>

          <Route path="/patient-history">
            <PatientDetail />
          </Route>
          {/* 
          <Route path="/edit-patient">
            <EditPatient />
          </Route> */}
          <Route path="/">
            <Home />
          </Route>
        
          
        </Switch>
      </div>
 
  );
}




