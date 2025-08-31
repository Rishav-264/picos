CREATE TYPE billing_type AS ENUM ('COMPANY', 'OUTLET');

CREATE TABLE billing_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES company(id) NOT NULL,
    billing_type billing_type NOT NULL,
    gstin TEXT UNIQUE,
    pan TEXT NOT NULL,
    billing_address_line1 TEXT NOT NULL,
    billing_address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    state_code TEXT NOT NULL,
    bank_account_number TEXT,
    bank_ifsc TEXT,
    invoice_prefix TEXT DEFAULT 'INV',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

