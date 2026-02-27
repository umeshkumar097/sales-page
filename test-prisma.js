const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  try {
    const lead = await prisma.lead.create({
      data: { name: 'test', email: 'e', phone: '1', projectType: 'web' }
    });
    console.log('Success', lead);
  } catch (e) {
    console.error('Error:', e);
  }
}
main();
