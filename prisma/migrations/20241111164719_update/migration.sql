-- Create the Category enum type in PostgreSQL
CREATE TYPE "Category" AS ENUM ('FOOD', 'UTILITIES', 'ENTERTAINMENT', 'TRANSPORTATION', 'HEALTH', 'SAVINGS', 'OTHER');

-- Drop and recreate the category columns in budget and transaction tables
ALTER TABLE "budget" DROP COLUMN IF EXISTS "category";
ALTER TABLE "transaction" DROP COLUMN IF EXISTS "category";

ALTER TABLE "budget" ADD COLUMN "category" "Category" NOT NULL;
ALTER TABLE "transaction" ADD COLUMN "category" "Category" NOT NULL;
