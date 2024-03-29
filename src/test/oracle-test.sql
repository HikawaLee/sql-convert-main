-------------------------Drop Columns--------------------------------
CREATE TABLE suppliers (
                           supplier_id NUMBER GENERATED BY DEFAULT AS IDENTITY,
                           contact_name VARCHAR2(255) NOT NULL,
                           company_name VARCHAR2(255),
                           phone VARCHAR2(100) NOT NULL,
                           email VARCHAR2(255) NOT NULL,
                           fax VARCHAR2(100) NOT NULL,
                           PRIMARY KEY(supplier_id)
);

INSERT INTO suppliers (contact_name,company_name,phone,email,fax)
VALUES ('Solomon F. Zamora',
        'Elit LLP',
        '1-245-616-6781',
        'enim.condimentum@pellentesqueeget.org',
        '1-593-653-6421');


INSERT INTO suppliers (contact_name,company_name,phone,email,fax)
VALUES ('Haley Franco',
        'Ante Vivamus Limited',
        '1-754-597-2827',
        'Nunc@ac.com',
        '1-167-362-9592');


INSERT INTO suppliers (contact_name,company_name,phone,email,fax)
VALUES ('Gail X. Tyson',
        'Vulputate Velit Eu Inc.',
        '1-331-448-8406',
        'sem@gravidasit.edu',
        '1-886-556-8494');


INSERT INTO suppliers (contact_name,company_name,phone,email,fax)
VALUES ('Alec N. Strickland',
        'In At Associates',
        '1-467-132-4527',
        'Lorem@sedtortor.com',
        '1-735-818-0914');


INSERT INTO suppliers (contact_name,company_name,phone,email,fax)
VALUES ('Britanni Holt',
        'Magna Cras Convallis Corp.',
        '1-842-554-5106',
        'varius@seddictumeleifend.ca',
        '1-381-532-1632');


INSERT INTO suppliers (contact_name,company_name,phone,email,fax)
VALUES ('Audra O. Ingram',
        'Commodo LLP',
        '1-934-490-5667',
        'dictum.augue.malesuada@idmagnaet.net',
        '1-225-217-4699');


INSERT INTO suppliers (contact_name,company_name,phone,email,fax)
VALUES ('Cody K. Chapman',
        'Tempor Arcu Inc.',
        '1-349-383-6623',
        'non.arcu.Vivamus@rutrumnon.co.uk',
        '1-824-229-3521');


INSERT INTO suppliers (contact_name,company_name,phone,email,fax)
VALUES ('Tobias Merritt',
        'Amet Risus Company',
        '1-457-675-2547',
        'felis@ut.net',
        '1-404-101-9940');


INSERT INTO suppliers (contact_name,company_name,phone,email,fax)
VALUES ('Ryder G. Vega',
        'Massa LLC',
        '1-655-465-4319',
        'dui.nec@convalliserateget.co.uk',
        '1-282-381-9477');


INSERT INTO suppliers (contact_name,company_name,phone,email,fax)
VALUES ('Arthur Woods',
        'Donec Elementum Lorem Foundation',
        '1-406-810-9583',
        'eros.turpis.non@anteMaecenasmi.co.uk',
        '1-462-765-8157');


INSERT INTO suppliers (contact_name,company_name,phone,email,fax)
VALUES ('Lael Snider',
        'Ultricies Adipiscing Enim Corporation',
        '1-252-634-4780',
        'natoque.penatibus@in.com',
        '1-986-508-6373');



-- Dropping a Column from a Table By Unused Column
--1. First, mark it as unused:
ALTER TABLE suppliers
    SET UNUSED COLUMN fax;
-- view the number of unused columns per table from the DBA_UNUSED_COL_TABS view
-- SELECT
--     *
-- FROM
--     DBA_UNUSED_COL_TABS;

--2. during off-peak hours, physically drop the unused columns:
ALTER TABLE suppliers DROP UNUSED COLUMNS;
--3.  use the CHECKPOINT option to force a checkpoint after processing a specified number of rows
ALTER TABLE suppliers MODIFY (phone VARCHAR2(100) NOT NULL) CHECKPOINT 1000;

-- Dropping a Column from a Table By Dropping the Column
ALTER TABLE
    suppliers
DROP (
        email,
        phone
    );



--------------------------------- ADD Column --------------------------------------

