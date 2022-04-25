package org.lamisplus.modules.consultation.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ConsultationEncounter {
    @Id
    @GeneratedValue

    private int id;
    private String uuid;
    private int patient_id;
    private LocalDate encounter_date;
    private String visit_notes;
    private List<PresentingComplaint> presentingComplaints;
    private List<Diagnosis> diagnosisList;
}
