package org.lamisplus.modules.consultation.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.lamisplus.modules.consultation.domain.entity.Diagnosis;
import org.lamisplus.modules.consultation.domain.entity.PresentingComplaint;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ConsultationDTO {
    private int id;
    private int visitId;
    private int patientId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime encounterDate;
    private String visitNotes;
    private List<PresentingComplaint> presentingComplaints;
    private List<Diagnosis> diagnosisList;
}
