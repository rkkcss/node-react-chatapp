/*
  Warnings:

  - Added the required column `name` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "name" TEXT NOT NULL;

ALTER TABLE "Chat" ADD COLUMN "name" TEXT;

-- Frissítsd a meglévő chatek neveit a résztvevők nevei alapján

UPDATE "Chat" SET "name" = sub.names
FROM (
  SELECT
    p."chatId" AS chat_id,
    string_agg(u.name, ', ' ORDER BY u.name) AS names
  FROM "Participant" p
  JOIN "User" u ON u.id = p."userId"
  GROUP BY p."chatId"
) AS sub
WHERE "Chat".id = sub.chat_id;

-- Végül kötelezővé teheted
ALTER TABLE "Chat" ALTER COLUMN "name" SET NOT NULL;
