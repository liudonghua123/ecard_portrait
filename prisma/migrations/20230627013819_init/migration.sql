-- CreateTable
CREATE TABLE "Info" (
    "STUEMPNO" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NAME" TEXT NOT NULL,
    "TERMDATE" TEXT,
    "TERMTIME" TEXT,
    "DEVICENAME" TEXT,
    "AMOUNT" REAL,
    "GATE_COUNT" INTEGER,
    "HOTEL_COUNT" INTEGER,
    "SUMAMOUNT" REAL
);