CREATE TABLE members(
                        member_id NUMBER GENERATED BY DEFAULT AS IDENTITY,
                        first_name VARCHAR2(50),
                        last_name VARCHAR2(50),
                        PRIMARY KEY(member_id)
);

ALTER TABLE members
    ADD birth_date DATE NOT NULL;


ALTER TABLE
    members ADD(
        created_at TIMESTAMP WITH TIME ZONE NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL
    );


SET SERVEROUTPUT ON SIZE 1000000
DECLARE
v_col_exists NUMBER
BEGIN
SELECT count(*) INTO v_col_exists
FROM user_tab_cols
WHERE column_name = 'EFFECTIVE_DATE'
  AND table_name = 'MEMBERS';

IF (v_col_exists = 0) THEN
      EXECUTE IMMEDIATE 'ALTER TABLE members ADD effective_date DATE';
ELSE
    DBMS_OUTPUT.PUT_LINE('The column effective_date already exists');
END IF;
END;
/


--------------------------------- Modify Column --------------------------------------
CREATE TABLE accounts (
                          account_id NUMBER GENERATED BY DEFAULT AS IDENTITY,
                          first_name VARCHAR2(25) NOT NULL,
                          last_name VARCHAR2(25) NOT NULL,
                          email VARCHAR2(100),
                          phone VARCHAR2(12) ,
                          full_name VARCHAR2(51) GENERATED ALWAYS AS(
                              first_name || ' ' || last_name
                              ),
                          PRIMARY KEY(account_id)
);


INSERT INTO accounts(first_name,last_name,phone)
VALUES('Trinity',
       'Knox',
       '410-555-0197');


INSERT INTO accounts(first_name,last_name,phone)
VALUES('Mellissa',
       'Porter',
       '410-555-0198');


INSERT INTO accounts(first_name,last_name,phone)
VALUES('Leeanna',
       'Bowman',
       '410-555-0199');

-- Modify the column’s visibility
ALTER TABLE accounts
    MODIFY full_name INVISIBLE;
ALTER TABLE accounts
    MODIFY full_name VISIBLE;
-- Allow or not allow null values

---Because when you change a column from nullable to non-nullable,
-- you must ensure that the existing data meets the new constraint.
UPDATE
    accounts
SET
    email = LOWER(first_name || '.' || last_name || '@oracletutorial.com') ;


ALTER TABLE accounts
    MODIFY email VARCHAR2( 100 ) NOT NULL;
-- Shorten or widen the size of the column
ALTER TABLE accounts
    MODIFY phone VARCHAR2( 15 );

-- Change the default value of a column
ALTER TABLE accounts
    ADD status NUMBER( 1, 0 ) DEFAULT 1 NOT NULL ;
-- possible error: SQL Error: ORA-01441: cannot decrease column length because some  value is too big

UPDATE
    accounts
SET
    phone = REPLACE(
            phone,
            '+1-',
            ''
            );
ALTER TABLE accounts
    MODIFY phone VARCHAR2( 12 );


-- Modify the expression of the virtual columns
ALTER TABLE accounts
    MODIFY full_name VARCHAR2(52)
    GENERATED ALWAYS AS (last_name || ', ' || first_name);


-- ---Oracle却不允许用户修改列的名称。如果需要修改列的名称，需要采取其他的方式，
-- -- 如将现有列的数据复制到新列，然后删除旧列
-- ALTER TABLE employees ADD (new_name VARCHAR2(50));
-- UPDATE employees SET new_name = old_name;
-- ALTER TABLE employees DROP COLUMN old_name;
-- ALTER TABLE your_table
--     ADD new_length NUMBER; -- Modify the data type as needed
-- UPDATE your_table
-- SET new_length = length; -- Assuming 'length' is the old column name
-- ALTER TABLE your_table
-- DROP COLUMN length;



-- -- Rename a column
RENAME COLUMN table-Name.simple-Column-Name TO simple-Column-Name



---------------------------------------- Rename TableName --------------------------------------

RENAME old_table_name TO new_table_name;

CREATE TABLE promotions(
                           promotion_id NUMBER GENERATED BY DEFAULT AS IDENTITY,
                           promotion_name varchar2(255),
                           start_date DATE NOT NULL,
                           end_date DATE NOT NULL,
                           PRIMARY KEY(promotion_id),
                           CHECK (end_date > start_date)
);

