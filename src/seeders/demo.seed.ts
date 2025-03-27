import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const data = {
  substandardConditionReports: [
    {
      userId: 2,
      description:
        'Se observó un derrame de aceite en el pasillo principal, lo que representa un riesgo de resbalón y caída para los trabajadores. No se encontraron señalamientos de advertencia ni barreras de contención.',
      location: 'Planta de Producción – Área de Ensamblaje',
      impacts: {
        createMany: {
          data: [
            { description: 'Riesgo de accidentes por caídas.' },
            {
              description:
                'Posible daño a la maquinaria por contaminación con aceite.',
            },
          ],
        },
      },
      suggestedFixes: {
        createMany: {
          data: [
            {
              description:
                'Limpiar el derrame de inmediato con material absorbente.',
            },
            {
              description:
                'Colocar señalización de "Piso Resbaloso" mientras se realiza la limpieza.',
            },
            {
              description:
                'Implementar un protocolo de inspección regular para detectar y prevenir futuros derrames.',
            },
          ],
        },
      },
    },
    {
      userId: 3,
      description:
        'Se detectó un cable de alimentación eléctrica suelto en el suelo, atravesando el pasillo principal.',
      location: 'Oficina Administrativa – Piso 3',
      impacts: {
        createMany: {
          data: [
            { description: 'Riesgo de tropiezos y caídas.' },
            {
              description: 'Posible daño al cable y riesgo de cortocircuito.',
            },
          ],
        },
      },
      suggestedFixes: {
        createMany: {
          data: [
            {
              description:
                'Reubicar el cable o utilizar un canal protector adecuado.',
            },
            {
              description:
                'Sensibilizar a los empleados sobre la importancia del orden en las instalaciones eléctricas.',
            },
            {
              description:
                'Revisar periódicamente la distribución de los cables en la oficina.',
            },
          ],
        },
      },
    },
  ],
};

async function main() {
  await prisma.user.createMany({
    data: [
      {
        userName: 'admin',
        email: 'admin@company.com',
        password: await hash('admin.pas', 12),
      },
      {
        userName: 'jperez',
        displayName: 'Jorge Perez',
        email: 'jperez@company.com',
        password: await hash('jperez.pas', 12),
      },
      {
        userName: 'srodriguez',
        displayName: 'Sarah Rodriguez',
        email: 'srodriguez@company.com',
        password: await hash('srodriguez.pas', 12),
      },
    ],
  });

  for (const report of data.substandardConditionReports) {
    await prisma.substandardConditionReport.create({
      data: report,
    });
  }

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
