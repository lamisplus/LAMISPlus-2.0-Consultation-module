--consultation_encounter
CREATE SEQUENCE consultation_encounter_id_seq;
CREATE TABLE public.consultation_encounter
(
    id bigint NOT NULL DEFAULT nextval('consultation_encounter_id_seq'),
    uuid character varying(100),
    patient_id integer,
	encounter date, 
	visit_notes character varying(3000),
    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.consultation_encounter OWNER to postgres;	
ALTER SEQUENCE consultation_encounter_id_seq OWNED BY consultation_encounter.id;


--consultation_complaint
CREATE SEQUENCE consultation_complaint_id_seq;
CREATE TABLE public.consultation_complaint
(
    id bigint NOT NULL DEFAULT nextval('consultation_complaint_id_seq'),
    uuid character varying(100),
    complaint character varying(300),
	onset_date date, 
	visit_notes character varying(3000),
	severity integer,
	date_resolved date,
	encounter_id integer,
    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.consultation_complaint OWNER to postgres;	
ALTER SEQUENCE consultation_complaint_id_seq OWNED BY consultation_complaint.id;


--consultation_diagnosis
CREATE SEQUENCE consultation_diagnosis_id_seq;
CREATE TABLE public.consultation_diagnosis
(
    id bigint NOT NULL DEFAULT nextval('consultation_diagnosis_id_seq'),
    uuid character varying(100),
    diagnosis character varying(300),
	diagnosis_order integer,
	certainty integer,
	encounter_id integer,
    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.consultation_diagnosis OWNER to postgres;	
ALTER SEQUENCE consultation_diagnosis_id_seq OWNED BY consultation_diagnosis.id;


SELECT setval('application_codeset_id_seq1', (SELECT MAX(id) FROM application_codeset)+1);

insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('COMPLAINT_SEVERITY', '1', 'en', 1, gen_random_uuid(), '2022-04-25', '');
insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('COMPLAINT_SEVERITY', '2', 'en', 1, gen_random_uuid(), '2022-04-25', '');
insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('COMPLAINT_SEVERITY', '3', 'en', 1, gen_random_uuid(), '2022-04-25', '');
insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('COMPLAINT_SEVERITY', '4', 'en', 1, gen_random_uuid(), '2022-04-25', '');
insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('COMPLAINT_SEVERITY', '5', 'en', 1, gen_random_uuid(), '2022-04-25', '');
insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('COMPLAINT_SEVERITY', '6', 'en', 1, gen_random_uuid(), '2022-04-25', '');
insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('COMPLAINT_SEVERITY', '7', 'en', 1, gen_random_uuid(), '2022-04-25', '');
insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('COMPLAINT_SEVERITY', '8', 'en', 1, gen_random_uuid(), '2022-04-25', '');
insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('COMPLAINT_SEVERITY', '9', 'en', 1, gen_random_uuid(), '2022-04-25', '');
insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('COMPLAINT_SEVERITY', '10', 'en', 1, gen_random_uuid(), '2022-04-25', '');

insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('DIAGNOSIS_ORDER', 'Primary', 'en', 1, gen_random_uuid(), '2022-04-25', '');
insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('DIAGNOSIS_ORDER', 'Secondary', 'en', 1, gen_random_uuid(), '2022-04-25', '');

insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('DIAGNOSIS_CERTAINTY', 'Presumed', 'en', 1, gen_random_uuid(), '2022-04-25', '');
insert into application_codeset(codeset_group, display, language, version, code, date_created, created_by) values('DIAGNOSIS_CERTAINTY', 'Confirmed', 'en', 1, gen_random_uuid(), '2022-04-25', '');
