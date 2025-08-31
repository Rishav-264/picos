CREATE TYPE user_role AS ENUM ('ADMIN', 'USER');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES company(id) NULL,
    outlet_id UUID REFERENCES outlet(id) NULL,
    name TEXT NOT NULL,
    role user_role NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    mfa BOOLEAN NOT NULL DEFAULT TRUE,
    phone_number TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
