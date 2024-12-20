CREATE DATABASE IF NOT EXISTS insidertracker;

USE insidertracker;


CREATE TABLE SUBMISSION (
                            ACCESSION_NUMBER VARCHAR(25) NOT NULL PRIMARY KEY,
                            FILING_DATE VARCHAR(15) NOT NULL,
                            PERIOD_OF_REPORT VARCHAR(15) NOT NULL,
                            DATE_OF_ORIG_SUB VARCHAR(15) NULL,
                            NO_SECURITIES_OWNED VARCHAR(1) NULL,
                            NOT_SUBJECT_SEC16 VARCHAR(1) NULL,
                            FORM3_HOLDING_REPORTED VARCHAR(1) NULL,
                            FORM4_TRANS_REPORTED VARCHAR(1) NULL,
                            DOCUMENT_TYPE VARCHAR(20) NOT NULL,
                            ISSUERCIK VARCHAR(10) NOT NULL,
                            ISSUERNAME VARCHAR(150) NOT NULL,
                            ISSUERTRADINGSYMBOL VARCHAR(10) NOT NULL,
                            REMARKS VARCHAR(2000) NULL
);

CREATE TABLE REPORTINGOWNER (
                                ACCESSION_NUMBER VARCHAR(25) NOT NULL,
                                RPTOWNERCIK VARCHAR(10) NOT NULL,
                                RPTOWNERNAME VARCHAR(150) NOT NULL,
                                RPTOWNER_RELATIONSHIP VARCHAR(100) NOT NULL,
                                RPTOWNER_TITLE VARCHAR(150) NULL,
                                RPTOWNER_TXT VARCHAR(50) NULL,
                                RPTOWNER_STREET1 VARCHAR(150) NOT NULL,
                                RPTOWNER_STREET2 VARCHAR(150) NULL,
                                RPTOWNER_CITY VARCHAR(150) NOT NULL,
                                RPTOWNER_STATE VARCHAR(2) NOT NULL,
                                RPTOWNER_ZIPCODE VARCHAR(10) NOT NULL,
                                RPTOWNER_STATE_DESC VARCHAR(150) NULL,
                                FILE_NUMBER VARCHAR(30) NULL,
                                PRIMARY KEY (ACCESSION_NUMBER, RPTOWNERCIK)
);

CREATE TABLE NONDERIV_TRANS (
                                ACCESSION_NUMBER VARCHAR(25) NOT NULL,
                                NONDERIV_TRANS_SK BIGINT NOT NULL PRIMARY KEY,
                                SECURITY_TITLE VARCHAR(60) NOT NULL,
                                SECURITY_TITLE_FN VARCHAR(150) NULL,
                                TRANS_DATE VARCHAR(15) NOT NULL,
                                TRANS_DATE_FN VARCHAR(150) NULL,
                                DEEMED_EXECUTION_DATE VARCHAR(15) NULL,
                                DEEMED_EXECUTION_DATE_FN VARCHAR(150) NULL,
                                TRANS_FORM_TYPE VARCHAR(1) NULL,
                                TRANS_CODE VARCHAR(1) NULL,
                                EQUITY_SWAP_INVOLVED CHAR(1) NULL,
                                EQUITY_SWAP_TRANS_CD_FN VARCHAR(150) NULL,
                                TRANS_TIMELINESS VARCHAR(1) NULL,
                                TRANS_TIMELINESS_FN VARCHAR(150) NULL,
                                TRANS_SHARES DECIMAL(16,2) NULL,
                                TRANS_SHARES_FN VARCHAR(150) NULL,
                                TRANS_PRICEPERSHARE DECIMAL(16,2) NULL,
                                TRANS_PRICEPERSHARE_FN VARCHAR(150) NULL,
                                TRANS_ACQUIRED_DISP_CD VARCHAR(1) NOT NULL,
                                TRANS_ACQUIRED_DISP_CD_FN VARCHAR(150) NULL,
                                SHRS_OWND_FOLWNG_TRANS DECIMAL(16,2) NULL,
                                SHRS_OWND_FOLWNG_TRANS_FN VARCHAR(150) NULL,
                                VALU_OWND_FOLWNG_TRANS DECIMAL(16,2) NULL,
                                VALU_OWND_FOLWNG_TRANS_FN VARCHAR(150) NULL,
                                DIRECT_INDIRECT_OWNERSHIP VARCHAR(5) NOT NULL,
                                DIRECT_INDIRECT_OWNERSHIP_FN VARCHAR(150) NULL,
                                NATURE_OF_OWNERSHIP VARCHAR(100) NULL,
                                NATURE_OF_OWNERSHIP_FN VARCHAR(150) NULL
);

