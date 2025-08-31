CREATE TABLE outlet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID  REFERENCES company(id) NOT NULL,
    trade_name TEXT NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    fssai_license_number TEXT NOT NULL UNIQUE,
    pan TEXT NOT NULL UNIQUE,
    state_code TEXT NOT NULL,
    billing_info_id UUID NOT NULL REFERENCES billing_info(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
