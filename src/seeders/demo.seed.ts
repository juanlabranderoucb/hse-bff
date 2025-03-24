import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        userName: 'admin',
        email: 'admin@company.com',
        password: await hash('admin.pas', 12),
      },
    ],
  });

  console.log('Datos sembrados exitosamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
