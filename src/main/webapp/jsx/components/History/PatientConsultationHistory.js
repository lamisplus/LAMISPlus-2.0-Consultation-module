import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import MaterialTable from 'material-table';
import axios from "axios";
import {token, url as baseUrl} from "../../../api";
import { forwardRef } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom'
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles'
import "@reach/menu-button/styles.css";
import ButtonMui from "@material-ui/core/Button";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    cardBottom: {
        marginBottom: 20
    },
    Select: {
        height: 45,
        width: 350
    },
    button: {
        margin: theme.spacing(1)
    },

    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    input: {
        display: 'none'
    },
    error: {
        color: "#f85032",
        fontSize: "11px",
    },
    success: {
        color: "#4BB543 ",
        fontSize: "11px",
    },
}));

const PatientConsultationHistory = (props) => {
    let history = useHistory();
    const [patientList, setPatientList] = useState([]);
    const patientObj = history.location && history.location.state ? history.location.state.patientObj : {};

    ///GET LIST OF Patients
    const patientConsultations = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}consultations/consultations-by-patient-id/${patientObj.id}`, {headers: {"Authorization": `Bearer ${token}`}});
            setPatientList(response.data);
        } catch (e) {
            
        }

    }, []);

    useEffect(() => {
        patientConsultations()
    }, [patientConsultations]);

    return (
        <div>
            <br/><br/>
            <Link to={"/"} >
                <ButtonMui
                    variant="contained"
                    color="primary"
                    className=" float-end ms-2"

                >
                    <span style={{ textTransform: "capitalize" }}>Back</span>
                </ButtonMui>

            </Link>
            <br/><br/>


            <MaterialTable
                icons={tableIcons}
                title="Patient Consultations"
                columns={[
                    // { title: " ID", field: "Id" },
                    {
                        title: "Encounter Date",
                        field: "date",
                    },
                    { title: "Visit Notes", field: "visitNotes", filtering: false },
                ]}
                data={ patientList.map((row) => ({
                    //Id: manager.id,
                    date:row.encounterDate,
                    visitNotes:row.visitNotes,
                }))}

                options={{
                    headerStyle: {
                        //backgroundColor: "#9F9FA5",
                        color: "#000",
                    },
                    searchFieldStyle: {
                        width : '200%',
                        margingLeft: '250px',
                    },
                    filtering: false,
                    exportButton: false,
                    searchFieldAlignment: 'left',
                    pageSizeOptions:[10,20,100],
                    pageSize:10,
                    debounceInterval: 400
                }}
            />
        </div>
    );
};

export default PatientConsultationHistory;