CREATE TABLE NONDERIV_HOLDING (
                                  ACCESSION_NUMBER VARCHAR(25) NOT NULL,
                                  NONDERIV_HOLDING_SK BIGINT NOT NULL PRIMARY KEY,
                                  SECURITY_TITLE VARCHAR(60) NOT NULL,
                                  SECURITY_TITLE_FN VARCHAR(150) NULL,
                                  TRANS_FORM_TYPE VARCHAR(1) NULL,
                                  TRANS_FORM_TYPE_FN VARCHAR(150) NULL,
                                  SHRS_OWND_FOLWNG_TRANS DECIMAL(16,2) NULL,
                                  SHRS_OWND_FOLWNG_TRANS_FN VARCHAR(150) NULL,
                                  VALU_OWND_FOLWNG_TRANS DECIMAL(16,2) NULL,
                                  VALU_OWND_FOLWNG_TRANS_FN VARCHAR(150) NULL,
                                  DIRECT_INDIRECT_OWNERSHIP VARCHAR(5) NOT NULL,
                                  DIRECT_INDIRECT_OWNERSHIP_FN VARCHAR(150) NULL,
                                  NATURE_OF_OWNERSHIP VARCHAR(100) NULL,
                                  NATURE_OF_OWNERSHIP_FN VARCHAR(150) NULL
);

CREATE TABLE DERIV_TRANS (
                             ACCESSION_NUMBER VARCHAR(25) NOT NULL,
                             DERIV_TRANS_SK BIGINT NOT NULL PRIMARY KEY,
                             SECURITY_TITLE VARCHAR(60) NOT NULL,
                             SECURITY_TITLE_FN VARCHAR(150) NULL,
                             CONV_EXERCISE_PRICE DECIMAL(16,2) NULL,
                             CONV_EXERCISE_PRICE_FN VARCHAR(150) NULL,
                             TRANS_DATE VARCHAR(15) NOT NULL,
                             TRANS_DATE_FN VARCHAR(150) NULL,
                             DEEMED_EXECUTION_DATE VARCHAR(15) NULL,
                             DEEMED_EXECUTION_DATE_FN VARCHAR(150) NULL,
                             TRANS_FORM_TYPE VARCHAR(1) NULL,
                             TRANS_CODE VARCHAR(1) NULL,
                             EQUITY_SWAP_INVOLVED CHAR(1) NULL,
                             EQUITY_SWAP_TRANS_CD_FN VARCHAR(150) NULL,
                             TRANS_TIMELINESS VARCHAR(1) NULL,
                             TRANS_TIMELINESS_FN VARCHAR(150) NULL,
                             TRANS_SHARES DECIMAL(16,2) NULL,
                             TRANS_SHARES_FN VARCHAR(150) NULL,
                             TRANS_TOTAL_VALUE DECIMAL(16,2) NULL,
                             TRANS_TOTAL_VALUE_FN VARCHAR(150) NULL,
                             TRANS_PRICEPERSHARE DECIMAL(16,2) NULL,
                             TRANS_PRICEPERSHARE_FN VARCHAR(150) NULL,
                             TRANS_ACQUIRED_DISP_CD VARCHAR(1) NOT NULL,
                             TRANS_ACQUIRED_DISP_CD_FN VARCHAR(150) NULL,
                             EXCERCISE_DATE VARCHAR(15) NULL,
                             EXCERCISE_DATE_FN VARCHAR(150) NULL,
                             EXPIRATION_DATE VARCHAR(15) NULL,
                             EXPIRATION_DATE_FN VARCHAR(150) NULL,
                             UNDLYNG_SEC_TITLE VARCHAR(50) NOT NULL,
                             UNDLYNG_SEC_TITLE_FN VARCHAR(150) NULL,
                             UNDLYNG_SEC_SHARES DECIMAL(16,2) NOT NULL,
                             UNDLYNG_SEC_SHARES_FN VARCHAR(150) NULL,
                             UNDLYNG_SEC_VALUE DECIMAL(16,2) NULL,
                             UNDLYNG_SEC_VALUE_FN VARCHAR(150) NULL,
                             SHRS_OWND_FOLWNG_TRANS DECIMAL(16,2) NULL,
                             SHRS_OWND_FOLWNG_TRANS_FN VARCHAR(150) NULL,
                             VALU_OWND_FOLWNG_TRANS DECIMAL(16,2) NULL,
                             VALU_OWND_FOLWNG_TRANS_FN VARCHAR(150) NULL,
                             DIRECT_INDIRECT_OWNERSHIP VARCHAR(5) NOT NULL,
                             DIRECT_INDIRECT_OWNERSHIP_FN VARCHAR(150) NULL,
                             NATURE_OF_OWNERSHIP VARCHAR(100) NULL,
                             NATURE_OF_OWNERSHIP_FN VARCHAR(150) NULL
);

