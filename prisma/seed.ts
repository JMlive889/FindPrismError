import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: 'Premium Detail',
        description: 'Complete one-time detail service',
        price: 10000, // $100.00
        status: 'ACTIVE',
        isMembership: false,
      },
      {
        name: 'Monthly Maintenance Plan',
        description: 'Monthly subscription service',
        price: 12000, // $120.00/month
        status: 'ACTIVE',
        isMembership: true,
      }
    ],
    skipDuplicates: true
  });

  // Create add-ons
  await prisma.addon.createMany({
    data: [
      {
        name: 'Interior Deep Clean',
        description: 'Deep cleaning of all interior surfaces',
        price: 3000, // $30.00
        sku: 'interior-deep-clean',
        status: 'ACTIVE'
      },
      {
        name: 'Exterior Sealant',
        description: 'Protective sealant application',
        price: 2000, // $20.00
        sku: 'exterior-sealant',
        status: 'ACTIVE'
      },
      {
        name: 'Engine Bay Detail',
        description: 'Complete engine bay cleaning and detailing',
        price: 4000, // $40.00
        sku: 'engine-bay-detail',
        status: 'ACTIVE'
      },
      {
        name: 'Upholstery Shampoo',
        description: 'Deep shampoo treatment for fabric surfaces',
        price: 3500, // $35.00
        sku: 'upholstery-shampoo',
        status: 'ACTIVE'
      }
    ],
    skipDuplicates: true
  });

  // Create travel config
  await prisma.travelConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      freeZips: JSON.stringify(["30012", "30013"]),
      tiers: JSON.stringify([
        {
          priceCents: 2500,
          zips: [
            "30014", "30016", "30038", "30058", "30094", "30052",
            "30252", "30281", "30294"
          ]
        },
        {
          priceCents: 4000,
          zips: [
            "30087", "30078", "30017", "30083", "30034", "30032", "30021",
            "30046", "30316", "30317", "30248", "30236"
          ]
        }
      ]),
      defaultOutsideFreeZipsCents: 2500,
      fallbackCents: 4000
    }
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });