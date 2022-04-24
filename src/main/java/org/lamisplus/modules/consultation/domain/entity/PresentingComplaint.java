package org.lamisplus.modules.consultation.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PresentingComplaint {
    @Id
    @GeneratedValue

    private int id;
    private String complaint;
    private LocalDate onset_date;
    private int severity;
    private LocalDate date_resolved;
}