CREATE TABLE DERIV_HOLDING (
                               ACCESSION_NUMBER VARCHAR(25) NOT NULL,
                               DERIV_HOLDING_SK BIGINT NOT NULL PRIMARY KEY,
                               SECURITY_TITLE VARCHAR(60) NOT NULL,
                               SECURITY_TITLE_FN VARCHAR(150) NULL,
                               CONV_EXERCISE_PRICE DECIMAL(16,2) NULL,
                               CONV_EXERCISE_PRICE_FN VARCHAR(150) NULL,
                               TRANS_FORM_TYPE VARCHAR(1) NULL,
                               TRANS_FORM_TYPE_FN VARCHAR(150) NULL,
                               EXERCISE_DATE VARCHAR(15) NULL,
                               EXERCISE_DATE_FN VARCHAR(150) NULL,
                               EXPIRATION_DATE VARCHAR(15) NULL,
                               EXPIRATION_DATE_FN VARCHAR(150) NULL,
                               UNDLYNG_SEC_TITLE VARCHAR(20) NOT NULL,
                               UNDLYNG_SEC_TITLE_FN VARCHAR(150) NULL,
                               UNDLYNG_SEC_SHARES DECIMAL(16,2) NULL,
                               UNDLYNG_SEC_SHARES_FN VARCHAR(150) NULL,
                               UNDLYNG_SEC_VALUE DECIMAL(16,2) NULL,
                               UNDLYNG_SEC_VALUE_FN VARCHAR(150) NULL,
                               SHRS_OWND_FOLWNG_TRANS DECIMAL(16,2) NULL,
                               SHRS_OWND_FOLWNG_TRANS_FN VARCHAR(150) NULL,
                               VALU_OWND_FOLWNG_TRANS DECIMAL(16,2) NULL,
                               VALU_OWND_FOLWNG_TRANS_FN VARCHAR(150) NULL,
                               DIRECT_INDIRECT_OWNERSHIP VARCHAR(5) NOT NULL,
                               DIRECT_INDIRECT_OWNERSHIP_FN VARCHAR(150) NULL,
                               NATURE_OF_OWNERSHIP VARCHAR(100) NULL,
                               NATURE_OF_OWNERSHIP_FN VARCHAR(150) NULL
);

CREATE TABLE transaction (
                             transaction_id VARCHAR(25) PRIMARY KEY,
                             ticker_symbol VARCHAR(10) NOT NULL,
                             owner VARCHAR(150) NOT NULL,
                             shares DECIMAL(16,2) NOT NULL,
                             transaction_type VARCHAR(20) NOT NULL,
                             transaction_date VARCHAR(15) NOT NULL,
                             price_per_share DECIMAL(16,2) NOT NULL,
                             total_value DECIMAL(16,2) NOT NULL,
                             ownership_type VARCHAR(20) NOT NULL,
                             remarks VARCHAR(2000)
);

CREATE TABLE OWNER_SIGNATURE (
    ACCESSION_NUMBER VARCHAR(25) NOT NULL,
    OWNERSIGNATURENAME VARCHAR(255) NOT NULL,
    OWNERSIGNATUREDATE VARCHAR(15) NOT NULL,

    PRIMARY KEY (ACCESSION_NUMBER)
);
