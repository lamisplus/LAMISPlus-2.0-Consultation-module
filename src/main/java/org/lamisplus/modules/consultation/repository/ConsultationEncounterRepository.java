package org.lamisplus.modules.consultation.repository;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.consultation.domain.entity.Diagnosis;
import org.lamisplus.modules.consultation.domain.entity.ConsultationEncounter;
import org.lamisplus.modules.consultation.domain.entity.PresentingComplaint;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@RequiredArgsConstructor
public class ConsultationEncounterRepository {
    private final JdbcTemplate jdbcTemplate;

    public ConsultationEncounter Save(ConsultationEncounter encounter) {
        String uuid = UUID.randomUUID().toString();

        jdbcTemplate.update("INSERT INTO consultation_encounter (uuid, patient_id, encounter_date, visit_notes) " +
                        "VALUES (?, ?, ?, ?)",
                uuid,
                encounter.getPatient_id(),
                encounter.getEncounter_date(),
                encounter.getVisit_notes()
        );

        ConsultationEncounter saved_encounter = findEncounterByUUID(uuid).orElse(null);

        for(PresentingComplaint presentingComplaint : encounter.getPresentingComplaints()) {
            SaveComplaint(presentingComplaint, saved_encounter.getId());
        }

        for(Diagnosis diagnosis : encounter.getDiagnosisList()) {
            SaveDiagnosis(diagnosis, saved_encounter.getId());
        }

        List<PresentingComplaint> presentingComplaints = findComplaintsByEncounterId(saved_encounter.getId());
        List<Diagnosis> diagnosisList = findDiagnosisByEncounterId(saved_encounter.getId());
        saved_encounter.setPresentingComplaints(presentingComplaints);
        saved_encounter.setDiagnosisList(diagnosisList);

        return saved_encounter;
    }

    public PresentingComplaint SaveComplaint(PresentingComplaint complaint, int encounter_id){
        String uuid = UUID.randomUUID().toString();

        jdbcTemplate.update("INSERT INTO consultation_complaint (uuid, complaint, onset_date, severity, date_resolved, encounter_id) " +
                        "VALUES (?, ?, ?, ?, ?, ?) ",
                uuid,
                complaint.getComplaint(),
                complaint.getOnset_date(),
                complaint.getSeverity(),
                complaint.getDate_resolved(),
                encounter_id
        );

        return findComplaintByUUID(uuid).orElse(null);
    }

    public Diagnosis SaveDiagnosis(Diagnosis diagnosis, int encounter_id){
        String uuid = UUID.randomUUID().toString();

        jdbcTemplate.update("INSERT INTO consultation_diagnosis (uuid, diagnosis, diagnosis_order, certainty, encounter_id) " +
                        "VALUES (?, ?, ?, ?, ?) ",
                uuid,
                diagnosis.getCondition(),
                diagnosis.getDiagnosis_order(),
                diagnosis.getCertainty(),
                encounter_id
        );

        return findDiagnosisByUUID(uuid).orElse(null);
    }

    public ConsultationEncounter Update(int encounter_id, ConsultationEncounter encounter) {
        jdbcTemplate.update("update consultation_encounter set patient_id=?, encounter_date=?, visit_notes=? " +
                        "where id=? ",
                encounter.getPatient_id(),
                encounter.getEncounter_date(),
                encounter.getVisit_notes(),
                encounter_id
        );

        jdbcTemplate.update("delete from consultation_complaint where encounter_id=? ", encounter_id);
        jdbcTemplate.update("delete from consultation_diagnosis where encounter_id=? ", encounter_id);

        for(PresentingComplaint presentingComplaint : encounter.getPresentingComplaints()) {
            SaveComplaint(presentingComplaint, encounter_id);
        }

        for(Diagnosis diagnosis : encounter.getDiagnosisList()) {
            SaveDiagnosis(diagnosis, encounter_id);
        }

        ConsultationEncounter updated_encounter = findEncounterByUUID(encounter.getUuid()).orElse(null);
        assert updated_encounter != null;

        List<PresentingComplaint> presentingComplaints = findComplaintsByEncounterId(updated_encounter.getId());
        List<Diagnosis> diagnosisList = findDiagnosisByEncounterId(updated_encounter.getId());

        updated_encounter.setPresentingComplaints(presentingComplaints);
        updated_encounter.setDiagnosisList(diagnosisList);

        return updated_encounter;
    }

    public String Delete(int id){
        jdbcTemplate.update("delete from consultation_encounter where encounter_id=? ", id);
        jdbcTemplate.update("delete from consultation_diagnosis where encounter_id=? ", id);
        return id + " deleted successfully";
    }

    public List<ConsultationEncounter> findEncounterByPatientId(int patient_id) {
        List<ConsultationEncounter> encounters =  jdbcTemplate.query("SELECT * FROM consultation_encounter where patient_id = ? ",
                new BeanPropertyRowMapper<ConsultationEncounter>(ConsultationEncounter.class), patient_id);

        for(ConsultationEncounter encounter : encounters) {
            List<PresentingComplaint> presentingComplaints = findComplaintsByEncounterId(encounter.getId());
            List<Diagnosis> diagnosisList = findDiagnosisByEncounterId(encounter.getId());
            encounter.setPresentingComplaints(presentingComplaints);
            encounter.setDiagnosisList(diagnosisList);
        }

        return encounters;
    }

    public List<PresentingComplaint> findComplaintsByEncounterId(int encounter_id) {
        return jdbcTemplate.query("SELECT * FROM consultation_complaints where encounter_id = ? ",
                new BeanPropertyRowMapper<PresentingComplaint>(PresentingComplaint.class), encounter_id);
    }

    public List<Diagnosis> findDiagnosisByEncounterId(int encounter_id) {
        return jdbcTemplate.query("SELECT * FROM consultation_diagnosis where encounter_id = ? ",
                new BeanPropertyRowMapper<Diagnosis>(Diagnosis.class), encounter_id);
    }

    public Optional<ConsultationEncounter> findEncounterByUUID(String uuid) {
        return jdbcTemplate.query("SELECT * FROM consultation_encounter where uuid = ? ",
                new BeanPropertyRowMapper<ConsultationEncounter>(ConsultationEncounter.class), uuid).stream().findFirst();
    }

    public Optional<PresentingComplaint> findComplaintByUUID(String uuid) {
        return jdbcTemplate.query("SELECT * FROM consultation_complaint where uuid = ? ",
                new BeanPropertyRowMapper<PresentingComplaint>(PresentingComplaint.class), uuid).stream().findFirst();
    }

    public Optional<Diagnosis> findDiagnosisByUUID(String uuid) {
        return jdbcTemplate.query("SELECT * FROM consultation_diagnosis where uuid = ? ",
                new BeanPropertyRowMapper<Diagnosis>(Diagnosis.class), uuid).stream().findFirst();
    }
}
