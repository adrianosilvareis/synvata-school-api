-- CreateTable
CREATE TABLE "SvCourse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SvCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SvStudent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "SvStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SvStudentToCourse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SvStudentToCourse_AB_unique" ON "_SvStudentToCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_SvStudentToCourse_B_index" ON "_SvStudentToCourse"("B");

-- AddForeignKey
ALTER TABLE "_SvStudentToCourse" ADD CONSTRAINT "_SvStudentToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "SvCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SvStudentToCourse" ADD CONSTRAINT "_SvStudentToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "SvStudent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