CREATE OR REPLACE FUNCTION count_promotions
  RETURN NUMBER
IS
  v_count NUMBER;
BEGIN
SELECT
    COUNT( * )
INTO
    v_count
FROM
    promotions;
RETURN v_count;
END;

--Oracle transferred all indexes, constraints, and grants from the promotions table to the campaigns table.
RENAME promotions TO campaigns;

SELECT
    constraint_name,
    search_condition
FROM
    all_constraints
WHERE
    table_name = 'CAMPAIGNS'
  AND constraint_type = 'C';

--Since the count_promotions function references the old promotions table, it becomes invalid after renaming.
--To find invalid objects in the current schema, query the all_objects view:
SELECT
    owner,
    object_type,
    object_name
FROM
    all_objects
WHERE
    status = 'INVALID'
ORDER BY
    object_type,
    object_name;

-----------------------------create index-------------------------------
CREATE INDEX index_name ON table_name(column1[, column2, ...]);


CREATE TABLE members(
                        member_id INT GENERATED BY DEFAULT AS IDENTITY,
                        first_name VARCHAR2(100) NOT NULL,
                        last_name VARCHAR2(100) NOT NULL,
                        gender CHAR(1) NOT NULL,
                        dob DATE NOT NULL,
                        email VARCHAR2(255) NOT NULL,
                        PRIMARY KEY(member_id)
);

INSERT INTO members (member_id, first_name, last_name, gender, email, dob) VALUES (1, 'Pepi', 'Elce', 'F', 'pelce0@trellian.com', DATE '1984-03-04');
INSERT INTO members (member_id, first_name, last_name, gender, email, dob) VALUES (2, 'Barr', 'Wabersich', 'M', 'bwabersich1@china.com.cn', DATE '1976-08-04');
INSERT INTO members (member_id, first_name, last_name, gender, email, dob) VALUES (3, 'Gretal', 'Grassick', 'F', 'ggrassick2@deliciousdays.com', DATE '1984-08-15');
INSERT INTO members (member_id, first_name, last_name, gender, email, dob) VALUES (4, 'Byron', 'Angeli', 'M', 'bangeli3@globo.com', DATE '1996-05-24');
INSERT INTO members (member_id, first_name, last_name, gender, email, dob) VALUES (5, 'Birch', 'Vickar', 'M', 'bvickar4@harvard.edu', DATE '1972-09-28');
INSERT INTO members (member_id, first_name, last_name, gender, email, dob) VALUES (6, 'Romy', 'Torvey', 'F', 'rtorvey5@google.com.hk', DATE '1979-01-19');

--To view all indexes of a table, you query from the all_indexes view:
SELECT
    index_name,
    index_type,
    visibility,
    status
FROM
    all_indexes
WHERE
    table_name = 'MEMBERS';


CREATE INDEX members_last_name_i
    ON members(last_name);


CREATE INDEX members_name_i
    ON members(last_name,first_name);

--check if a query uses the index for lookup or not

--add the EXPLAIN PLAN FOR clause immediately before the SQL statement:
EXPLAIN PLAN FOR
SELECT * FROM members
WHERE last_name = 'Harse';

--use the DBMS_XPLAN.DISPLAY() procedure to show the content of the plan_table:
SELECT
    PLAN_TABLE_OUTPUT
FROM
    TABLE(DBMS_XPLAN.DISPLAY());

-------CREATE UNIQUE INDEX index_name ON
table_name(column1[,column2,...]);



---------------------------------DROP INDEX [schema_name.]index_name;-----------------------
DROP INDEX [schema_name.]index_name;

--Oracle does not provide the IF EXISTS option to drop an index conditionally.
--To achieve this effect, you can use the following PL/SQL anonymous block:
DECLARE
COUNT_INDEXES   INTEGER;
BEGIN
SELECT COUNT ( * )
INTO COUNT_INDEXES
FROM USER_INDEXES
WHERE INDEX_NAME = 'myIndexName';
-- Edited by UltraCommit, October 1st, 2019
-- Accepted answer has a race condition.
-- The index could have been dropped between the line that checks the count
-- and the execute immediate
IF COUNT_INDEXES > 0
   THEN
      EXECUTE IMMEDIATE 'DROP INDEX myIndexName';
END IF;
END;
/
