CREATE TYPE catalog_category AS ENUM ('FOOD', 'BEVERAGE', 'OTHER');
CREATE TYPE spice_level AS ENUM ('MILD', 'MEDIUM', 'HOT', 'EXTRA_HOT');

CREATE TABLE catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    outlet_id UUID REFERENCES outlet(id) NOT NULL,
    name TEXT NOT NULL,
    image TEXT,
    category catalog_category,
    tax_category TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    is_pure_veg BOOLEAN DEFAULT FALSE,
    spice_level spice_level,
    metadata JSONB,
    cgst DECIMAL(5,2),
    sgst DECIMAL(5,2),
    igst DECIMAL(5,2),
    description TEXT,
    mrp DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
