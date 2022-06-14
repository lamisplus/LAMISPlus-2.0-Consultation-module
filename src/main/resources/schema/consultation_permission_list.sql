INSERT INTO permission (id, description, name, date_created, created_by, date_modified, modified_by, archived)
VALUES ((SELECT MAX(id) + 1 FROM permission), 'Create Consultation', 'create_consultation', current_timestamp, 'Kennedy', current_timestamp, 'Kennedy', 0);
		
INSERT INTO permission (id, description, name, date_created, created_by, date_modified, modified_by, archived)
VALUES ((SELECT MAX(id) + 1 FROM permission), 'Edit Consultation', 'edit_consultation', current_timestamp, 'Kennedy', current_timestamp, 'Kennedy', 0);
		
INSERT INTO permission (id, description, name, date_created, created_by, date_modified, modified_by, archived)
VALUES ((SELECT MAX(id) + 1 FROM permission), 'View Consultation', 'view_consultation', current_timestamp, 'Kennedy', current_timestamp, 'Kennedy', 0);
		
INSERT INTO permission (id, description, name, date_created, created_by, date_modified, modified_by, archived)
VALUES ((SELECT MAX(id) + 1 FROM permission), 'Delete Consultation', 'delete_consultation', current_timestamp, 'Kennedy', current_timestamp, 'Kennedy', 0);
		
INSERT INTO permission (id, description, name, date_created, created_by, date_modified, modified_by, archived)
VALUES ((SELECT MAX(id) + 1 FROM permission), 'Lab Test Order', 'lab_test_order', current_timestamp, 'Kennedy', current_timestamp, 'Kennedy', 0);
		
INSERT INTO permission (id, description, name, date_created, created_by, date_modified, modified_by, archived)
VALUES ((SELECT MAX(id) + 1 FROM permission), 'Pharmacy Order', 'pharmacy_order', current_timestamp, 'Kennedy', current_timestamp, 'Kennedy', 0);
